'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('purchases', {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'users', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        total: { type: DataTypes.FLOAT, allowNull: false },
        purchase_date: { type: DataTypes.DATE, allowNull: false, defaultValue: DataTypes.NOW },
        created_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('purchases');
}
