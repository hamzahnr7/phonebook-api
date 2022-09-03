import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async registerUser(createUserDto: CreateUserDto) {
    const userDto = await this.userRepository.create({ ...createUserDto }); // Create will automatically run @BeforeInsert decorator
    const { password, ...userData } = await this.userRepository.save(userDto);
    return userData;
  }

  async getAllUser() {
    return await this.userRepository.find();
  }

  async getUserInfo(id: any) {
    return await this.userRepository.findOne({
      select: { email: true, name: true, phonenumber: true, username: true },
      where: { id },
    });
  }

  async updateUserInfo(id: number, updateUserDto: UpdateUserDto) {
    const userDto = await this.userRepository.create({ id, ...updateUserDto });
    const updateUser = await this.userRepository.save(userDto);
    return updateUser;
  }
}
