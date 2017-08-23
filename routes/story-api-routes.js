var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/stories", function(req, res) {
    
    db.Story.findAll({}).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // Get rotue for retrieving a single post
  app.get("/api/stories/:id", function(req, res) {
    db.Story.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbStory) {
      console.log(dbStory);
      res.json(dbStory);
    });
  });

  // POST route for saving a new post
  app.post("/api/stories", function(req, res) {
    db.Story.create(req.body).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // DELETE route for deleting stories
  app.delete("/api/stories/:id", function(req, res) {
    db.Story.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbStory) {
      res.json(dbStory);
    });
  });

  // PUT route for updating stories
  app.put("/api/stories", function(req, res) {
    db.Story.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbStory) {
        res.json(dbStory);
      });
  });
};
