module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define("User", {
    
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },

    email: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
      } 
    },

    picture: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
     }
    },

    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
     }
    },

    social_media: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: [1]
     }
    },

  });


  User.associate = function(models) {
    // Associating User with Story
    // When a User is deleted, also delete any associated Story and Comment
    User.hasMany(models.Story, {
      onDelete: "cascade"
    });
  };  



  return User;
};
