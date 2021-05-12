import { PrismaClient } from '.prisma/client';
import { PaginationDto } from '@common/types/dto.types';
import { PrismaService } from '@providers/prisma.service';
import { injectable } from 'tsyringe';

@injectable()
export class CategoryService {
  private _db: PrismaClient;
  constructor(prismaService: PrismaService) {
    this._db = prismaService.client;
  }
  public getCategories(pagination: PaginationDto) {
    const limit = pagination?.limit || 25;
    const page = pagination?.page || 1;

    const categories = this._db.category.findMany({ take: limit, skip: limit * (page - 1) });
    const count = this._db.category.count();
    return {
      count,
      categories,
    };
  }
}
