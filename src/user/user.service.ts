import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    return instanceToPlain([...this.dbService.users.values()]);
  }

  getById(id: string) {
    if (!this.dbService.users.has(id)) {
      throw new NotFoundException('User not found');
    }

    const user = this.dbService.users.get(id);
    return instanceToPlain(user);
  }

  create({ login, password }: CreateUserDto) {
    const newUser: User = new User(login, password);
    this.dbService.users.set(newUser.id, newUser);
    return instanceToPlain(newUser);
  }

  update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    if (!this.dbService.users.has(id)) {
      throw new NotFoundException('User not found');
    }

    const user = this.dbService.users.get(id);

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return instanceToPlain(user);
  }

  delete(id: string) {
    if (!this.dbService.users.has(id)) {
      throw new NotFoundException('User not found');
    }

    this.dbService.users.delete(id);
  }
}
