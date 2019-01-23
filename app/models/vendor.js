module.exports = function (sequelize, DataTypes) {
    var Vendor = sequelize.define("Vendor", {
        owner_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 150]
            }
        },
        business_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 150]
            }
        },
        logo: DataTypes.STRING,
        status: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 150]
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1, 150]
            }
        }

    });

    Vendor.associate = function(models) {
        models.Vendor.hasMany(models.Location, {
            foreignKey: {
                onDelete: "CASCADE",
                allowNull: false,
                name: "vendorId"
            }
        });
    }

    return Vendor;
}