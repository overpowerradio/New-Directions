module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: { autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        firstname: { type: DataTypes.STRING, notEmpty: true },
        lastname: { type: DataTypes.STRING, notEmpty: true },
        email: { type: DataTypes.STRING, validate: { isEmail: true } },
        username: { type: DataTypes.TEXT },
        password: { type: DataTypes.STRING, allowNull: false },
        about: { type: DataTypes.TEXT },
        avatarImg: { type: DataTypes.TEXT },
        location: { type: DataTypes.STRING, allowNull: true },
        facebook: { type: DataTypes.STRING, allowNull: true },
        instagram: { type: DataTypes.STRING, allowNull: true },
        linkedIn: { type: DataTypes.STRING, allowNull: true },
        last_login: { type: DataTypes.DATE },
        status: { type: DataTypes.ENUM('active', 'inactive'), defaultValue: 'active' }
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