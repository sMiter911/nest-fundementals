import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import { CreateUserDTO } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/users.entity';
import { UsersService } from 'src/users/users.service';
import { LoginDTO } from './dto/create-login.dto';
import { AuthService } from './auth.service';
import { ApiTags, ApiOperation, ApiBody, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
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
  @ApiResponse({
    status: 201,
    description: 'It will return the user response',
  })
  @ApiBody({ description: 'Endpoint to signup user', type: CreateUserDTO })
  signup(
    @Body()
    userDTO: CreateUserDTO,
  ): Promise<User> {
    return this.userService.create(userDTO);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login User' })
  @ApiResponse({
    status: 200,
    description: 'It will give you the access_token in the response',
  })
  @ApiBody({ description: 'Endpoint to login user', type: LoginDTO })
  login(
    @Body()
    loginDTO: LoginDTO,
  ) {
    return this.authService.login(loginDTO);
  }

  @Post('enable-2fa')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Enable 2FA' })
  @UseGuards(JwtAuthGuard)
  async enable2FA(
    @Req()
    req,
  ): Promise<Enable2FAType> {
    console.log(req.user);
    return this.authService.enable2FA(req.user.id);
  }

  @Get('disable-2fa')
  @ApiBearerAuth('JWT-auth')
  @ApiOperation({ summary: 'Disable 2FA' })
  @UseGuards(JwtAuthGuard)
  async disable2FA(
    @Req()
    req,
  ): Promise<UpdateResult> {
    return this.authService.disable2FA(req.user.id);
  }

  @Post('validate-2fa')
  @ApiBearerAuth('JWT-auth')
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

  // Testing purpose
  @Get('test')
  async testEnv() {
    return this.authService.getEnvVariable();
  }
}
