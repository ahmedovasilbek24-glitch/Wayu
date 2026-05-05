import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateTagsResponse} from "@/features/common/tags/commands/update-tags/update-tags.response";
import {Tags} from "@/features/common/tags/tags.entity";
import {UpdateTagsCommand} from "@/features/common/tags/commands/update-tags/update-tags.command";

@CommandHandler(UpdateTagsCommand)
export class UpdateTagsHandler implements ICommandHandler<UpdateTagsCommand> {
  async execute(command: UpdateTagsCommand): Promise<UpdateTagsResponse> {
    const tags = await Tags.findOneBy({id: command.id})
    if (!tags) {
      throw new NotFoundException('tags with given id not found')
    }

    Object.assign(
      tags,
      Object.fromEntries(
        Object.entries(command).filter(([key, value]) => value)
      )
    )

    await Tags.save(tags)
    return plainToInstance(UpdateTagsResponse, tags, {excludeExtraneousValues: true})
  }
}