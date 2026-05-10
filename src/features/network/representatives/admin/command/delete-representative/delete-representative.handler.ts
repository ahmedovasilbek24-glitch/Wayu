import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteRepresentativeCommand} from "./delete-representative.command";
import {NotFoundException} from "@nestjs/common";
import {RepresentativesEntity} from "@/features/network/representatives/representatives.entity";

@CommandHandler(DeleteRepresentativeCommand)
export class DeleteRepresentativeHandler implements ICommandHandler<DeleteRepresentativeCommand> {
  async execute(cmd: DeleteRepresentativeCommand): Promise<void> {
    const representative = await RepresentativesEntity.findOneBy({id: cmd.id});
    if (!representative) {
      throw new NotFoundException("Representative with given id not found");
    }
    await RepresentativesEntity.delete(cmd.id);
  }
}