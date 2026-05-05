import {plainToInstance} from "class-transformer";
import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {GetAllLanguageQuery} from "@/features/common/language/query/get-all-language/get-all-language.query";
import {GetAllLanguageResponse} from "@/features/common/language/query/get-all-language/get-all-language.response";
import {LanguagesEntity} from "@/features/common/language/languages.entity";

@QueryHandler(GetAllLanguageQuery)
export class GetAllLanguageHandler implements IQueryHandler<GetAllLanguageQuery> {
  async execute(query: GetAllLanguageQuery): Promise<GetAllLanguageResponse[]> {
    const take = query.filters.size ?? 10
    const currentPage = query.filters.page ?? 1
    const skip = (currentPage - 1) * take

    const language = await LanguagesEntity.find({skip: skip, take: take})
    return plainToInstance(GetAllLanguageResponse, language, {excludeExtraneousValues: true})
  }
}