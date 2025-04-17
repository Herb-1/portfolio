import { users, type User, type InsertUser } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, user: Partial<InsertUser>): Promise<User | undefined>;
  deleteUser(id: number): Promise<boolean>;
  getAllUsers(): Promise<User[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.currentId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    try {
      return this.users.get(id);
    } catch (error) {
      console.error(`Error getting user with id ${id}:`, error);
      throw new Error('Failed to get user');
    }
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    try {
      return Array.from(this.users.values()).find(
        (user) => user.username === username,
      );
    } catch (error) {
      console.error(`Error getting user with username ${username}:`, error);
      throw new Error('Failed to get user by username');
    }
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    try {
      return Array.from(this.users.values()).find(
        (user) => user.email === email,
      );
    } catch (error) {
      console.error(`Error getting user with email ${email}:`, error);
      throw new Error('Failed to get user by email');
    }
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    try {
      // Validate required fields
      if (!insertUser.username || !insertUser.email || !insertUser.password) {
        throw new Error('Username, email and password are required');
      }

      // Check if username already exists
      const existingUser = await this.getUserByUsername(insertUser.username);
      if (existingUser) {
        throw new Error('Username already exists');
      }

      // Check if email already exists
      const existingEmail = await this.getUserByEmail(insertUser.email);
      if (existingEmail) {
        throw new Error('Email already exists');
      }

      const id = this.currentId++;
      const now = new Date();
      const user: User = { 
        ...insertUser, 
        id,
        createdAt: now,
        updatedAt: now,
        isActive: true
      };
      this.users.set(id, user);
      return user;
    } catch (error) {
      console.error('Error creating user:', error);
      throw error;
    }
  }

  async updateUser(id: number, userData: Partial<InsertUser>): Promise<User | undefined> {
    try {
      const existingUser = await this.getUser(id);
      if (!existingUser) {
        return undefined;
      }

      // Validate username uniqueness if being updated
      if (userData.username && userData.username !== existingUser.username) {
        const existingUsername = await this.getUserByUsername(userData.username);
        if (existingUsername) {
          throw new Error('Username already exists');
        }
      }

      // Validate email uniqueness if being updated
      if (userData.email && userData.email !== existingUser.email) {
        const existingEmail = await this.getUserByEmail(userData.email);
        if (existingEmail) {
          throw new Error('Email already exists');
        }
      }

      const updatedUser: User = {
        ...existingUser,
        ...userData,
        updatedAt: new Date()
      };
      this.users.set(id, updatedUser);
      return updatedUser;
    } catch (error) {
      console.error(`Error updating user with id ${id}:`, error);
      throw error;
    }
  }

  async deleteUser(id: number): Promise<boolean> {
    try {
      return this.users.delete(id);
    } catch (error) {
      console.error(`Error deleting user with id ${id}:`, error);
      throw new Error('Failed to delete user');
    }
  }

  async getAllUsers(): Promise<User[]> {
    try {
      return Array.from(this.users.values());
    } catch (error) {
      console.error('Error getting all users:', error);
      throw new Error('Failed to get all users');
    }
  }
}

export const storage = new MemStorage();
