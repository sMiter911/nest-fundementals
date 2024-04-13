import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/users';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/create-login.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { JwtAuthGuard } from './jwt/jwt.guard';
import { Enable2FAType } from './types/auth.types';
import { UpdateResult } from 'typeorm';
import { ValidateTokenDTO } from './dto/validate-token.dto';

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

  @Post('enable-2fa')
  @ApiOperation({ summary: 'Enable 2FA' })
  @ApiBody({ description: 'Endpoint to enable 2FA', type: 'string' })
  @UseGuards(JwtAuthGuard)
  async enable2FA(
    @Req()
    req,
  ): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.id);
  }

  @Get('disable-2fa')
  @ApiOperation({ summary: 'Disable 2FA' })
  @ApiBody({ description: 'Endpoint to disable 2FA', type: 'string' })
  @UseGuards(JwtAuthGuard)
  async disable2FA(
    @Req()
    req,
  ): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.id);
  }

  @Post('validate-2fa')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Validate 2FA' })
  validate2FA(
    @Req()
    req,
    @Body() ValidateTokenDTO: ValidateTokenDTO,
  ): Promise<{ verified: boolean }> {
    return this.authService.validate2FAToken(
      req.user.userId,
      ValidateTokenDTO.token,
    );
  }
}
