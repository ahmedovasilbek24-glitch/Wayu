import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateApplicationResponse} from "@/features/careers/applications/admin/commands/update-applications/update-aplications.response";
import {UpdateApplicationCommand} from "@/features/careers/applications/admin/commands/update-applications/update-aplications.command";
import {ApplicationsEntity} from "@/features/careers/applications/applications.entity";

@CommandHandler(UpdateApplicationCommand)
export class UpdateApplicationHandler implements ICommandHandler<UpdateApplicationCommand> {
  async execute(command: UpdateApplicationCommand): Promise<UpdateApplicationResponse> {
    const application = await ApplicationsEntity.findOneBy({id: command.id});
    if (!application)
      throw new NotFoundException("Application with given id not found");

    if (command.fullName !== undefined) application.fullName = command.fullName;
    if (command.phoneNumber !== undefined) application.phoneNumber = command.phoneNumber;
    if (command.email !== undefined) application.email = command.email;
    if (command.vacancyId !== undefined) application.vacancyId = command.vacancyId;
    if (command.resume !== undefined) application.resume = command.resume.path;
    if (command.status !== undefined) application.status = command.status;

    await ApplicationsEntity.save(application);
    return plainToInstance(UpdateApplicationResponse, application, {excludeExtraneousValues: true});
  }
}