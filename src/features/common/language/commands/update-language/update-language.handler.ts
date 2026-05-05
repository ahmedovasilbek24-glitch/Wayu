import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {UpdateLanguageCommand} from "@/features/common/language/commands/update-language/update-language.commands";
import {UpdateLanguageResponse} from "@/features/common/language/commands/update-language/update-language.response";
import {LanguagesEntity} from "@/features/common/language/languages.entity";

@CommandHandler(UpdateLanguageCommand)
export class UpdateLanguageHandler implements ICommandHandler<UpdateLanguageCommand> {
  async execute(command: UpdateLanguageCommand): Promise<UpdateLanguageResponse> {
    const language = await LanguagesEntity.findOneBy({id: command.id})
    if (!language) {
      throw new NotFoundException('language with given id not found')
    }

    Object.assign(
      language,
      Object.fromEntries(
        Object.entries(command).filter(([key, value]) => value)
      )
    )

    await LanguagesEntity.save(language)
    return plainToInstance(UpdateLanguageResponse, language, {excludeExtraneousValues: true})
  }
}