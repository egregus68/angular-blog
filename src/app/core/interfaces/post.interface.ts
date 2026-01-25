import { CommentInterface } from './comment.interface';

export interface PostInterface {
  id: number;
  text: string;
  createdDateTime: string;
  publicationDate?: string;
  author: string;
  scope?: string;
  status?: string;
  version?: string;
  comments?: CommentInterface[];
}
