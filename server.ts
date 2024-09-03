import { config } from 'dotenv';
config({ path: '.env.local' });

import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/post';
import { PostServiceHandlers } from './proto/post/PostService'
import { _post_Post_Status, Post } from './proto/post/Post';

const PORT = String(process.env.GRPC_PORT || '50051');
const HOST = String(process.env.GRPC_HOST || '0.0.0.0');
const PROTO_PATH = __dirname + '/proto/post.proto';


import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './src/db/schema';

export const pool = new Pool({
  connectionString: process.env.POSTGRES_URL!,
  min: 1,
  max: 100,
  idleTimeoutMillis: 15000,
  connectionTimeoutMillis: 5000,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  log: (msg) => console.log(`DB: ${msg}`),
});

export const db = drizzle(pool, { schema });

// Load the protobuf
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const proto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;

// In-memory post storage
const posts: Post[] = [];

const server = new grpc.Server();

// Implement the CreatePost and GetPost RPC methods
const postServiceHandlers: PostServiceHandlers = {
  CreatePost: async (call, callback) => {
    const { content, title } = call.request;
    console.log(call.request);
    console.log(`Received request to create post with title: ${title}, content: ${content}`);
    // Validate the input
    if (!title || !content) {
      console.error('Title and content must not be empty');
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Title and content must not be empty'
      });
    }

    try {
      const [post] = await db.insert(schema.post)
        .values({
          title,
          content
        }).returning();

      return callback(null, { post: { ...post, title: post.title ?? undefined, content: post.content ?? undefined, status: post.status as _post_Post_Status | undefined } });
    } catch (error) {
      console.error('Error creating post:', error);
      return callback({
        code: grpc.status.INTERNAL,
        message: 'Error creating post'
      });
    }
  },
  GetPost: async (call, callback) => {

    if (!call.request.id) {
      return callback({
        code: grpc.status.INVALID_ARGUMENT,
        message: 'Post ID must not be empty'
      });
    }

    const post: schema.PostType = await db.query.post.findFirst({ where: { id: call.request.id } });
    if (!post) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Post not found'
      });
    }
    return callback(null, { post: {
      ...post,
      title: post.title ?? undefined,
      content: post.content ?? undefined,
      status: post.status as _post_Post_Status | undefined
    } });
  },
  GetPosts: async (call, callback) => {
    const posts = await db.query.post.findMany({
      limit: call.request.limit || 10,
      offset: call.request.offset || 0,
    })

    if (!posts) {
      return callback({
        code: grpc.status.NOT_FOUND,
        message: 'Posts not found'
      });
    }
    console.log('Received request to get all posts');
    callback(null, { posts });
  }
};

server.addService(proto.post.PostService.service, postServiceHandlers);


server.bindAsync(`${HOST}:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(`Server running on port ${port}`);
  server.start();
});