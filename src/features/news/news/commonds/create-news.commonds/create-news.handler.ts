import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateNewsCommands} from "@/features/news/news/commonds/create-news.commonds/create-news.commonds";
import {CreateNewsResponse} from "@/features/news/news/commonds/create-news.commonds/create-news.response";
import {NewsEntity} from "@/features/news/news/news.entity";
import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";

@CommandHandler(CreateNewsCommands)
export class CreateNewsHandler implements ICommandHandler<CreateNewsCommands> {
  async execute(command: CreateNewsCommands): Promise<CreateNewsResponse> {
    const alreadyExists = await NewsEntity.existsBy({
      title: ILike(command.title),
      content: ILike(command.content),
      date: ILike(command.date),
      image: ILike(command.image)
    });

    if (alreadyExists)
      throw new BadRequestException("News already exists")

    const newNews = NewsEntity.create({title: command.title, image: command.image, content: command.content, date: command.date} as NewsEntity);
    await NewsEntity.save(newNews);
    return plainToInstance(CreateNewsResponse, newNews, {excludeExtraneousValues: true})
  }
}