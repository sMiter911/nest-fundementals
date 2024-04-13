import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { JwtAuthGuard } from './auth/jwt/jwt.guard';
import { AuthGuard } from '@nestjs/passport';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('profile')
  // @UseGuards(JwtAuthGuard)
  @UseGuards(AuthGuard('bearer'))
  getProfile(
    @Req()
    req,
  ) {
    delete req.user.password;
    return {
      msg: 'Authenticated Via the Freaking API mayne',
      user: req.user,
    };
  }
}
