'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('products', {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        batch_number: { type: DataTypes.STRING, allowNull: false, unique: true },
        name: { type: DataTypes.STRING, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        entry_date: { type: DataTypes.DATE, allowNull: false },
        created_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('products');
}
