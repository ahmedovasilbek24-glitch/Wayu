import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {DeleteSocialLinkCommand} from "@/features/common/socilaLinks/commands/delete-social-links/delete-social-link.command";
import {SocialLinksEntity} from "@/features/common/socilaLinks/socialLinks.entity";

@CommandHandler(DeleteSocialLinkCommand)
export class DeleteSocialLinkHandler implements ICommandHandler<DeleteSocialLinkCommand> {
  async execute(cmd: DeleteSocialLinkCommand): Promise<void> {
    const socialLink = await SocialLinksEntity.findOneBy({id: cmd.id})
    if (!socialLink) {
      throw new NotFoundException('link with given if not found')
    }

    await SocialLinksEntity.remove(socialLink)
  }
}