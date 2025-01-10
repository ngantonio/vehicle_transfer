import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsEmail,
  Length,
  IsInt,
  MinLength,
  Matches,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  @ApiProperty({
    description: 'Username',
    maxLength: 50,
    example: 'rodolfoc',
    required: true,
  })
  username: string;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @Length(1, 100)
  @ApiProperty({
    type: String,
    description: 'User email',
    maxLength: 100,
    required: true,
  })
  email: string;

  @IsInt()
  @ApiProperty({
    type: Number,
    description: 'The role ID of the user',
  })
  role_id: number;

  @ApiProperty({
    description: 'Password for the user',
    example: 'P@ssw0rd!',
  })
  @IsString()
  @IsNotEmpty()
  @MinLength(8, {
    message: 'Password must be at least 6 characters long',
  })
  @Matches(/(?=.*[a-z])/, {
    message: 'Password must contain at least one lowercase letter',
  })
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  @Matches(/(?=.*[0-9])/, {
    message: 'Password must contain at least one number',
  })
  @Matches(/(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])/, {
    message: 'Password must contain at least one special character',
  })
  password: string;
}
