import userRepository from '../repositories/userRepository.js';
import {
    NotFoundError,
    ConflictError,
    BadRequestError,
} from '../utils/errors.js';
import { logger } from '../utils/logger.js';

/**
 * Get user by email
 */
export const getUserById = async (uid) => {
    try {
        logger.info(`Fetching user by UID: ${uid}`);
        const user = await userRepository.findById(uid);

        // If user not found, return null
        if (!user) {
            return null;
        }

        // Return found user
        return user;
    } catch (error) {
        logger.error(`Error in getUserById for UID ${uid}:`, error);
        throw error;
    }
}


/**
 * Create new user
 */
export const createUser = async (userData) => {
    try {
        logger.info(`Creating new user with email: ${userData.email}`);

        // Validate required fields
        if (!userData.uid || !userData.email || !userData.displayName) {
            throw new BadRequestError('UID, email, and displayName are required');
        }

        // Create user
        const user = await userRepository.create(userData);

        logger.info(`User created successfully: ${user.uid}`);
        return user;
    } catch (error) {
        logger.error(`Error in createUser:`, error);
        throw error;
    }
}