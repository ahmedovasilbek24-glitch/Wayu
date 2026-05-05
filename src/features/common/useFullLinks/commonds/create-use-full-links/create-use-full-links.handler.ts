import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {CreateUsefulLinkCommand} from "@/features/common/useFullLinks/commonds/create-use-full-links/create-use-full-links.command";
import {CreateUsefulLinkResponse} from "@/features/common/useFullLinks/commonds/create-use-full-links/create-use-full-links.response";
import {UseFullLinksEntity} from "@/features/common/useFullLinks/useFullLinks.entity";

@CommandHandler(CreateUsefulLinkCommand)
export class CreateUsefulLinkHandler implements ICommandHandler<CreateUsefulLinkCommand> {
  async execute(command: CreateUsefulLinkCommand): Promise<CreateUsefulLinkResponse> {
    const usefulLink = UseFullLinksEntity.create({
      title: command.title,
      icon: command.icon.path,
      link: command.link
    })
    await UseFullLinksEntity.save(usefulLink)
    return plainToInstance(CreateUsefulLinkResponse, usefulLink, {excludeExtraneousValues: true})
  }
}