import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";;
import {FileInterceptor} from "@nestjs/platform-express";
import {GetAllCountryFilters} from "@/features/common/counties/query/get-all-country/get-all-country.filters";
import {GetAllCountryResponse} from "@/features/common/counties/query/get-all-country/get-all-country.response";
import {GetAllCountryQuery} from "@/features/common/counties/query/get-all-country/get-all-country.query";
import {CreateCountryResponse} from "@/features/common/counties/commands/create-country.commonds/create-news.response";
import {CreateCountryCommand} from "@/features/common/counties/commands/create-country.commonds/create-country.commonds";
import {GetOneCountryResponse} from "@/features/common/counties/query/get-one-country/get-one-country.response";
import {GetOneCountryQuery} from "@/features/common/counties/query/get-one-country/get-one-country.query";
import {DeleteCountryCommand} from "@/features/common/counties/commands/delete-country/delete-country.commands";
import {UpdateCountryResponse} from "@/features/common/counties/commands/update-country/update-country.response";
import {UpdateCountryCommand} from "@/features/common/counties/commands/update-country/update-country.commands";
import {storageOptions} from "@/config/multer.config";

@Controller('admin/country')
@ApiTags('Country')
export class CountryController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }

  @Get()
  @ApiOkResponse({type: [GetAllCountryResponse]})
  async getAllCountry(@Query() filters: GetAllCountryFilters) {
    return await this.queryBus.execute(new GetAllCountryQuery(filters))
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('flag', {
    storage: storageOptions, limits: {
      fileSize: 1024 * 256,
    }
  }))
  @ApiCreatedResponse({type: CreateCountryResponse})
  async createCountry(@Body() command: CreateCountryCommand, @UploadedFile() flag: Express.Multer.File) {
    command.flag = flag.filename
    return await this.commandBus.execute(command)
  }

  @Get(':id')
  @ApiOkResponse({type: [GetOneCountryResponse]})
  async getOneCountry(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneCountryQuery()
    query.id = id
    return await this.queryBus.execute(query)
  }

  @Delete(':id')
  async deleteCountry(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteCountryCommand()
    cmd.id = id
    return await this.commandBus.execute(cmd)
  }

  @Patch(':id')
  @ApiOkResponse({type: UpdateCountryResponse})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('flag', {storage: storageOptions}))
  async updateCountry(
    @Param('id', ParseIntPipe) id: number,
    @Body() command: UpdateCountryCommand,
    @UploadedFile() flag: Express.Multer.File
  ) {
    command.id = id
    command.flag = flag.filename
    return await this.commandBus.execute(command)
  }
}