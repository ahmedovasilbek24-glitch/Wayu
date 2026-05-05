import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {FileInterceptor} from "@nestjs/platform-express";
import {storageOptions} from "@/config/multer.config";
import {GetAllSocialLinkResponse} from "@/features/common/socilaLinks/query/get-all-social-links/get-all-social-link.response";
import {GetAllSocialLinkFilters} from "@/features/common/socilaLinks/query/get-all-social-links/get-all-social-link.filter";
import {GetAllSocialLinkQuery} from "@/features/common/socilaLinks/query/get-all-social-links/get-all-social-link.query";
import {CreateSocialLinkResponse} from "@/features/common/socilaLinks/commands/create-social-links/create-social-link.response";
import {CreateSocialLinkCommand} from "@/features/common/socilaLinks/commands/create-social-links/create-social-link.commonds";
import {GetOneSocialLinkResponse} from "@/features/common/socilaLinks/query/get-one-social-links/get-one-social-link.response";
import {GetOneSocialLinkQuery} from "@/features/common/socilaLinks/query/get-one-social-links/get-one-social-link.query";
import {DeleteSocialLinkCommand} from "@/features/common/socilaLinks/commands/delete-social-links/delete-social-link.command";
import {UpdateSocialLinkResponse} from "@/features/common/socilaLinks/commands/update-social-links/update-social-link.response";
import {UpdateSocialLinkCommand} from "@/features/common/socilaLinks/commands/update-social-links/update-socila-link.command";

@Controller('admin/social-link')
@ApiTags('Social-Link')
export class SocialLinkController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus
  ) {
  }

  @Get()
  @ApiOkResponse({type: [GetAllSocialLinkResponse]})
  async getAllSocialLink(@Query() filters: GetAllSocialLinkFilters) {
    return await this.queryBus.execute(new GetAllSocialLinkQuery(filters))
  }

  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', {
    storage: storageOptions, limits: {
      fileSize: 1024 * 256,
    }
  }))
  @ApiCreatedResponse({type: CreateSocialLinkResponse})
  async createSocialLink(@Body() command: CreateSocialLinkCommand, @UploadedFile() icon: Express.Multer.File) {
    command.icon = icon.filename
    return await this.commandBus.execute(command)
  }

  @Get(':id')
  @ApiOkResponse({type: [GetOneSocialLinkResponse]})
  async getOneSocialLink(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneSocialLinkQuery()
    query.id = id
    return await this.queryBus.execute(query)
  }

  @Delete(':id')
  async deleteSocialLink(@Param('id', ParseIntPipe) id: number) {
    const cmd = new DeleteSocialLinkCommand()
    cmd.id = id
    return await this.commandBus.execute(cmd)
  }

  @Patch(':id')
  @ApiOkResponse({type: UpdateSocialLinkResponse})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('icon', {storage: storageOptions}))
  async updateSocialLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() command: UpdateSocialLinkCommand,
    @UploadedFile() icon: Express.Multer.File
  ) {
    command.id = id
    command.icon = icon.filename
    return await this.commandBus.execute(command)
  }
}