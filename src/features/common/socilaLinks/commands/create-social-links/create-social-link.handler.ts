import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {CreateSocialLinkResponse} from "@/features/common/socilaLinks/commands/create-social-links/create-social-link.response";
import {CreateSocialLinkCommand} from "@/features/common/socilaLinks/commands/create-social-links/create-social-link.commonds";
import {SocialLinksEntity} from "@/features/common/socilaLinks/socialLinks.entity";

@CommandHandler(CreateSocialLinkCommand)
export class CreateSocialLinkHandler implements ICommandHandler<CreateSocialLinkCommand> {
  async execute(command: CreateSocialLinkCommand): Promise<CreateSocialLinkResponse> {
    const socialLink = SocialLinksEntity.create({
      title: command.title,
      icon: command.icon,
      link: command.link
    })
    await SocialLinksEntity.save(socialLink)
    return plainToInstance(CreateSocialLinkResponse, socialLink, {excludeExtraneousValues: true})
  }
}