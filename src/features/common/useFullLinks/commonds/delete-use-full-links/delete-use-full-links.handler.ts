import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {DeleteUsefulLinkCommand} from "@/features/common/useFullLinks/commonds/delete-use-full-links/delete-use-full-links.command";
import {UseFullLinksEntity} from "@/features/common/useFullLinks/useFullLinks.entity";

@CommandHandler(DeleteUsefulLinkCommand)
export class DeleteUsefulLinkHandler implements ICommandHandler<DeleteUsefulLinkCommand>{
  async execute(cmd: DeleteUsefulLinkCommand): Promise<void>{
    const usefulLink = await UseFullLinksEntity.findOneBy({id: cmd.id})
    if(!usefulLink){
      throw new NotFoundException('link with given if not found')
    }

    await UseFullLinksEntity.remove(usefulLink)
  }
}