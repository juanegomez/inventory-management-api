'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('roles', {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        name: { type: DataTypes.STRING, allowNull: false, unique: true }
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('roles');
}
