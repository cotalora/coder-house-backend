import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './modules/products/products.module';
import { ProductsController } from './controllers/products/products.controller';
import { MongooseModule } from '@nestjs/mongoose/dist/mongoose.module';
import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [ProductsModule, MongooseModule.forRoot(process.env.MONGO_URL, { retryAttempts: 2 })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
