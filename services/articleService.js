class ArticleService {
    constructor(repository) {
        this.repository = repository;
    }

    // Mengambil semua artikel dari repository dan mengembalikannya ke pemanggil
    getAllArticles() {
        return this.repository.getAllArticles();
    }

    // Mengambil satu artikel berdasarkan ID dari repository
    getArticleById(articleId) {
        return this.repository.getArticleById(articleId);
    }

    // Membuat artikel baru dengan ID unik dan menyimpannya di repository
    createArticle(newArticle) {
        // Tetapkan ID unik menggunakan timestamp jika ID belum ada
        newArticle.id = newArticle.id || Date.now().toString();
        return this.repository.createArticle(newArticle);
    }

    // Memperbarui artikel yang ada (sudah diimplementasikan)
    updateArticle(articleId, updatedData) {
        return this.repository.updateArticle(articleId, updatedData);
    }

    // Menghapus artikel berdasarkan ID di repository
    deleteArticle(articleId) {
        return this.repository.deleteArticle(articleId);
    }
}

module.exports = ArticleService;
