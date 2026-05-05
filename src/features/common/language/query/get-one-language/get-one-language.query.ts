import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneLanguageResponse} from "@/features/common/language/query/get-one-language/get-one-language.respose";

export class GetOneLanguageQuery extends Query<GetOneLanguageResponse>{
  @IsNumber()
  @ApiProperty()
  id! : number
}