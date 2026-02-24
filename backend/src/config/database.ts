import { Sequelize } from "sequelize";
import { env } from './env.js'

export const sequelize = new Sequelize(env.DATABASE_URL, {
    define:{
        underscored: true
    },
    logging: false,
    dialect: 'postgres'
});