const { expect } = require('chai');
const sinon = require('sinon');
const ArticleService = require('../../services/articleService');
const ArticleRepository = require('../../repositories/articleRepository');

describe('ArticleService', () => {
    let articleService;
    let articleRepositoryMock;

    beforeEach(() => {
        // Create a stub instance for ArticleRepository
        articleRepositoryMock = sinon.createStubInstance(ArticleRepository);
        // Initialize articleService with the mock repository
        articleService = new ArticleService(articleRepositoryMock);
    });

    describe('getAllArticles', () => {
        it('should return all articles', () => {
            const mockArticles = [{ id: '1', title: 'Article 1' }];
            articleRepositoryMock.getAllArticles.returns(mockArticles);

            const articles = articleService.getAllArticles();

            expect(articles).to.deep.equal(mockArticles);
            sinon.assert.calledOnce(articleRepositoryMock.getAllArticles);
        });

        it('should return an empty array if no articles exist', () => {
            articleRepositoryMock.getAllArticles.returns([]);

            const articles = articleService.getAllArticles();

            expect(articles).to.deep.equal([]);
            sinon.assert.calledOnce(articleRepositoryMock.getAllArticles);
        });
    });

    describe('getArticleById', () => {
        it('should return the article with the given id when it exists', () => {
            const mockArticle = { id: '1', title: 'Article 1' };
            articleRepositoryMock.getArticleById.returns(mockArticle);

            const article = articleService.getArticleById('1');

            expect(article).to.deep.equal(mockArticle);
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.getArticleById, '1');
        });

        it('should return null when no article is found with the given id', () => {
            articleRepositoryMock.getArticleById.returns(null);

            const article = articleService.getArticleById('999');

            expect(article).to.be.null;
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.getArticleById, '999');
        });
    });

    describe('createArticle', () => {
        it('should create a new article and return it', () => {
            const newArticle = { title: 'New Article' };
            const createdArticle = { id: '1', title: 'New Article' };
            articleRepositoryMock.createArticle.returns(createdArticle);

            const result = articleService.createArticle(newArticle);

            expect(result).to.deep.equal(createdArticle);
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.createArticle, newArticle);
        });
    });

    describe('updateArticle', () => {
        it('should update an existing article and return it', () => {
            const updatedArticle = { id: '1', title: 'Updated Article' };
            articleRepositoryMock.updateArticle.returns(updatedArticle);

            const result = articleService.updateArticle('1', { title: 'Updated Article' });

            expect(result).to.deep.equal(updatedArticle);
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.updateArticle, '1', { title: 'Updated Article' });
        });

        it('should return null if the article is not found', () => {
            articleRepositoryMock.updateArticle.returns(null);

            const result = articleService.updateArticle('999', { title: 'Non-existing Article' });

            expect(result).to.be.null;
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.updateArticle, '999', { title: 'Non-existing Article' });
        });
    });

    describe('deleteArticle', () => {
        it('should delete an article and return it', () => {
            const deletedArticle = { id: '1', title: 'Article 1' };
            articleRepositoryMock.deleteArticle.returns(deletedArticle);

            const result = articleService.deleteArticle('1');

            expect(result).to.deep.equal(deletedArticle);
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.deleteArticle, '1');
        });

        it('should return null if the article is not found', () => {
            articleRepositoryMock.deleteArticle.returns(null);

            const result = articleService.deleteArticle('999');

            expect(result).to.be.null;
            sinon.assert.calledOnceWithExactly(articleRepositoryMock.deleteArticle, '999');
        });
    });
});
