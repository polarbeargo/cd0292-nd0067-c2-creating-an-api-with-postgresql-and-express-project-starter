import database from '../database'; // Import the Singleton instance
import { User } from './interface';

export class UserModel {
    async index(): Promise<User[]> {
        try {
            const query = 'SELECT * FROM users';
            const result = await database.query(query); // Use the singleton instance
            return result.rows;
        } catch (error) {
            throw new Error('Failed to fetch users');
        }
    }

    async create(user: User): Promise<User> {
        try {
            const query = 'INSERT INTO users (name, email, password) VALUES ($1, $2, $3) RETURNING *';
            const values = [user.username, user.email, user.password];
            const result = await database.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error('Failed to create user');
        }
    }

    async update(id: number, user: User): Promise<User> {
        try {
            const query = 'UPDATE users SET name = $1, email = $2 WHERE id = $3 RETURNING *';
            const values = [user.username, user.email, id]; 
            const result = await database.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error('Failed to update user');
        }
    }

    async delete(id: number): Promise<void> {
        try {
            const query = 'DELETE FROM users WHERE id = $1';
            const values = [id];
            await database.query(query, values);
        } catch (error) {
            throw new Error('Failed to delete user');
        }
    }

    async show(id: number): Promise<User> {
        try {
            const query = 'SELECT * FROM users WHERE id = $1';
            const values = [id];
            const result = await database.query(query, values);
            return result.rows[0];
        } catch (error) {
            throw new Error('Failed to fetch user');
        }
    }
}