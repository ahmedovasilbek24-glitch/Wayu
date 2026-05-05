import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteNewsCommand} from "@/features/news/news/commonds/delete-news/delete-news.command";
import {NewsEntity} from "@/features/news/news/news.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteNewsCommand)
export class DeleteNewsHandle implements ICommandHandler<DeleteNewsCommand> {
  async execute(cmd: DeleteNewsCommand): Promise<void> {
    const news = await NewsEntity.findOneBy({id: cmd.id})
    if (!news) {
      throw new NotFoundException("News with given id not found")
    }

    await NewsEntity.remove(news)
  }
}