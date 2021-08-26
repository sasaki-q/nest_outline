import { Module } from '@nestjs/common';
import { DemoModule } from './demo/demo.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [DemoModule, AuthModule,]
})
export class ApisModule {}
