const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const path = require('path');

// Path to your proto file
const PROTO_PATH = path.resolve(__dirname, './proto/post.proto');

// server host
const grpcServer = 'localhost:50051';


// Load the protobuf definition
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
  keepCase: true,
  longs: String,
  enums: String,
  defaults: true,
  oneofs: true
});

const postProto = grpc.loadPackageDefinition(packageDefinition).post;

// Create a gRPC client
const client = new postProto.PostService(grpcServer, grpc.credentials.createInsecure());

// Function to create a post
function createPost(post) {
  return new Promise((resolve, reject) => {
    client.CreatePost({ post }, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response.post);
    });
  });
}

// Function to get a post by ID
function getPost(id) {
  return new Promise((resolve, reject) => {
    client.GetPost({ id }, (error, response) => {
      if (error) {
        return reject(error);
      }
      resolve(response.post);
    });
  });
}

function getPosts(options, callback) {
  return new Promise((resolve, reject) => {
    client.GetPosts(options, (error, response) => {
      if (error) {
        console.error('Error:', error);
        return reject(error);
      }
      return resolve(response.posts);
    });
  });
}

// Example usage
(async () => {
  try {
    // Create a new post
    const newPost = {
      id: 1,
      title: 'Test Post',
      content: 'This is a test post content'
    };
    console.log('Creating post:', newPost);
    const createdPost = await createPost(newPost);
    console.log('Post created:', createdPost);

    // Get the post by ID
    const retrievedPost = await getPost(createdPost.id);
    console.log('Post retrieved:', retrievedPost);
    const posts = await getPosts({ limit: 10, offset: 0});
    console.log('Posts:', posts);
  } catch (error) {
    console.error('Error:', error);
  }
})();