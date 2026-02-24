import { Model, DataTypes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";
import { sequelize } from "../config/database.js";

export class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: string;
  declare username: string;
  declare email: string;
  declare password: string;
  declare avatarUrl: string | null;
  declare firstName: string;
  declare lastName: string | null;
  declare unitPreference: string ;
  declare readonly createdAt: CreationOptional<Date>;
  declare readonly updatedAt: CreationOptional<Date>;
}


User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatarUrl: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    unitPreference: {
      type: DataTypes.ENUM('km', 'miles'),
      allowNull: false,
      defaultValue: 'km',
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  },
  {
    sequelize,
    tableName: "users",
  }
);
