import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {UpdateRepresentativeResponse} from "./update-representative.response";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateRepresentativeCommand} from "@/features/network/representatives/admin/command/update-representative/update-representative.command";
import {RepresentativesEntity} from "@/features/network/representatives/representatives.entity";

@CommandHandler(UpdateRepresentativeCommand)
export class UpdateRepresentativeHandler implements ICommandHandler<UpdateRepresentativeCommand> {
  async execute(command: UpdateRepresentativeCommand): Promise<UpdateRepresentativeResponse> {
    const representative = await RepresentativesEntity.findOneBy({id: command.id});
    if (!representative) {
      throw new NotFoundException("Representative with given id not found");
    }

    if (command.fullName !== undefined)
      representative.fullName = command.fullName;

    if (command.image !== undefined)
      representative.image = command.image.path;

    if (command.email !== undefined)
      representative.email = command.email;

    if (command.phoneNumber !== undefined)
      representative.phoneNumber = command.phoneNumber;

    if (command.resume !== undefined)
      representative.resume = command.resume;

    await RepresentativesEntity.save(representative);
    return plainToInstance(UpdateRepresentativeResponse, representative, {excludeExtraneousValues: true});
  }
}