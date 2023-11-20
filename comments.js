// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const app = express();
app.use(bodyParser.json());

// Create comments object
const commentsByPostId = {};

// Create routes
app.get('/posts/:id/comments', (req, res) => {
  res.send(commentsByPostId[req.params.id] || []);
});

// Create routes
app.post('/posts/:id/comments', (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  // Get comment from request body
  const { content } = req.body;
  // Get comments for post
  const comments = commentsByPostId[req.params.id] || [];
  // Add new comment to comments array
  comments.push({ id: commentId, content });
  // Update comments for post
  commentsByPostId[req.params.id] = comments;
  // Send comment back to user
  res.status(201).send(comments);
});

// Start web server
app.listen(4001, () => {
  console.log('Listening on 4001');
});