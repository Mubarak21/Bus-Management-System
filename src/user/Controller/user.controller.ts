import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseInterceptors,
  ClassSerializerInterceptor,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { User } from '../user.schema';
import { UserService } from '../Service/user.service';
import { CreateUserDto } from '../dto/createUserDto';

@Controller('user')
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signUp')
  @HttpCode(HttpStatus.CREATED)
  async createUser(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ message: string; user: User }> {
    const { username, email, phone, password } = createUserDto;
    const newUser = await this.userService.createUser(
      username,
      email,
      phone,
      password,
    );
    return {
      message: 'User has been Created',
      user: newUser,
    };
  }

  @Get()
  async getUsers(): Promise<User[]> {
    return await this.userService.getUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string): Promise<User> {
    return await this.userService.getUserById(id);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() updateData: Partial<User>,
  ): Promise<{ message: string }> {
    await this.userService.updateUser(id, updateData);
    return { message: 'User Updated Successfully' };
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async deleteUser(@Param('id') id: string): Promise<void> {
    await this.userService.deleteUser(id);
  }
}
