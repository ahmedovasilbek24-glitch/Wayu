import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneSocialLinkResponse} from "@/features/common/socilaLinks/query/get-one-social-links/get-one-social-link.response";

export class GetOneSocialLinkQuery extends Query<GetOneSocialLinkResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number
}