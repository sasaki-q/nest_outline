import { Get, Post, Body, Controller, HttpStatus, Param, Query } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiResponse } from '@nestjs/swagger';
import { UserService } from './user.service';
import { CreateUserDto, ResponseDto } from './dto';
import { User } from './entity';

@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService
    ){}

    @Get("/")
    @ApiResponse({status: HttpStatus.OK})
    async getUserTodo(@Query() req): Promise<User> {
        return await this.userService.getUserTodo(Number(req.id));
    }

    @Post("/")
    @ApiResponse({status: HttpStatus.OK, type: ResponseDto})
    @ApiInternalServerErrorResponse({status: HttpStatus.INTERNAL_SERVER_ERROR, description: "Internal server error"})
    async create(@Body() req: CreateUserDto): Promise<ResponseDto> {
        const res = await this.userService.create(req);
        return res;
    }
}
