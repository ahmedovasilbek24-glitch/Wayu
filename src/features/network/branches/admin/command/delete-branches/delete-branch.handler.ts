import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteBranchCommand} from "./delete-branch.command";
import {BranchesEntity} from "@/features/network/branches/branches.entity";
import {NotFoundException} from "@nestjs/common";

@CommandHandler(DeleteBranchCommand)
export class DeleteBranchHandler implements ICommandHandler<DeleteBranchCommand> {
  async execute(cmd: DeleteBranchCommand): Promise<void> {
    const branch = await BranchesEntity.findOneBy({id: cmd.id});

    if (!branch)
      throw new NotFoundException("Branch with given id not found");

    await BranchesEntity.delete(cmd.id);
  }
}