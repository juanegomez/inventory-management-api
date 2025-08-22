'use strict';
import { QueryInterface } from 'sequelize';

export async function up(queryInterface: QueryInterface) {
    await queryInterface.bulkInsert('products', [
        {
            batch_number: 'LOT-001',
            name: 'Laptop Dell Inspiron 15',
            price: 2500000,
            quantity: 10,
            entry_date: new Date(),
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            batch_number: 'LOT-002',
            name: 'Smartphone Samsung Galaxy S23',
            price: 3200000,
            quantity: 15,
            entry_date: new Date(),
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            batch_number: 'LOT-003',
            name: 'Monitor LG 27 pulgadas',
            price: 900000,
            quantity: 20,
            entry_date: new Date(),
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            batch_number: 'LOT-004',
            name: 'Teclado Mecánico Logitech',
            price: 150000,
            quantity: 30,
            entry_date: new Date(),
            created_at: new Date(),
            updated_at: new Date()
        }
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('products', {});
}
