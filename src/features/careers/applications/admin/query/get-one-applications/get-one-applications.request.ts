import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneApplicationResponse} from "@/features/careers/applications/admin/query/get-one-applications/get-one-applications.response";

export class GetOneApplicationQuery extends Query<GetOneApplicationResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number
}