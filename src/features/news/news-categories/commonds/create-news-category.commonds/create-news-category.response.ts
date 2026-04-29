import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString, MaxLength} from "class-validator";

export class CreateNewsCategoryResponse {
    @Expose()
    @ApiProperty()
    @IsNumber()
    id!: number;

    @Expose()
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title!: string;
}