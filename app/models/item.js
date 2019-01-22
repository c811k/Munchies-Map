module.exports = function(sequelize, DataTypes) {
    var Item = sequelize.define("Item", {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 150]
            }
        },
        price: {
            type: DataTypes.DECIMAL(10, 2),
            allowNull: false    
        }
    });

    Item.associate = function(models) {
        this.belongsTo(models.Vendor, {
            foreignKey: {
                allowNull: false,
                name: "vendorId"
            }
        });
    };
    
    return Item;
}