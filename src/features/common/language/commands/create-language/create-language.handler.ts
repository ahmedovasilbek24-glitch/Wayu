import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {CreateLanguageCommand} from "@/features/common/language/commands/create-language/create-language.commands";
import {CreateLanguageResponse} from "@/features/common/language/commands/create-language/create-language-response";
import {LanguagesEntity} from "@/features/common/language/languages.entity";

@CommandHandler(CreateLanguageCommand)
export class CreateLanguageHandler implements ICommandHandler<CreateLanguageCommand> {
  async execute(command: CreateLanguageCommand): Promise<CreateLanguageResponse> {
    const language = LanguagesEntity.create({title: command.title})
    await LanguagesEntity.save(language)
    return plainToInstance(CreateLanguageResponse, language, {excludeExtraneousValues: true})
  }
}