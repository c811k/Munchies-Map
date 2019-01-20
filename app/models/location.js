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
    
    // Location.associate = function(models) {
    //     this.belongsTo(models.Vendor, {
    //         foreignKey: {
    //             allowNull: false,
    //             name: "vendorId"
    //         }
    //     });
    // };

    return Location;
}