// articleRepository.test.js

const ArticleRepository = require('./articleRepository');
const fs = require('fs');
jest.mock('fs'); // Mocking file system operations if needed

describe('ArticleRepository', () => {

  it('getAllArticles should return all articles', async () => {
    fs.readFileSync.mockReturnValue(JSON.stringify([{ id: '1', title: 'Article 1' }, { id: '2', title: 'Article 2' }]));
    const articles = await ArticleRepository.getAllArticles();
    expect(articles).toEqual([{ id: '1', title: 'Article 1' }, { id: '2', title: 'Article 2' }]);
  });

  it('getArticleById should return an article by ID (existing)', async () => {
    fs.readFileSync.mockReturnValue(JSON.stringify([{ id: '1', title: 'Article 1' }]));
    const article = await ArticleRepository.getArticleById('1');
    expect(article).toEqual({ id: '1', title: 'Article 1' });
  });

  it('getArticleById should return null if article not found', async () => {
    fs.readFileSync.mockReturnValue(JSON.stringify([{ id: '1', title: 'Article 1' }]));
    const article = await ArticleRepository.getArticleById('999');
    expect(article).toBeNull();
  });

  it('createArticle should save a new article', async () => {
    const newArticle = { title: 'New Article' };
    fs.writeFileSync.mockImplementationOnce(() => {});
    await ArticleRepository.createArticle(newArticle);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('updateArticle should update an existing article', async () => {
    const updatedArticle = { id: '1', title: 'Updated Article' };
    fs.writeFileSync.mockImplementationOnce(() => {});
    await ArticleRepository.updateArticle('1', updatedArticle);
    expect(fs.writeFileSync).toHaveBeenCalled();
  });

  it('deleteArticle should delete an article', async () => {
    fs.writeFileSync.mockImplementationOnce(() => {});
    await ArticleRepository.deleteArticle('1');
    expect(fs.writeFileSync).toHaveBeenCalled();
  });
});
