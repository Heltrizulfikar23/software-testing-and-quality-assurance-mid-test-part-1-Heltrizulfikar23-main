const express = require('express');
const router = express.Router();

module.exports = (articleController) => {
    router.route('/')
        .get((req, res) => articleController.getAllArticles(req, res))
        .post((req, res) => articleController.createArticle(req, res));

    router.route('/:id')
        .get((req, res) => articleController.getArticleById(req, res))
        .put((req, res) => articleController.updateArticle(req, res))
        .delete((req, res) => articleController.deleteArticle(req, res));

    return router;
};
