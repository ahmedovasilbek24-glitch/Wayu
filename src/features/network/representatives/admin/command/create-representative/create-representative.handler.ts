import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {CreateRepresentativeCommand} from "./create-representative.command";
import {CreateRepresentativeResponse} from "./create-representative.response";
import {plainToInstance} from "class-transformer";
import {RepresentativesEntity} from "@/features/network/representatives/representatives.entity";

@CommandHandler(CreateRepresentativeCommand)
export class CreateRepresentativeHandler implements ICommandHandler<CreateRepresentativeCommand> {
  async execute(command: CreateRepresentativeCommand): Promise<CreateRepresentativeResponse> {
    const representative = {
      fullName: command.fullName,
      image: command.image.path,
      email: command.email,
      phoneNumber: command.phoneNumber,
      resume: command.resume,
    } as RepresentativesEntity;

    await RepresentativesEntity.save(representative);
    return plainToInstance(CreateRepresentativeResponse, representative, {excludeExtraneousValues: true});
  }
}