import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'please provide a valid email address' })
  @IsNotEmpty({ message: 'email is required' })
  email!: string;

  @IsNotEmpty({ message: 'password is required' })
  @IsString({ message: 'password must be a string' })
  password!: string;
}
