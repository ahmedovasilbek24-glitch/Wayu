import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {ILike} from "typeorm";
import {BadRequestException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {CreateCountryCommand} from "@/features/common/counties/commands/create-country.commonds/create-country.commonds";
import {CreateCountryResponse} from "@/features/common/counties/commands/create-country.commonds/create-news.response";
import {CountriesEntity} from "@/features/common/counties/countries.entity";

@CommandHandler(CreateCountryCommand)
export class CreateCountryHandler implements ICommandHandler<CreateCountryCommand> {
  async execute(command: CreateCountryCommand): Promise<CreateCountryResponse> {
    const alreadyExists = await CountriesEntity.existsBy({title: ILike(command.title)})

    if (alreadyExists)
      throw new BadRequestException('Country already exists')

    const country = CountriesEntity.create({
      title: command.title,
      flag: command.flag
    })
    await CountriesEntity.save(country)
    return plainToInstance(CreateCountryResponse, country, {excludeExtraneousValues: true})
  }
}