import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [AuthModule, ProductModule, PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
