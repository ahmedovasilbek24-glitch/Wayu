import { Module } from '@nestjs/common';
import {TypeOrmModule} from "@nestjs/typeorm";
import {typeOrmConfig} from "@/config/typeorm.config";
import {NewsModule} from "@/features/news/news.module";
import {CqrsModule} from "@nestjs/cqrs";
import {CommonModule} from "@/features/common/common.module";
import {CareersModule} from "@/features/careers/careers.module";
import {CacheModule} from "@nestjs/cache-manager";
import {AuthModule} from "@/features/common/auth/auth.module";
import {LibraryModule} from "@/features/library/library.module";
import {NetworkModule} from "@/features/network/network.module";
import {SupportModule} from "@/features/support/support.module";

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CacheModule.register({
      isGlobal: true,
      ttl: 1000 * 60 * 5
    }),
    CqrsModule.forRoot(),
    NewsModule,
    CommonModule,
    CareersModule,
    AuthModule,
    LibraryModule,
    NetworkModule,
    SupportModule,
  ],
})
export class AppModule {}
