import { prisma } from '../lib/prisma.js';
import { handlePrismaError } from '../utils/errors.js';

/**
 * Base Repository
 * Provides common database operations
 */
export class BaseRepository {
  constructor(model) {
    this.model = model;
  }

  async findAll(options = {}) {
    try {
      const { where, select, include, orderBy, skip, take } = options;
      return await this.model.findMany({
        where,
        select,
        include,
        orderBy,
        skip,
        take,
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async findById(id, options = {}) {
    try {
      const { select, include } = options;
      return await this.model.findUnique({
        where: { uid: id },
        select,
        include,
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async findOne(where, options = {}) {
    try {
      const { select, include } = options;
      return await this.model.findFirst({
        where,
        select,
        include,
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async create(data) {
    try {
      return await this.model.create({ data });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async update(id, data) {
    try {
      return await this.model.update({
        where: { uid: id },
        data,
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async delete(id) {
    try {
      return await this.model.delete({
        where: { uid: id },
      });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async count(where = {}) {
    try {
      return await this.model.count({ where });
    } catch (error) {
      throw handlePrismaError(error);
    }
  }

  async exists(where) {
    try {
      const count = await this.model.count({ where });
      return count > 0;
    } catch (error) {
      throw handlePrismaError(error);
    }
  }
}
