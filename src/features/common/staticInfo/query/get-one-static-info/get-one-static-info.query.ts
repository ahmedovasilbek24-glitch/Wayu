import {Query} from "@nestjs/cqrs";
import {IsNumber} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {GetOneStaticInfoResponse} from "@/features/common/staticInfo/query/get-one-static-info/get-one-static-info.response";

export class GetOneStaticInfoQuery extends Query<GetOneStaticInfoResponse> {
  @IsNumber()
  @ApiProperty()
  id!: number
}