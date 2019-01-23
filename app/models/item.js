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
        models.Item.belongsTo(models.Vendor, {
            foreignKey: {
                onDelete: "CASCADE",
                allowNull: false,
                name: "vendorId"
            }
        });
    };
    
    return Item;
}