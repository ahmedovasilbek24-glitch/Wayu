import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {DeleteStaticInfoCommand} from "@/features/common/staticInfo/commands/delete-static-info/delete-static-info.command";
import {StaticInfoEntity} from "@/features/common/staticInfo/staticInfo.entity";

@CommandHandler(DeleteStaticInfoCommand)
export class DeleteStaticInfoHandler implements ICommandHandler<DeleteStaticInfoCommand> {
  async execute(cmd: DeleteStaticInfoCommand): Promise<void> {
    const staticInfo = await StaticInfoEntity.findOneBy({id: cmd.id});

    if (!staticInfo)
      throw new NotFoundException("Static info with given id not found");

    await StaticInfoEntity.delete(cmd.id);
  }
}