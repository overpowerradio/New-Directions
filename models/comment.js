module.exports = function(sequelize, DataTypes) {
    var Comment = sequelize.define("Comment", {

        comment: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Comment.associate = function(models) {

        // A Comment can't be created without a User due to the foreign key constraint
        Comment.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });

    };

    return Comment;
};