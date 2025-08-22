'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('purchase_items', {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        purchase_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'purchases', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE'
        },
        product_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'products', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        quantity: { type: DataTypes.INTEGER, allowNull: false },
        price: { type: DataTypes.FLOAT, allowNull: false }, // precio unitario al momento de la compra
        created_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('purchase_items');
}
