import { Body, Controller, HttpStatus, Post } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, ResponseDto } from './dto';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Post("/")
    @ApiResponse({status: HttpStatus.OK, type: ResponseDto})
    @ApiInternalServerErrorResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server error"})
    async create(@Body() req: CreateUserDto): Promise<ResponseDto> {
        const res = await this.userService.create(req);
        return res;
    }
}
