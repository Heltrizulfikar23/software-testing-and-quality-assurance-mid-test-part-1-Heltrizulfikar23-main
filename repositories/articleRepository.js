const fs = require('fs');
const path = require('path');
const articlesFilePath = path.join(__dirname, '../data/articles.json');

class ArticleRepository {
    // Mengambil semua artikel dari file JSON
    getAllArticles() {
        const data = fs.readFileSync(articlesFilePath, 'utf-8');
        return JSON.parse(data);
    }

    // Mengambil artikel berdasarkan ID
    getArticleById(id) {
        const articles = this.getAllArticles();
        return articles.find(article => article.id === id) || null;
    }

    // Membuat artikel baru dan menyimpannya di file JSON
    createArticle(article) {
        const articles = this.getAllArticles();
        
        // Membuat ID unik jika tidak disediakan
        article.id = article.id || Date.now().toString();
        
        // Menambahkan artikel baru ke daftar
        articles.push(article);

        // Menyimpan daftar artikel yang telah diperbarui kembali ke file JSON
        fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));
        return article;
    }

    // Memperbarui artikel berdasarkan ID
    updateArticle(id, updatedArticle) {
        const articles = this.getAllArticles();
        const index = articles.findIndex(article => article.id === id);
        if (index !== -1) {
            articles[index] = { ...articles[index], ...updatedArticle };
            fs.writeFileSync(articlesFilePath, JSON.stringify(articles, null, 2));
            return articles[index];
        }
        return null;
    }

    // Menghapus artikel berdasarkan ID
    deleteArticle(id) {
        const articles = this.getAllArticles();
        const filteredArticles = articles.filter(article => article.id !== id);

        // Menyimpan daftar artikel yang telah diperbarui (tanpa artikel yang dihapus) ke file JSON
        fs.writeFileSync(articlesFilePath, JSON.stringify(filteredArticles, null, 2));
        return filteredArticles;
    }
}

module.exports = ArticleRepository;
