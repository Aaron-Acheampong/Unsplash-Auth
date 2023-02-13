import { DataTypes, Model } from 'sequelize';
import { sequelize }  from "../model/db.js";

export class Posts extends Model {}

Posts.init({
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
    modelName: 'posts'
});