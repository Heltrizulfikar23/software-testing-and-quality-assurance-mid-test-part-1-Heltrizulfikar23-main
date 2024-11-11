class ArticleController {
    constructor(articleService) {
        this.articleService = articleService;
    }

    getAllArticles(req, res) {
        const articles = this.articleService.getAllArticles();
        res.json(articles);
    }

    getArticleById(req, res) {
        const article = this.articleService.getArticleById(req.params.id);
        if (article) {
            res.json(article);
        } else {
            res.status(404).json({ message: 'Artikel tidak ditemukan' });
        }
    }

    createArticle(req, res) {
        const article = req.body;
        const newArticle = this.articleService.createArticle(article);
        res.status(201).json(newArticle);
    }

    updateArticle(req, res) {
        const updatedArticle = this.articleService.updateArticle(req.params.id, req.body);
        if (updatedArticle) {
            res.json(updatedArticle);
        } else {
            res.status(404).json({ message: 'Artikel tidak ditemukan' });
        }
    }

    deleteArticle(req, res) {
        const deletedArticle = this.articleService.deleteArticle(req.params.id);
        if (deletedArticle) {
            res.json(deletedArticle);
        } else {
            res.status(404).json({ message: 'Artikel tidak ditemukan' });
        }
    }
}

module.exports = ArticleController;
