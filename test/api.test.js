const request = require('supertest');
const { expect } = require('chai');
const mongoose = require('mongoose');
const express = require('express');
const { MongoMemoryServer } = require('mongodb-memory-server');
const postRoutes = require('../Routes/Post');
const postModel = require('../Schema/PostModel');
const app = express();
app.use(express.json());
app.use('/posts', postRoutes);

describe('Posts API Integration Tests', function () {
  this.timeout(15000); // Extend timeout

  let mongoServer;
  let createdPostId;
  // Setup in-memory MongoDB
  before(async function () {
    try {
      mongoServer = await MongoMemoryServer.create();
      const uri = mongoServer.getUri();

      await mongoose.connect(uri);
    } catch (err) {
      console.error('Error connecting to in-memory MongoDB:', err);
    }
  });

  after(async function () {
    try {
      await postModel.deleteMany({});
      await mongoose.disconnect();
      await mongoServer.stop();
    } catch (err) {
      console.error('Error during test cleanup:', err);
    }
  });

  // CREATE
  it('should create a new post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        Username: 'testuser',
        File: 'test.jpg',
        Caption: 'Test caption'
      });

    expect(res.status).to.equal(200);
    expect(res.body.Username).to.equal('testuser');
    createdPostId = res.body._id;
  });

  // READ (all posts)
  it('should fetch all posts', async () => {
    const res = await request(app).get('/posts');
    expect(res.status).to.equal(200);
    expect(res.body).to.be.an('array');
  });

  // READ (one post)
  it('should fetch a post by ID', async () => {
    const res = await request(app).get(`/posts/${createdPostId}`);
    expect(res.status).to.equal(200);
    expect(res.body._id).to.equal(createdPostId);
  });

  // UPDATE
  it('should update a post by ID', async () => {
    const res = await request(app)
      .put(`/posts/${createdPostId}`)
      .send({ Caption: 'Updated caption' });

    expect(res.status).to.equal(200);
    expect(res.body.Caption).to.equal('Updated caption');
  });

  // DELETE
  it('should delete a post by ID', async () => {
    const res = await request(app).delete(`/posts/${createdPostId}`);
    expect(res.status).to.equal(200);
    expect(res.body.message).to.equal('Post deleted successfully');
  });
  
});