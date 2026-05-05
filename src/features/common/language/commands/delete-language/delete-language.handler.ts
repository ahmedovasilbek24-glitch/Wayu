import {CommandHandler, ICommandHandler} from "@nestjs/cqrs";
import {DeleteLanguageCommand} from "@/features/common/language/commands/delete-language/delete-language.commonds";
import {NotFoundException} from "@nestjs/common";
import {LanguagesEntity} from "@/features/common/language/languages.entity";

@CommandHandler(DeleteLanguageCommand)
export class DeleteLanguageHandler implements ICommandHandler<DeleteLanguageCommand> {

  async execute(cmd: DeleteLanguageCommand): Promise<void> {
    const language = await LanguagesEntity.findOneBy({id: cmd.id})
    if(!language){
      throw new NotFoundException('language with given id not found')
    }

    await LanguagesEntity.remove(language)
  }
}