import { Body, Controller, Get, Headers, InternalServerErrorException, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { CustomFilter } from 'src/common/filters';
import { CustomGuard } from 'src/common/guards';
import { CustomInterceptor } from 'src/common/interceptors';
import { DemoService } from './demo.service';
import { DemoFilterDto, DemoGuardDto, DemoTransactionDto } from "./dto";

@Controller('apis/demo')
export class DemoController {
    constructor(
        private demoService: DemoService
    ){}

    @Get("/transaction/typeorm")
    async typeormTransaction(@Body() req: DemoTransactionDto){
        return await this.demoService.typeormTransaction(req)
    }

    @Get("/guard")
    @UseGuards(CustomGuard)
    guard(@Headers("Authorization") req: DemoGuardDto): DemoGuardDto{
        // {Authorization: demo}
        return req;
    }

    @Get("/interceptor")
    @UseInterceptors(CustomInterceptor)
    interceptor(): string[]{
        return ["return", "interceptor"]
    }

    @Get("/filter")
    @UseFilters(CustomFilter)
    async filter(@Body() req: DemoFilterDto){
        throw new InternalServerErrorException()
    }

    @Get("/decorator")
    async decorator(@User("uid") returnValue: String){
        // returnValue from /config/decorators/index.ts
        console.log(returnValue)
    }
}
