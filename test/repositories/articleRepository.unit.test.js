const { expect } = require('chai');
const sinon = require('sinon');
const fs = require('fs');
const ArticleRepository = require('../../repositories/articleRepository');

describe('ArticleRepository', () => {
  let articleRepositoryInstance;
  let readFileSyncMock;
  let writeFileSyncMock;

  beforeEach(() => {
    articleRepositoryInstance = new ArticleRepository();
    readFileSyncMock = sinon.stub(fs, 'readFileSync');
    writeFileSyncMock = sinon.stub(fs, 'writeFileSync');
  });

  afterEach(() => {
    sinon.restore();
  });

  describe('getAllArticles', () => {
    it('should return an array of articles fetched from the file', () => {
      const mockArticlesList = [
        { id: '1', title: 'Article 1' },
        { id: '2', title: 'Article 2' },
      ];
      readFileSyncMock.returns(JSON.stringify(mockArticlesList));

      const result = articleRepositoryInstance.getAllArticles();

      expect(result).to.be.an('array').that.is.not.empty;
      expect(result).to.have.lengthOf(2);
      expect(result[0].title).to.equal('Article 1');
      sinon.assert.calledOnceWithExactly(readFileSyncMock, 'articles.json', 'utf8');
    });
  });

  describe('getArticleById', () => {
    it('should return the article matching the provided id if it exists', () => {
      const mockArticlesList = [
        { id: '1', title: 'Article 1' },
        { id: '2', title: 'Article 2' },
      ];
      readFileSyncMock.returns(JSON.stringify(mockArticlesList));

      const result = articleRepositoryInstance.getArticleById('1');

      expect(result).to.deep.equal({ id: '1', title: 'Article 1' });
      sinon.assert.calledOnceWithExactly(readFileSyncMock, 'articles.json', 'utf8');
    });

    it('should return null if no article is found with the provided id', () => {
      const mockArticlesList = [
        { id: '1', title: 'Article 1' },
        { id: '2', title: 'Article 2' },
      ];
      readFileSyncMock.returns(JSON.stringify(mockArticlesList));

      const result = articleRepositoryInstance.getArticleById('999');

      expect(result).to.be.null;
      sinon.assert.calledOnceWithExactly(readFileSyncMock, 'articles.json', 'utf8');
    });
  });

  describe('createArticle', () => {
    it('should add a new article with a unique id to the array', () => {
      const mockArticlesList = [{ id: '1', title: 'Article 1' }];
      readFileSyncMock.returns(JSON.stringify(mockArticlesList));

      const newArticle = { title: 'Article 2' };
      const result = articleRepositoryInstance.createArticle(newArticle);

      expect(result).to.have.property('id');
      expect(result.title).to.equal('Article 2');
      sinon.assert.calledOnceWithExactly(writeFileSyncMock, 'articles.json', JSON.stringify([
        { id: '1', title: 'Article 1' },
        result // Newly created article
      ]), 'utf8');
    });

    it('should return the newly created article object', () => {
      const mockArticlesList = [{ id: '1', title: 'Article 1' }];
      readFileSyncMock.returns(JSON.stringify(mockArticlesList));

      const newArticle = { title: 'Article 2' };
      const result = articleRepositoryInstance.createArticle(newArticle);

      expect(result).to.be.an('object');
      expect(result).to.have.property('id');
      expect(result.title).to.equal('Article 2');
    });
  });

  describe('updateArticle', () => {
    it('should update an existing article', () => {
      const mockArticlesList = [{ id: '1', title: 'Article 1' }];
      readFileSyncMock.returns(JSON.stringify(mockArticlesList));

      const result = articleRepositoryInstance.updateArticle('1', { title: 'Updated Article' });

      expect(result.title).to.equal('Updated Article');
      sinon.assert.calledOnce(writeFileSyncMock);
    });

    it('should return null if the article is not found', () => {
      const mockArticlesList = [{ id: '1', title: 'Article 1' }];
      readFileSyncMock.returns(JSON.stringify(mockArticlesList));

      const result = articleRepositoryInstance.updateArticle('999', { title: 'Non-existing Article' });

      expect(result).to.be.null;
    });
  });

  describe('deleteArticle', () => {
    it('should remove the article with the specified id from the articles array', () => {
      const mockArticlesList = [
        { id: '1', title: 'Article 1' },
        { id: '2', title: 'Article 2' },
      ];
      readFileSyncMock.returns(JSON.stringify(mockArticlesList));

      const result = articleRepositoryInstance.deleteArticle('1');

      expect(result).to.deep.equal({ id: '1', title: 'Article 1' });
      sinon.assert.calledOnceWithExactly(writeFileSyncMock, 'articles.json', JSON.stringify([
        { id: '2', title: 'Article 2' },
      ]), 'utf8');
    });

    it('should return null if no article is found for the given id', () => {
      const mockArticlesList = [
        { id: '1', title: 'Article 1' },
        { id: '2', title: 'Article 2' },
      ];
      readFileSyncMock.returns(JSON.stringify(mockArticlesList));

      const result = articleRepositoryInstance.deleteArticle('999');

      expect(result).to.be.null;
      sinon.assert.calledOnceWithExactly(readFileSyncMock, 'articles.json', 'utf8');
    });
  });
});
