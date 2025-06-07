import { DataTypes, Model } from "sequelize";
const USER_MODEL_NAME = "User";
const USER_TABLE_NAME = "users";
export const userSchema = {
    id: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        primaryKey: true,
        unique: true,
    },
    name: {
        type: new DataTypes.STRING(64),
        allowNull: false,
    },
    email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
        unique: true
    },
    password: {
        type: new DataTypes.STRING(64),
        allowNull: false,
        unique: true,
    },
    createdAt: {
        type: DataTypes.DATE,
        field: "created_at",
        alloNull: false,
        defaultValue: DataTypes.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: "updated_at",
        alloNull: false,
        defaultValue: DataTypes.NOW
    }
};
export class UserModel extends Model {
    static associate(sequelize) {
    }
    static config(sequelize) {
        return {
            sequelize,
            tableName: USER_TABLE_NAME,
            modelName: USER_MODEL_NAME,
            timestamp: false,
        };
    }
}
