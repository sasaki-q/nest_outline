import { Body, Controller, Get } from '@nestjs/common';
import { User } from 'src/common/decorators';
import { DemoService } from './demo.service';
import { DemoTransactionDto } from "./dto";

@Controller('apis/demo')
export class DemoController {
    constructor(
        private demoService: DemoService
    ){}

    @Get("/decorator")
    decorator(@User("uid") value: String){
        // returnValue from /config/decorators/index.ts
        console.log(value)
    }

    @Get("/typeorm")
    async typeormTransaction(@Body() req: DemoTransactionDto){
        return await this.demoService.typeormTransaction(req)
    }
}
