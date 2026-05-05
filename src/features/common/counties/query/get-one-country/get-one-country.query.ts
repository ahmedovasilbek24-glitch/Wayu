import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneCountryResponse} from "@/features/common/counties/query/get-one-country/get-one-country.response";

export class GetOneCountryQuery extends Query<GetOneCountryResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number
}