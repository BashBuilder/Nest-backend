import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail({}, { message: 'please provide a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  email!: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  @MinLength(8, { message: 'password must be at least 8 characters long' })
  password!: string;

  @IsNotEmpty({ message: 'name is required' })
  @IsString({ message: 'name must be a string' })
  name!: string;
}
