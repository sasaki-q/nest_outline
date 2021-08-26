import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ){}

    async login(req: LoginDto){
        const tokenClaim = {
            id: 20,
            uid: 20,
            age: 20,
            name: "sasaki",
        }
        const token = this.jwtService.sign(tokenClaim);
        return {"statusCode": 200, "token": token};
    }
}
