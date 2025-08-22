'use strict';
import { QueryInterface } from 'sequelize';
import bcrypt from 'bcrypt';

export async function up(queryInterface: QueryInterface) {
    const passwordHash = await bcrypt.hash('123456', 10);

    await queryInterface.bulkInsert('users', [
        {
            first_name: 'Admin',
            last_name: 'User',
            document: '123456789',
            document_type: 'CC',
            email: 'admin@example.com',
            password: passwordHash,
            role_id: 1, // ADMIN
            created_at: new Date(),
            updated_at: new Date()
        },
        {
            first_name: 'Cliente',
            last_name: 'User',
            document: '987654321',
            document_type: 'CC',
            email: 'client@example.com',
            password: passwordHash,
            role_id: 2, // CLIENT
            created_at: new Date(),
            updated_at: new Date()
        }
    ]);
}

export async function down(queryInterface: QueryInterface) {
    await queryInterface.bulkDelete('users', {});
}
