import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {FileInterceptor} from "@nestjs/platform-express";
import {storageOptions} from "@/config/multer.config";
import fs from 'fs'
import {GetAllUseFullLinkResponse} from "@/features/common/useFullLinks/query/get-all-use-full-links/get-all-use-full-links.response";
import {GetAllUsefulLinkFilters} from "@/features/common/useFullLinks/query/get-all-use-full-links/get-all-use-full-links.filters";
import {GetAllUsefulLinkQuery} from "@/features/common/useFullLinks/query/get-all-use-full-links/get-all-use-full-links.query";
import {CreateUsefulLinkResponse} from "@/features/common/useFullLinks/commonds/create-use-full-links/create-use-full-links.response";
import {CreateUsefulLinkRequest} from "@/features/common/useFullLinks/commonds/create-use-full-links/create-use-full-links.request";
import {CreateUsefulLinkCommand} from "@/features/common/useFullLinks/commonds/create-use-full-links/create-use-full-links.command";
import {GetOneUsefulLinkQuery} from "@/features/common/useFullLinks/query/get-one-use-full-links/get-one-use-full-links.query";
import {GetOneUseFullLinksResponse} from "@/features/common/useFullLinks/query/get-one-use-full-links/get-one-use-full-links.response";
import {DeleteUsefulLinkCommand} from "@/features/common/useFullLinks/commonds/delete-use-full-links/delete-use-full-links.command";
import {UpdateUseFullLinkResponse} from "@/features/common/useFullLinks/commonds/update-use-full-links/update-use-full-links.response";
import {UpdateUseFullLinksRequest} from "@/features/common/useFullLinks/commonds/update-use-full-links/update-use-full-links.request";
import {UpdateUsefulLinkCommand} from "@/features/common/useFullLinks/commonds/update-use-full-links/update-use-full-links.command";

@Controller('admin/usefull-link')
@ApiTags('Useful-Link')
export class UsefulLinkController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }

  @Get()
  @ApiOkResponse({type: [GetAllUseFullLinkResponse]})
  async getAllUsefulLink(@Query() filters: GetAllUsefulLinkFilters) {
    return await this.queryBus.execute(new GetAllUsefulLinkQuery(filters))
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', {
    storage: storageOptions, limits: {
      fileSize: 1024 * 256,
    }
  }))
  @ApiCreatedResponse({type: CreateUsefulLinkResponse})
  async createUsefulLink(@Body() payload: CreateUsefulLinkRequest, @UploadedFile() icon: Express.Multer.File) {
    let cmd = new CreateUsefulLinkCommand(
      payload.title,
      icon,
      payload.link
    )

    try {
      return await this.commandBus.execute(cmd)
    } catch (exc) {
      if (fs.existsSync(icon.path))
        fs.rmSync(icon.path)
    }
  }

  @Get(':id')
  @ApiOkResponse({type: [GetOneUseFullLinksResponse]})
  async getOneUsefulLink(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneUsefulLinkQuery()
    query.id = id
    return await this.queryBus.execute(query)
  }

  @Delete(':id')
  async deleteUsefulLink(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteUsefulLinkCommand(id)
    return await this.commandBus.execute(cmd)
  }

  @Patch(':id')
  @ApiOkResponse({type: UpdateUseFullLinkResponse})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', {storage: storageOptions}))
  async updateUsefulLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateUseFullLinksRequest,
    @UploadedFile() icon: Express.Multer.File
  ) {
    let cmd = new UpdateUsefulLinkCommand(
      payload.id,
      payload.title,
      icon,
      payload.link
    )

    try {
      return await this.commandBus.execute(cmd)
    } catch (exc) {
      if (fs.existsSync(icon.path))
        fs.rmSync(icon.path)
    }
  }
}