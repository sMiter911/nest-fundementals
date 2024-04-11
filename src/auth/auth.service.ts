import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/entities/users';
import { LoginDTO } from './dto/create-login.dto';
import { JwtService } from '@nestjs/jwt';
import { ArtistsService } from 'src/artists/artists.service';
import { PayloadType } from './types/payload.types';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private jwtService: JwtService,
    private artistService: ArtistsService,
  ) {}

  async login(loginDTO: LoginDTO): Promise<{ accessToken: string }> {
    const user = await this.userService.findOne(loginDTO);
    const passwordMatched = await bcrypt.compare(
      loginDTO.password,
      user.password,
    );
    if (passwordMatched) {
      delete user.password;
      const payload: PayloadType = { email: user.email, userId: user.id };
      const artist = await this.artistService.findArtist(user.id);

      if (artist) {
        payload.artistId = artist.id;
      }

      return {
        accessToken: this.jwtService.sign(payload),
      };
    } else {
      throw new UnauthorizedException('Password does not match');
    }
  }
}
