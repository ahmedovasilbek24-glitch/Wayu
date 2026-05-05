import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateSocialLinkCommand} from "@/features/common/socilaLinks/commands/update-social-links/update-socila-link.command";
import {UpdateSocialLinkResponse} from "@/features/common/socilaLinks/commands/update-social-links/update-social-link.response";
import {SocialLinksEntity} from "@/features/common/socilaLinks/socialLinks.entity";

@CommandHandler(UpdateSocialLinkCommand)
export class UpdateSocialLinkHandler implements ICommandHandler<UpdateSocialLinkCommand> {
  async execute(command: UpdateSocialLinkCommand): Promise<UpdateSocialLinkResponse> {
    const socialLink = await SocialLinksEntity.findOneBy({id: command.id})
    if (!socialLink) {
      throw new NotFoundException('link with given id not found')
    }

    Object.assign(
      socialLink,
      Object.fromEntries(
        Object.entries(command).filter(([key, value]) => value)
      )
    )

    await SocialLinksEntity.save(socialLink)
    return plainToInstance(UpdateSocialLinkResponse, socialLink, {excludeExtraneousValues: true})
  }
}