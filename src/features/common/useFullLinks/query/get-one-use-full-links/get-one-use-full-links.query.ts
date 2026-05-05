import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneUseFullLinksResponse} from "@/features/common/useFullLinks/query/get-one-use-full-links/get-one-use-full-links.response";

export class GetOneUsefulLinkQuery extends Query<GetOneUseFullLinksResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number
}