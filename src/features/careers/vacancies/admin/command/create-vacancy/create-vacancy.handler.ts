import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {CreateVacancyResponse} from "@/features/careers/vacancies/admin/command/create-vacancy/create-vacancy.response";
import {CreateVacancyCommand} from "@/features/careers/vacancies/admin/command/create-vacancy/create-vacancy.command";
import {VacanciesEntity} from "@/features/careers/vacancies/vacancies.entity";

@CommandHandler(CreateVacancyCommand)
export class CreateVacancyHandler implements ICommandHandler<CreateVacancyCommand> {
  async execute(command: CreateVacancyCommand): Promise<CreateVacancyResponse> {
    const vacancy = {
      title: command.title,
      address: command.address,
      description: command.description,
      phoneNumber: command.phoneNumber,
      type: command.type,
      salary: command.salary,
      isActive: command.isActive,
    } as VacanciesEntity;
    await VacanciesEntity.save(vacancy);
    return plainToInstance(CreateVacancyResponse, vacancy, {excludeExtraneousValues: true});
  }
}