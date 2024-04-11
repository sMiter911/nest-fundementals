import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/users';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/create-login.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(
    private userService: UsersService,
    private authService: AuthService,
  ) {}

  @Post('signup')
  @ApiOperation({ summary: 'Signup User' })
  @ApiBody({ description: 'Endpoint to signup user', type: CreateUserDTO })
  signup(
    @Body()
    userDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiBody({ description: 'Endpoint to login user', type: LoginDTO })
  login(
    @Body()
    loginDTO: LoginDTO,
  ) {
    return this.authService.login(loginDTO);
  }
}
