import type * as grpc from '@grpc/grpc-js';
import type { MessageTypeDefinition } from '@grpc/proto-loader';

import type { PostServiceClient as _post_PostServiceClient, PostServiceDefinition as _post_PostServiceDefinition } from './post/PostService';

type SubtypeConstructor<Constructor extends new (...args: any) => any, Subtype> = {
  new(...args: ConstructorParameters<Constructor>): Subtype;
};

export interface ProtoGrpcType {
  google: {
    protobuf: {
      Timestamp: MessageTypeDefinition
    }
  }
  post: {
    CreatePostRequest: MessageTypeDefinition
    CreatePostResponse: MessageTypeDefinition
    GetPostRequest: MessageTypeDefinition
    GetPostResponse: MessageTypeDefinition
    GetPostsRequest: MessageTypeDefinition
    GetPostsResponse: MessageTypeDefinition
    Post: MessageTypeDefinition
    PostService: SubtypeConstructor<typeof grpc.Client, _post_PostServiceClient> & { service: _post_PostServiceDefinition }
  }
}

