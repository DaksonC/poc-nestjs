import { ApiProperty } from '@nestjs/swagger';
import { User } from '../entities/user.entity';
import {
  IsEmail,
  IsString,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto extends User {
  @ApiProperty({
    description: 'O e-mail do usuário será usado para fazer login no sistema.',
    example: 'teste@exemplo.com',
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description:
      'A senha do usuário deve conter letras maiúsculas e minúsculas, números e caracteres especiais. Deve conter no minimo 4 caracteres e máximo 20.',
    example: 'Abc@123',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty({
    description: 'O nome do usuário.',
    example: 'João da Silva',
  })
  @IsString()
  name: string;
}
