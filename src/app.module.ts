import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "@/config/typeorm.config";
import {NewsModule} from "@/features/news/news.module";
import {CqrsModule} from "@nestjs/cqrs";
import {CommonModule} from "@/features/common/common.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CqrsModule.forRoot(),
    NewsModule,
    CommonModule
  ],
})
export class AppModule {}
