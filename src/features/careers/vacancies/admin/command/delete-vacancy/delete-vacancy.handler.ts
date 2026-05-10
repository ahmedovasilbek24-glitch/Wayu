import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {DeleteVacancyCommand} from "@/features/careers/vacancies/admin/command/delete-vacancy/delete-vacancy.command";
import {VacanciesEntity} from "@/features/careers/vacancies/vacancies.entity";

@CommandHandler(DeleteVacancyCommand)
export class DeleteVacancyHandler implements ICommandHandler<DeleteVacancyCommand> {
  async execute(cmd: DeleteVacancyCommand): Promise<void> {
    const vacancy = await VacanciesEntity.findOneBy({id: cmd.id});
    if (!vacancy)
      throw new NotFoundException("Vacancy with given id not found");
    await VacanciesEntity.delete(cmd.id);
  }
}