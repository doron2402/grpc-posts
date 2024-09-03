import * as grpc from '@grpc/grpc-js';
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './proto/post';
import { PostServiceHandlers } from './proto/post/PostService'
import { Post } from './proto/post/Post';

const PORT = String(process.env.GRPC_PORT || '50051');
const HOST = String(process.env.GRPC_HOST || '0.0.0.0');
const PROTO_PATH = __dirname + '/proto/post.proto';


import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from './src/drizzle/schema';

export const client = new Client({
  host: process.env.DB_HOST!,
  port: Number(process.env.DB_PORT!),
  user: process.env.DB_USERNAME!,
  password: process.env.DB_PASSWORD!,
  database: process.env.DB_NAME!,
});
// { schema } is used for relational queries
export const db = drizzle(client, { schema });

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
  CreatePost: (call, callback) => {
    const { content, title } = call.request;
    console.log(call.request);
    console.log(`Received request to create post with title: ${title}, content: ${content}`);
    const post: Post = {
      id: 12,
      content,
      title,
      createdAt: {
        seconds: Math.floor(new Date().getTime() / 1000)
      },
      status: 'DRAFT'
    }
    posts.push(post);
    callback(null, { post });
  },
  GetPost: (call, callback) => {
    const postId = call.request.id;
    const post = posts.find(p => p.id === postId);
    if (post) {
      callback(null, { post });
    } else {
      callback({
        code: grpc.status.NOT_FOUND,
        message: 'Post not found',
      });
    }
  },
  GetPosts: (call, callback) => {
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