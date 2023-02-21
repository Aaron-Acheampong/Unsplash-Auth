import { DataTypes, Model } from 'sequelize';
import { sequelize }  from "../model/db.js";

export class User extends Model {}

User.init({
    // id: {
    //     type: DataTypes.INTEGER
    // }, 
    Username: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    Roles: {
        type: DataTypes.INTEGER,
    },
    Refreshtoken: {
        type: DataTypes.STRING,
    }
}, {
    sequelize,
    modelName: 'users'
});