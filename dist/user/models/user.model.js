import { DataTypes, Model } from "sequelize";
import { sequelize } from "../../utils/db.connection.js";
class User extends Model {
    password(password, password1) {
        throw new Error("Method not implemented.");
    }
}
User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    fullname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    cauntry: {
        type: DataTypes.STRING
    },
    education: {
        type: DataTypes.STRING,
    },
    certificates: {
        type: DataTypes.STRING
    }
}, {
    sequelize,
    modelName: "users"
});
export { User };
