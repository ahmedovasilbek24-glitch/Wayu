import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateNewsCommands} from "@/features/news/news/commonds/update-news/update-news.commands";
import {UpdateNewsResponse} from "@/features/news/news/commonds/update-news/update-news.response";
import {NewsEntity} from "@/features/news/news/news.entity";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@CommandHandler(UpdateNewsCommands)
export class UpdateNewsHandler implements ICommandHandler<UpdateNewsCommands> {
  async execute(command: UpdateNewsCommands): Promise<UpdateNewsResponse> {
    const news = await NewsEntity.findOneBy({id: command.id})

    if (!news) {
      throw new NotFoundException("News with given id not found")
    }

    Object.assign(
      news,
      Object.fromEntries(
        Object.entries(command).filter(([key, value]) => value)
      )
    )

    await NewsEntity.save(news)
    return plainToInstance(UpdateNewsResponse, news, {excludeExtraneousValues: true})
  }
}