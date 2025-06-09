import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';
import { instanceToPlain } from 'class-transformer';
import { getOrThrow } from '../common/get-or-throw';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    return instanceToPlain([...this.dbService.users.values()]);
  }

  getById(id: string) {
    const user = getOrThrow(this.dbService.users, id, 'User not found');
    return instanceToPlain(user);
  }

  create({ login, password }: CreateUserDto) {
    const newUser: User = new User(login, password);
    this.dbService.users.set(newUser.id, newUser);
    return instanceToPlain(newUser);
  }

  update(id: string, { oldPassword, newPassword }: UpdatePasswordDto) {
    const user = getOrThrow(this.dbService.users, id, 'User not found');

    if (user.password !== oldPassword) {
      throw new ForbiddenException('Old password is wrong');
    }

    user.password = newPassword;
    user.version += 1;
    user.updatedAt = Date.now();

    return instanceToPlain(user);
  }

  delete(id: string) {
    getOrThrow(this.dbService.users, id, 'User not found');
    this.dbService.users.delete(id);
  }
}
