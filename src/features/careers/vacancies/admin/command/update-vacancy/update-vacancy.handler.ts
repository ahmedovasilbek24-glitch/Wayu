import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateVacancyResponse} from "@/features/careers/vacancies/admin/command/update-vacancy/update-vacancy.response";
import {UpdateVacancyCommand} from "@/features/careers/vacancies/admin/command/update-vacancy/update-vacancy.command";
import {VacanciesEntity} from "@/features/careers/vacancies/vacancies.entity";

@CommandHandler(UpdateVacancyCommand)
export class UpdateVacancyHandler implements ICommandHandler<UpdateVacancyCommand> {
  async execute(command: UpdateVacancyCommand): Promise<UpdateVacancyResponse> {
    const vacancy = await VacanciesEntity.findOneBy({id: command.id});
    if (!vacancy)
      throw new NotFoundException("Vacancy with given id not found");

    if (command.title !== undefined)
      vacancy.title = command.title;
    if (command.address !== undefined)
      vacancy.address = command.address;
    if (command.description !== undefined)
      vacancy.description = command.description;
    if (command.phoneNumber !== undefined)
      vacancy.phoneNumber = command.phoneNumber;
    if (command.type !== undefined)
      vacancy.type = command.type;
    if (command.salary !== undefined)
      vacancy.salary = command.salary;
    if (command.isActive !== undefined)
      vacancy.isActive = command.isActive;

    await VacanciesEntity.save(vacancy);
    return plainToInstance(UpdateVacancyResponse, vacancy, {excludeExtraneousValues: true});
  }
}