import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateUsefulLinkCommand} from "@/features/common/useFullLinks/commonds/update-use-full-links/update-use-full-links.command";
import {UseFullLinksEntity} from "@/features/common/useFullLinks/useFullLinks.entity";
import {UpdateUseFullLinkResponse} from "@/features/common/useFullLinks/commonds/update-use-full-links/update-use-full-links.response";

@CommandHandler(UpdateUsefulLinkCommand)
export class UpdateUsefulLinkHandler implements ICommandHandler<UpdateUsefulLinkCommand> {
  async execute(command: UpdateUsefulLinkCommand): Promise<UpdateUseFullLinkResponse> {
    const usefulLink = await UseFullLinksEntity.findOneBy({id: command.id})
    if (!usefulLink) {
      throw new NotFoundException('link with given id not found')
    }

    Object.assign(
      usefulLink,
      Object.fromEntries(
        Object.entries(command).filter(([key, value]) => value)
      )
    )

    await UseFullLinksEntity.save(usefulLink)
    return plainToInstance(UpdateUseFullLinkResponse, usefulLink, {excludeExtraneousValues: true})
  }
}