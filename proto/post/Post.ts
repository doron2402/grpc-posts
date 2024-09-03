// Original file: proto/post.proto

import type { Timestamp as _google_protobuf_Timestamp, Timestamp__Output as _google_protobuf_Timestamp__Output } from '../google/protobuf/Timestamp';

// Original file: proto/post.proto

export const _post_Post_Status = {
  DRAFT: 0,
  PUBLISHED: 1,
  DELETED: 2,
} as const;

export type _post_Post_Status =
  | 'DRAFT'
  | 0
  | 'PUBLISHED'
  | 1
  | 'DELETED'
  | 2

export type _post_Post_Status__Output = typeof _post_Post_Status[keyof typeof _post_Post_Status]

export interface Post {
  'id'?: (number);
  'title'?: (string);
  'content'?: (string);
  'createdAt'?: (_google_protobuf_Timestamp | null);
  'status'?: (_post_Post_Status);
}

export interface Post__Output {
  'id': (number);
  'title': (string);
  'content': (string);
  'createdAt': (_google_protobuf_Timestamp__Output | null);
  'status': (_post_Post_Status__Output);
}
