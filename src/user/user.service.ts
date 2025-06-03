import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-user.dto';
import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UserService {
  constructor(private readonly dbService: DatabaseService) {}

  getAll() {
    const users = [...this.dbService.users.values()].map((user) =>
      this.removeUserPasswordField(user),
    );

    return users;
  }

  getById(id: string) {
    if (!this.dbService.users.has(id)) {
      throw new NotFoundException('User not found');
    }

    const user = this.dbService.users.get(id);
    return this.removeUserPasswordField(user);
  }

  create({ login, password }: CreateUserDto) {
    const newUser: User = new User(login, password);
    this.dbService.users.set(newUser.id, newUser);

    return this.removeUserPasswordField(newUser);
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

    return this.removeUserPasswordField(user);
  }

  delete(id: string) {
    if (!this.dbService.users.has(id)) {
      throw new NotFoundException('User not found');
    }

    this.dbService.users.delete(id);
  }

  removeUserPasswordField(user: User) {
    const userWithoutPassword = { ...user };
    delete userWithoutPassword.password;

    return userWithoutPassword;
  }
}
