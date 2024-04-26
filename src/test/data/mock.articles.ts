import { News } from "../../app/news/models/news";

export const mockArticleWithImage: News = {
  id: 1,
  date: '1',
  title: 'Article title',
  text: 'Article text',
  summary: 'Article summary',
  image: 'article.jpg',
  added_by: 'BP'
};

export const mockArticleWithoutImage: News = {
  ...mockArticleWithImage,
  image: null
};
