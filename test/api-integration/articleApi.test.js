// api.test.js

const request = require('supertest');
const app = require('./app'); // Express app

describe('Article API Integration Tests', () => {

  it('GET /api/articles should return all articles', async () => {
    const res = await request(app).get('/api/articles');
    expect(res.status).toBe(200);
    expect(res.body).toEqual([{ id: '1', title: 'Test Article 1' }]);
  });

  it('GET /api/articles/:id should return an article by ID (existing)', async () => {
    const res = await request(app).get('/api/articles/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ id: '1', title: 'Test Article 1' });
  });

  it('GET /api/articles/:id should return 404 if article not found', async () => {
    const res = await request(app).get('/api/articles/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Article not found' });
  });

  it('POST /api/articles should create a new article', async () => {
    const newArticle = { title: 'New Article' };
    const res = await request(app).post('/api/articles').send(newArticle);
    expect(res.status).toBe(201);
    expect(res.body).toHaveProperty('id');
    expect(res.body.title).toBe('New Article');
  });

  it('PUT /api/articles/:id should update an article by ID', async () => {
    const updatedArticle = { title: 'Updated Article 1' };
    const res = await request(app).put('/api/articles/1').send(updatedArticle);
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Updated Article 1');
  });

  it('PUT /api/articles/:id should return 404 if article not found', async () => {
    const updatedArticle = { title: 'Updated Article 1' };
    const res = await request(app).put('/api/articles/999').send(updatedArticle);
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Article not found' });
  });

  it('DELETE /api/articles/:id should delete an article', async () => {
    const res = await request(app).delete('/api/articles/1');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ title: 'Test Article 1' });
  });

  it('DELETE /api/articles/:id should return 404 if article not found', async () => {
    const res = await request(app).delete('/api/articles/999');
    expect(res.status).toBe(404);
    expect(res.body).toEqual({ message: 'Article not found' });
  });
});
