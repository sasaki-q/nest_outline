import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, ResponseDto } from './dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post("/")
    @ApiResponse({status: HttpStatus.OK, type: ResponseDto})
    async create(@Body() req: CreateUserDto): Promise<ResponseDto> {
        const res = await this.userService.create(req);
        return res;
    }
}
