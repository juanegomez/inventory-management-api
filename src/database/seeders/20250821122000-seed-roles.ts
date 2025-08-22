'use strict';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('roles', [
        { id: 1, name: 'Administrador' },
        { id: 2, name: 'Cliente' }
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('roles', {});
}
