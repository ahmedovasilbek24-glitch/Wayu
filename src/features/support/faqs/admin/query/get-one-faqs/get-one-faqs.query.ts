import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneFaqsResponse} from "@/features/support/faqs/admin/query/get-one-faqs/get-one-faqs.response";

export class GetOneFaqsQuery extends Query<GetOneFaqsResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number
}