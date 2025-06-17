import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { PrismaService } from '../prisma/prisma.service';
import { LoggingService } from '../logging/logging.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private readonly logger: LoggingService,
  ) {}

  getAll() {
    return this.prisma.user.findMany();
  }

  async getById(id: string) {
    const user = await this.prisma.user.findUniqueOrThrow({
      where: { id: id },
    });
    return {
      ...user,
      createdAt: Number(user.createdAt.getTime()),
      updatedAt: Number(user.updatedAt.getTime()),
    };
  }

  async create({ login, password }: CreateUserDto) {
    password = await bcrypt.hash(password, 10);

    const user = await this.prisma.user.create({
      data: { login, password },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return {
      ...user,
      createdAt: Number(user.createdAt.getTime()),
      updatedAt: Number(user.updatedAt.getTime()),
    };
  }

  async update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const _user = await this.prisma.user.findUniqueOrThrow({
      where: { id: id },
    });

    if (_user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    const updated_user = await this.prisma.user.update({
      where: { id: _user.id },
      data: {
        password: newPassword,
        version: _user.version + 1,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        login: true,
        version: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return {
      ...updated_user,
      createdAt: Number(updated_user.createdAt.getTime()),
      updatedAt: Number(updated_user.updatedAt.getTime()),
    };
  }

  async delete(id: string) {
    const _user = await this.prisma.user.findUniqueOrThrow({
      where: { id: id },
    });
    await this.prisma.user.delete({ where: { id: _user.id } });
  }

  async getByLogin(login: string) {
    const userPrisma = await this.prisma.user.findFirst({
      where: { login: login },
    });

    if (!userPrisma) {
      throw new NotFoundException('User not found');
    }

    return userPrisma;
  }
}
