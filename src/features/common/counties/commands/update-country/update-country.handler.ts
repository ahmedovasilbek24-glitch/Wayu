import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateCountryCommand} from "@/features/common/counties/commands/update-country/update-country.commands";
import {UpdateCountryResponse} from "@/features/common/counties/commands/update-country/update-country.response";
import {CountriesEntity} from "@/features/common/counties/countries.entity";

@CommandHandler(UpdateCountryCommand)
export class UpdateCountryHandler implements ICommandHandler<UpdateCountryCommand> {
  async execute(command: UpdateCountryCommand): Promise<UpdateCountryResponse> {
    const country = await CountriesEntity.findOneBy({id: command.id})
    if (!country) {
      throw new NotFoundException('country with given id not found')
    }

    Object.assign(
      country,
      Object.fromEntries(
        Object.entries(command).filter(([key, value]) => value)
      )
    )

    await CountriesEntity.save(country)
    return plainToInstance(UpdateCountryResponse, country, {excludeExtraneousValues: true})
  }
}