[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/5gNCA1FX)
### Soal UTS

Lengkapi fungsionalitas API dan lakukan pengujian (Unit Test, Integration Test, API Test). Perhatikan tabel dibawah sebagai petunjuk untuk mengerjakan pengujian.

### `ArticleService` Test Suite

| **Test Suite**   | **Test Case**                 | **Description**                                             | **Expected Output**                                           |
|------------------|-------------------------------|-------------------------------------------------------------|---------------------------------------------------------------|
| `ArticleService` | `getAllArticles`              | Returns all articles                                        | Array of articles: `[{ id: '1', title: 'Article 1' }]`       |
|                  | `getArticleById` (existing)   | Returns article with a given ID                             | Article object: `{ id: '1', title: 'Article 1' }`            |
|                  | `getArticleById` (non-exist)  | Returns null if no article is found                         | `null`                                                        |
|                  | `createArticle`               | Creates and returns a new article                           | Created article object: `{ id: '123', title: 'New Article' }`|
|                  | `updateArticle` (existing)    | Updates and returns an existing article                     | Updated article object: `{ id: '1', title: 'Updated Article' }`|
|                  | `updateArticle` (non-exist)   | Returns null if the article is not found                    | `null`                                                        |
|                  | `deleteArticle` (existing)    | Deletes and returns an article                              | Deleted article object: `{ id: '1', title: 'Article 1' }`    |
|                  | `deleteArticle` (non-exist)   | Returns null if the article is not found                    | `null`                                                        |

---

### `ArticleRepository` Test Suite

| **Test Suite**        | **Test Case**                       | **Description**                                               | **Expected Output**                                               |
|-----------------------|-------------------------------------|---------------------------------------------------------------|-------------------------------------------------------------------|
| `ArticleRepository`   | `getAllArticles`                   | Returns all articles                                          | Array of articles: `[{ id: '1', title: 'Article 1' }, { id: '2', title: 'Article 2' }]` |
|                       | `getArticleById` (existing)        | Returns article with a given ID                               | Article object: `{ id: '1', title: 'Article 1' }`                |
|                       | `getArticleById` (non-exist)       | Returns null if no article is found                           | `null`                                                            |
|                       | `createArticle`                    | Adds and saves a new article                                  | Created article with new `id`, title: `New Article`, write called |
|                       | `updateArticle` (existing)         | Updates and saves an existing article                         | Updated article object with title: `Updated Article`, write called |
|                       | `updateArticle` (non-exist)        | Returns null if article to update is not found                | `null`                                                            |
|                       | `deleteArticle` (existing)         | Deletes and returns an article                                | Deleted article object with title: `Article 1`, write called     |
|                       | `deleteArticle` (non-exist)        | Returns null if article to delete is not found                | `null`                                                            |

---

### `Article API Integration Tests`

#### `GET /api/articles`

| **Test Suite**                | **Test Case**                          | **Description**                                    | **Expected Output**                                       |
|-------------------------------|----------------------------------------|----------------------------------------------------|-----------------------------------------------------------|
| `GET /api/articles`           | Returns all articles                  | Retrieves all articles from the API                | Status: `200`, Body: `[{ id: '1', title: 'Test Article 1' }]` |

#### `GET /api/articles/:id`

| **Test Suite**                | **Test Case**                                  | **Description**                                    | **Expected Output**                                               |
|-------------------------------|------------------------------------------------|----------------------------------------------------|-------------------------------------------------------------------|
| `GET /api/articles/:id`       | Retrieves an article by ID (existing)          | Returns a single article by specified ID           | Status: `200`, Body: `{ id: '1', title: 'Test Article 1' }`      |
|                               | Retrieves an article by ID (non-existent)      | Returns 404 if article ID not found                | Status: `404`, Body: `{ message: 'Article not found' }`          |

#### `POST /api/articles`

| **Test Suite**                | **Test Case**                                  | **Description**                                    | **Expected Output**                                                                                      |
|-------------------------------|------------------------------------------------|----------------------------------------------------|----------------------------------------------------------------------------------------------------------|
| `POST /api/articles`          | Creates a new article                          | Adds and returns a new article                     | Status: `201`, Body: `{ id: <new id>, title: 'New Article' }`, file has 2 articles |

#### `PUT /api/articles/:id`

| **Test Suite**                | **Test Case**                                     | **Description**                                    | **Expected Output**                                                       |
|-------------------------------|---------------------------------------------------|----------------------------------------------------|---------------------------------------------------------------------------|
| `PUT /api/articles/:id`       | Updates an article by ID (existing)               | Updates and returns an article with specified ID   | Status: `200`, Body: `{ title: 'Updated Article 1' }`, file updated for ID `1` |
|                               | Updates an article by ID (non-existent)           | Returns 404 if article to update is not found      | Status: `404`, Body: `{ message: 'Article not found' }`                       |

#### `DELETE /api/articles/:id`

| **Test Suite**                | **Test Case**                                     | **Description**                                    | **Expected Output**                                                          |
|-------------------------------|---------------------------------------------------|----------------------------------------------------|------------------------------------------------------------------------------|
| `DELETE /api/articles/:id`    | Deletes an article by ID (existing)               | Deletes and returns an article with specified ID   | Status: `200`, Body: `{ title: 'Test Article 1' }`, file has no articles     |
|                               | Deletes an article by ID (non-existent)           | Returns 404 if article to delete is not found      | Status: `404`, Body: `{ message: 'Article not found' }`                      |