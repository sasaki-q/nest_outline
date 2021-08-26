import { Body, Controller, Post } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { AuthDecorator } from 'src/config/decorators/auth_decorator';
import { AuthService } from './auth.service';
import { LoginDto } from './dto';

@Controller('/apis/auth')
export class AuthController {
    constructor(
        private jwtService: JwtService,
        private authService: AuthService,
    ){}

    @Post("/login")
    async login(@Body() req: LoginDto, @AuthDecorator("email") value: String): Promise<LoginType>{
        return await this.authService.login(req);
    }
}