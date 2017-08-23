var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/comments", function(req, res) {
    
    db.Comment.findAll({}).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/comments/:id", function(req, res) {
    db.Comment.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      console.log(dbComment);
      res.json(dbComment);
    });
  });

  // POST route for saving a new post
  app.post("/api/comments", function(req, res) {
    db.Comment.create(req.body).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // DELETE route for deleting comments
  app.delete("/api/comments/:id", function(req, res) {
    db.Comment.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbComment) {
      res.json(dbComment);
    });
  });

  // PUT route for updating comments
  app.put("/api/comments", function(req, res) {
    db.Comment.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbComment) {
        res.json(dbComment);
      });
  });
};
