import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {DeleteApplicationCommand} from "@/features/careers/applications/admin/commands/delete-applications/delete-applications.command";
import {ApplicationsEntity} from "@/features/careers/applications/applications.entity";

@CommandHandler(DeleteApplicationCommand)
export class DeleteApplicationHandler implements ICommandHandler<DeleteApplicationCommand> {
  async execute(command: DeleteApplicationCommand): Promise<void> {
    const exists = await ApplicationsEntity.findOneBy({id: command.id});
    if (!exists)
      throw new NotFoundException("Application with given id not found");
    await ApplicationsEntity.delete({id: command.id});
  }
}