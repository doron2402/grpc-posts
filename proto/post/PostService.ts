// Original file: proto/post.proto

import type * as grpc from '@grpc/grpc-js'
import type { MethodDefinition } from '@grpc/proto-loader'
import type { CreatePostRequest as _post_CreatePostRequest, CreatePostRequest__Output as _post_CreatePostRequest__Output } from '../post/CreatePostRequest';
import type { CreatePostResponse as _post_CreatePostResponse, CreatePostResponse__Output as _post_CreatePostResponse__Output } from '../post/CreatePostResponse';
import type { GetPostRequest as _post_GetPostRequest, GetPostRequest__Output as _post_GetPostRequest__Output } from '../post/GetPostRequest';
import type { GetPostResponse as _post_GetPostResponse, GetPostResponse__Output as _post_GetPostResponse__Output } from '../post/GetPostResponse';
import type { GetPostsRequest as _post_GetPostsRequest, GetPostsRequest__Output as _post_GetPostsRequest__Output } from '../post/GetPostsRequest';
import type { GetPostsResponse as _post_GetPostsResponse, GetPostsResponse__Output as _post_GetPostsResponse__Output } from '../post/GetPostsResponse';

export interface PostServiceClient extends grpc.Client {
  CreatePost(argument: _post_CreatePostRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_post_CreatePostResponse__Output>): grpc.ClientUnaryCall;
  CreatePost(argument: _post_CreatePostRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_post_CreatePostResponse__Output>): grpc.ClientUnaryCall;
  CreatePost(argument: _post_CreatePostRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_post_CreatePostResponse__Output>): grpc.ClientUnaryCall;
  CreatePost(argument: _post_CreatePostRequest, callback: grpc.requestCallback<_post_CreatePostResponse__Output>): grpc.ClientUnaryCall;
  createPost(argument: _post_CreatePostRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_post_CreatePostResponse__Output>): grpc.ClientUnaryCall;
  createPost(argument: _post_CreatePostRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_post_CreatePostResponse__Output>): grpc.ClientUnaryCall;
  createPost(argument: _post_CreatePostRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_post_CreatePostResponse__Output>): grpc.ClientUnaryCall;
  createPost(argument: _post_CreatePostRequest, callback: grpc.requestCallback<_post_CreatePostResponse__Output>): grpc.ClientUnaryCall;
  
  GetPost(argument: _post_GetPostRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_post_GetPostResponse__Output>): grpc.ClientUnaryCall;
  GetPost(argument: _post_GetPostRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_post_GetPostResponse__Output>): grpc.ClientUnaryCall;
  GetPost(argument: _post_GetPostRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_post_GetPostResponse__Output>): grpc.ClientUnaryCall;
  GetPost(argument: _post_GetPostRequest, callback: grpc.requestCallback<_post_GetPostResponse__Output>): grpc.ClientUnaryCall;
  getPost(argument: _post_GetPostRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_post_GetPostResponse__Output>): grpc.ClientUnaryCall;
  getPost(argument: _post_GetPostRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_post_GetPostResponse__Output>): grpc.ClientUnaryCall;
  getPost(argument: _post_GetPostRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_post_GetPostResponse__Output>): grpc.ClientUnaryCall;
  getPost(argument: _post_GetPostRequest, callback: grpc.requestCallback<_post_GetPostResponse__Output>): grpc.ClientUnaryCall;
  
  GetPosts(argument: _post_GetPostsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_post_GetPostsResponse__Output>): grpc.ClientUnaryCall;
  GetPosts(argument: _post_GetPostsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_post_GetPostsResponse__Output>): grpc.ClientUnaryCall;
  GetPosts(argument: _post_GetPostsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_post_GetPostsResponse__Output>): grpc.ClientUnaryCall;
  GetPosts(argument: _post_GetPostsRequest, callback: grpc.requestCallback<_post_GetPostsResponse__Output>): grpc.ClientUnaryCall;
  getPosts(argument: _post_GetPostsRequest, metadata: grpc.Metadata, options: grpc.CallOptions, callback: grpc.requestCallback<_post_GetPostsResponse__Output>): grpc.ClientUnaryCall;
  getPosts(argument: _post_GetPostsRequest, metadata: grpc.Metadata, callback: grpc.requestCallback<_post_GetPostsResponse__Output>): grpc.ClientUnaryCall;
  getPosts(argument: _post_GetPostsRequest, options: grpc.CallOptions, callback: grpc.requestCallback<_post_GetPostsResponse__Output>): grpc.ClientUnaryCall;
  getPosts(argument: _post_GetPostsRequest, callback: grpc.requestCallback<_post_GetPostsResponse__Output>): grpc.ClientUnaryCall;
  
}

export interface PostServiceHandlers extends grpc.UntypedServiceImplementation {
  CreatePost: grpc.handleUnaryCall<_post_CreatePostRequest__Output, _post_CreatePostResponse>;
  
  GetPost: grpc.handleUnaryCall<_post_GetPostRequest__Output, _post_GetPostResponse>;
  
  GetPosts: grpc.handleUnaryCall<_post_GetPostsRequest__Output, _post_GetPostsResponse>;
  
}

export interface PostServiceDefinition extends grpc.ServiceDefinition {
  CreatePost: MethodDefinition<_post_CreatePostRequest, _post_CreatePostResponse, _post_CreatePostRequest__Output, _post_CreatePostResponse__Output>
  GetPost: MethodDefinition<_post_GetPostRequest, _post_GetPostResponse, _post_GetPostRequest__Output, _post_GetPostResponse__Output>
  GetPosts: MethodDefinition<_post_GetPostsRequest, _post_GetPostsResponse, _post_GetPostsRequest__Output, _post_GetPostsResponse__Output>
}
