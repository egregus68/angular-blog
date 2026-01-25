export interface CreatePostInterface {
  text: string;
  scope: 'PUBLIC' | 'PRIVATE';
  publicationDate?: string;
}
