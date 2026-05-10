import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneFaqsPublicResponse} from "@/features/support/faqs/public/query/get-one-faqs/get-one-faqs.public.response";

export class GetOneFaqsPublicQuery extends Query<GetOneFaqsPublicResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number
}