import { PostInterface } from './post.interface';

export interface ResponsePostInterface {
  content: PostInterface[];
  totalElements: number;
}
