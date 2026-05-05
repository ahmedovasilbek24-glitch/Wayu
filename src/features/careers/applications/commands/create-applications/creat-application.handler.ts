import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {ApplicationsEntity} from "@/features/careers/applications/applications.entity";
import {CreateApplicationResponse} from "@/features/careers/applications/commands/create-applications/creat-application.response";
import {CreateApplicationCommand} from "@/features/careers/applications/commands/create-applications/creat-application.command";
import {VacanciesEntity} from "@/features/careers/vacancies/vacancies.entity";

@CommandHandler(CreateApplicationCommand)
export class CreateApplicationHandler implements ICommandHandler<CreateApplicationCommand> {
  async execute(command: CreateApplicationCommand): Promise<CreateApplicationResponse> {
    const vacancyExists = await VacanciesEntity.existsBy({id: command.vacancyId});
    if (!vacancyExists)
      throw new NotFoundException("Vacancy with given id not found");

    const application = ApplicationsEntity.create({
      fullName: command.fullName,
      phoneNumber: command.phoneNumber,
      email: command.email,
      vacancyId: command.vacancyId,
      resume: command.resume.path,
    });
    const saveApplication = await ApplicationsEntity.save(application);
    return plainToInstance(CreateApplicationResponse, saveApplication, {excludeExtraneousValues: true});
  }
}