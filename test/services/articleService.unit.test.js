// articleService.test.js

const ArticleService = require('./articleService');
const ArticleRepository = require('./articleRepository');
jest.mock('./articleRepository');  // Mocking the repository layer

describe('ArticleService', () => {

  it('getAllArticles should return all articles', async () => {
    ArticleRepository.getAllArticles.mockResolvedValue([{ id: '1', title: 'Article 1' }]);
    const articles = await ArticleService.getAllArticles();
    expect(articles).toEqual([{ id: '1', title: 'Article 1' }]);
  });

  it('getArticleById should return an article by ID (existing)', async () => {
    ArticleRepository.getArticleById.mockResolvedValue({ id: '1', title: 'Article 1' });
    const article = await ArticleService.getArticleById('1');
    expect(article).toEqual({ id: '1', title: 'Article 1' });
  });

  it('getArticleById should return null if article not found', async () => {
    ArticleRepository.getArticleById.mockResolvedValue(null);
    const article = await ArticleService.getArticleById('999');
    expect(article).toBeNull();
  });

  it('createArticle should create and return a new article', async () => {
    const newArticle = { title: 'New Article' };
    ArticleRepository.createArticle.mockResolvedValue({ id: '123', title: 'New Article' });
    const article = await ArticleService.createArticle(newArticle);
    expect(article).toEqual({ id: '123', title: 'New Article' });
  });

  it('updateArticle should update and return the article', async () => {
    const updatedArticle = { title: 'Updated Article' };
    ArticleRepository.updateArticle.mockResolvedValue({ id: '1', title: 'Updated Article' });
    const article = await ArticleService.updateArticle('1', updatedArticle);
    expect(article).toEqual({ id: '1', title: 'Updated Article' });
  });

  it('updateArticle should return null if article not found', async () => {
    ArticleRepository.updateArticle.mockResolvedValue(null);
    const article = await ArticleService.updateArticle('999', { title: 'Updated Article' });
    expect(article).toBeNull();
  });

  it('deleteArticle should delete and return the article', async () => {
    ArticleRepository.deleteArticle.mockResolvedValue({ id: '1', title: 'Article 1' });
    const article = await ArticleService.deleteArticle('1');
    expect(article).toEqual({ id: '1', title: 'Article 1' });
  });

  it('deleteArticle should return null if article not found', async () => {
    ArticleRepository.deleteArticle.mockResolvedValue(null);
    const article = await ArticleService.deleteArticle('999');
    expect(article).toBeNull();
  });
});
