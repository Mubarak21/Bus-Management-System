import {
  IsString,
  IsEmail,
  IsNotEmpty,
  MinLength,
  MaxLength,
  Matches,
} from 'class-validator';
import { Expose } from 'class-transformer';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Username cannot be empty' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username cannot be longer than 20 characters' })
  @Matches(/^[a-zA-Z0-9_-]+$/, {
    message:
      'Username can only contain letters, numbers, underscores, and hyphens',
  })
  @Expose()
  username: string;

  @IsNotEmpty({ message: 'Email cannot be empty' })
  @IsEmail({}, { message: 'Invalid email format' })
  @MaxLength(100, { message: 'Email cannot be longer than 100 characters' })
  @Expose()
  email: string;

  @IsNotEmpty({ message: 'Phone number cannot be empty' })
  @IsString({ message: 'Phone number must be a string' })
  @Matches(/^\+?[1-9]\d{1,14}$/, {
    message: 'Invalid phone number format',
  })
  @Expose()
  phone: string;

  @IsNotEmpty({ message: 'Password cannot be empty' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @MaxLength(32, { message: 'Password cannot be longer than 32 characters' })
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
    {
      message:
        'Password must include uppercase, lowercase, number, and special character',
    },
  )
  password: string;
}
