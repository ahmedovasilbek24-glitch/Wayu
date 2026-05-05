import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {BadRequestException, NotFoundException} from "@nestjs/common";
import {NewsEntity} from "@/features/news/news/news.entity";
import {DeleteCountryCommand} from "@/features/common/counties/commands/delete-country/delete-country.commands";
import {CountriesEntity} from "@/features/common/counties/countries.entity";

@CommandHandler(DeleteCountryCommand)
export class DeleteCountryHandler implements ICommandHandler<DeleteCountryCommand> {
  async execute(cmd: DeleteCountryCommand): Promise<void> {
    const country = await CountriesEntity.findOneBy({id: cmd.id})
    if (!country) {
      throw new NotFoundException('country with given if not found')
    }

    const hasAnyAttachedNews = await NewsEntity.existsBy({countryId: cmd.id})
    if (hasAnyAttachedNews) {
      throw new BadRequestException('Category has attached News,move or delete them first')
    }

    await CountriesEntity.remove(country)
  }
}