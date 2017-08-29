module.exports = function(sequelize, DataTypes) {
  var Story = sequelize.define("Story", {
    
    category: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    story: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
    solution: {
      type: DataTypes.TEXT,
      allowNull: false,
      len: [1]
    },
  });

  Story.associate = function(models) {
    
    Story.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Story;
};