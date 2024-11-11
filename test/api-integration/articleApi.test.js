const request = require("supertest");
const app = require("../../app"); // Importing the Express application
const fs = require("fs");
const path = require("path");
const { expect } = require("chai"); // Importing expect from chai for assertions

const articlesFilePath = path.join(__dirname, "../../data/articles.json"); // Defining the path to the article data file

describe("Article API Integration Tests", () => {
  // Preparing initial data for articles before each test
  beforeEach(() => {
    const initialData = [{ id: "1", title: "Test Article 1" }];
    fs.writeFileSync(articlesFilePath, JSON.stringify(initialData, null, 2));
  });

  // Tests for the GET /api/articles route
  describe("GET /api/articles", () => {
    it("should return all articles", async () => {
      // Sending a GET request to /api/articles
      const response = await request(app).get("/api/articles");

      // Verifying the response status is 200 (OK) and the article data matches the expected result
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal([{ id: "1", title: "Test Article 1" }]);
    });
  });

  // Tests for the GET /api/articles/:id route
  describe("GET /api/articles/:id", () => {
    it("should return article with given id", async () => {
      // Sending a GET request to /api/articles/1
      const response = await request(app).get("/api/articles/1");

      // Verifying the response status is 200 and the article data matches the given ID
      expect(response.status).to.equal(200);
      expect(response.body).to.deep.equal({ id: "1", title: "Test Article 1" });
    });

    it("should return 404 if article not found", async () => {
      // Sending a GET request to /api/articles/999, which does not exist
      const response = await request(app).get("/api/articles/999");

      // Verifying the response status is 404 and the appropriate error message is returned
      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({ message: "Article not found" });
    });
  });

  // Tests for the POST /api/articles route
  describe("POST /api/articles", () => {
    it("should create new article", async () => {
      const newArticle = { title: "New Article" }; // New article data

      // Sending a POST request with the new article data
      const response = await request(app)
        .post("/api/articles")
        .send(newArticle);

      // Verifying the response status is 201 (Created) and the article has the correct ID and title
      expect(response.status).to.equal(201);
      expect(response.body).to.have.property("id");
      expect(response.body.title).to.equal("New Article");

      // Verifying the new article is saved to the file
      const savedArticles = JSON.parse(fs.readFileSync(articlesFilePath));
      expect(savedArticles).to.have.lengthOf(2); // Verifying that there are now two articles
    });
  });

  // Tests for the PUT /api/articles/:id route
  describe("PUT /api/articles/:id", () => {
    it("should update existing article", async () => {
      const updatedArticle = { title: "Updated Article 1" }; // Updated article data

      // Sending a PUT request to update the article with ID 1
      const response = await request(app)
        .put("/api/articles/1")
        .send(updatedArticle);

      // Verifying the response status is 200 and the updated article matches the new data
      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal("Updated Article 1");

      // Verifying that the article was updated in the file
      const savedArticles = JSON.parse(fs.readFileSync(articlesFilePath));
      expect(savedArticles[0].title).to.equal("Updated Article 1");
    });

    it("should return 404 if article not found", async () => {
      // Sending a PUT request to update a non-existent article with ID 999
      const response = await request(app)
        .put("/api/articles/999")
        .send({ title: "Non-existent Article" });

      // Verifying the response status is 404 and the appropriate error message is returned
      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({ message: "Article not found" });
    });
  });

  // Tests for the DELETE /api/articles/:id route
  describe("DELETE /api/articles/:id", () => {
    it("should delete article", async () => {
      // Sending a DELETE request to delete the article with ID 1
      const response = await request(app).delete("/api/articles/1");

      // Verifying the response status is 200 and the deleted article matches the original
      expect(response.status).to.equal(200);
      expect(response.body.title).to.equal("Test Article 1");

      // Verifying the article has been removed from the file
      const savedArticles = JSON.parse(fs.readFileSync(articlesFilePath));
      expect(savedArticles).to.have.lengthOf(0); // Verifying the articles file is empty after deletion
    });

    it("should return 404 if article not found", async () => {
      // Sending a DELETE request to delete a non-existent article with ID 999
      const response = await request(app).delete("/api/articles/999");

      // Verifying the response status is 404 and the appropriate error message is returned
      expect(response.status).to.equal(404);
      expect(response.body).to.deep.equal({ message: "Article not found" });
    });
  });
});
