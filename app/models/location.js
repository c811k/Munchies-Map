module.exports = function(sequelize, DataTypes) {
    var Location = sequelize.define("Location", {
        lang: {
            type: DataTypes.INTEGER,
            allowNull: false,
            
        },
          linch: {
            type: DataTypes.INTEGER,
            allowNull: false,
           
        }  
    });
    return Location;
}