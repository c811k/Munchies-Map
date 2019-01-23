module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
       latitude: {
           type: DataTypes.DECIMAL(20, 5),
           allowNull: false
       },
       longitude: {
           type: DataTypes.DECIMAL(20, 5),
           allowNull: false
       }
    });
    
    Location.associate = function(models) {
        models.Location.belongsTo(models.Vendor, {
            foreignKey: {
                onDelete: "CASCADE",
                allowNull: false,
                name: "vendorId"
            }
        });
    };

    return Location;
}