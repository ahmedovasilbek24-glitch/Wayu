import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {NotFoundException} from "@nestjs/common";
import {plainToInstance} from "class-transformer";
import {GetOneLanguageQuery} from "@/features/common/language/query/get-one-language/get-one-language.query";
import {GetOneLanguageResponse} from "@/features/common/language/query/get-one-language/get-one-language.respose";
import {LanguagesEntity} from "@/features/common/language/languages.entity";

@QueryHandler(GetOneLanguageQuery)
export class GetOneLanguageHandler implements IQueryHandler<GetOneLanguageQuery> {
  async execute(query: GetOneLanguageQuery): Promise<GetOneLanguageResponse> {
    const language = await LanguagesEntity.findOneBy({id: query.id})
    if (!language) {
      throw new NotFoundException('language with given id not found')
    }
    return plainToInstance(GetOneLanguageResponse, language, {excludeExtraneousValues: true})
  }
}