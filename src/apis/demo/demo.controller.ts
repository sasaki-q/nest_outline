import { Body, Controller, Get, Headers, InternalServerErrorException, UseFilters, UseGuards, UseInterceptors } from '@nestjs/common';
import { User } from 'src/config/decorators';
import { CustomFilter } from 'src/config/filters';
import { CustomGuard } from 'src/config/guards';
import { CustomInterceptor } from 'src/config/interceptors';
import { DemoService } from './demo.service';
import { DemoFilterDto, DemoGuardDto, DemoTransactionDto } from "./dto";

@Controller('apis/demo')
export class DemoController {
    constructor(
        private demoService: DemoService
    ){}

    @Get("/transaction")
    async transaction(@Body() req: DemoTransactionDto): Promise<TransactionType>{
        return await this.demoService.transaction(req)
    }

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
