import { DataTypes, Model } from 'sequelize';
import { sequelize }  from "../model/db.js";

export class Users extends Model {}

Users.init({
    // id: {
    //     type: DataTypes.INTEGER
    // }, 
    label: {
        type: DataTypes.STRING
    },
    url: {
        type: DataTypes.STRING
    },
    date: {
        type: DataTypes.DATE
    }
}, {
    sequelize,
    modelName: 'users'
});