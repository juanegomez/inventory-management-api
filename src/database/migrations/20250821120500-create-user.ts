'use strict';
import { QueryInterface, DataTypes } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.createTable('users', {
        id: { allowNull: false, autoIncrement: true, primaryKey: true, type: DataTypes.INTEGER },
        first_name: { type: DataTypes.STRING, allowNull: false },
        last_name: { type: DataTypes.STRING, allowNull: false },
        document: { type: DataTypes.STRING, allowNull: false },
        document_type: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
        password: { type: DataTypes.STRING, allowNull: false },
        role_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: { model: 'roles', key: 'id' },
            onUpdate: 'CASCADE',
            onDelete: 'RESTRICT'
        },
        created_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { allowNull: false, type: DataTypes.DATE, defaultValue: DataTypes.NOW }
    });
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.dropTable('users');
}
