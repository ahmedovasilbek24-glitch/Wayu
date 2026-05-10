import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneEventCategoryResponse} from "@/features/events/events-category/query/get-one-event-category/get-one-event-category.response";

export class GetOneEventCategoryQuery extends Query<GetOneEventCategoryResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number
}