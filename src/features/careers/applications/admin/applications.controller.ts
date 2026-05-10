import {Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UploadedFile, UseInterceptors} from "@nestjs/common";
import {ApiConsumes, ApiCreatedResponse, ApiOkResponse, ApiTags} from "@nestjs/swagger";
import {CommandBus, QueryBus} from "@nestjs/cqrs";
import {FileInterceptor} from "@nestjs/platform-express";
import {storageOptions} from "@/config/multer.config";
import fs from "fs";
import {CreateApplicationResponse} from "@/features/careers/applications/admin/commands/create-applications/create-application.response";
import {CreateApplicationRequest} from "@/features/careers/applications/admin/commands/create-applications/create-application.request";
import {CreateApplicationCommand} from "@/features/careers/applications/admin/commands/create-applications/create-application.command";
import {GetAllApplicationResponse} from "@/features/careers/applications/admin/query/get-all-applications/get-all-applications.response";
import {GetAllApplicationFilters} from "@/features/careers/applications/admin/query/get-all-applications/get-all-applications.filters";
import {GetAllApplicationQuery} from "@/features/careers/applications/admin/query/get-all-applications/get-all-applications.query";
import {GetOneApplicationResponse} from "@/features/careers/applications/admin/query/get-one-applications/get-one-applications.response";
import {GetOneApplicationQuery} from "@/features/careers/applications/admin/query/get-one-applications/get-one-applications.request";
import {DeleteApplicationCommand} from "@/features/careers/applications/admin/commands/delete-applications/delete-applications.command";
import {UpdateApplicationResponse} from "@/features/careers/applications/admin/commands/update-applications/update-aplications.response";
import {UpdateApplicationRequest} from "@/features/careers/applications/admin/commands/update-applications/update-aplications.request";
import {UpdateApplicationCommand} from "@/features/careers/applications/admin/commands/update-applications/update-aplications.command";

@Controller('admin/application')
@ApiTags('Application-admin')
export class ApplicationsController {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  @Post()
  @ApiCreatedResponse({type: CreateApplicationResponse})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('resume', {storage: storageOptions}))
  async createApplication(
    @Body() payload: CreateApplicationRequest,
    @UploadedFile() resume: Express.Multer.File,
  ) {
    const cmd = new CreateApplicationCommand(
      payload.fullName,
      payload.phoneNumber,
      payload.email,
      payload.vacancyId,
      resume,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (fs.existsSync(resume.path))
        fs.rmSync(resume.path);
      throw exc;
    }
  }

  @Get()
  @ApiOkResponse({type: [GetAllApplicationResponse]})
  async getAllApplications(@Query() filters: GetAllApplicationFilters) {
    return await this.queryBus.execute(new GetAllApplicationQuery(filters));
  }

  @Get(':id')
  @ApiOkResponse({type: GetOneApplicationResponse})
  async getOneApplication(@Param('id', ParseIntPipe) id: number) {
    const query = new GetOneApplicationQuery();
    query.id = id;
    return await this.queryBus.execute(query);
  }

  @Delete(':id')
  async deleteApplication(@Param('id', ParseIntPipe) id: number) {
    return await this.commandBus.execute(new DeleteApplicationCommand(id));
  }

  @Patch(':id')
  @ApiOkResponse({type: UpdateApplicationResponse})
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(FileInterceptor('resume', {storage: storageOptions}))
  async updateApplication(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateApplicationRequest,
    @UploadedFile() resume?: Express.Multer.File,
  ) {
    const cmd = new UpdateApplicationCommand(
      id,
      payload.fullName,
      payload.phoneNumber,
      payload.email,
      payload.vacancyId,
      resume,
      payload.status,
    );
    try {
      return await this.commandBus.execute(cmd);
    } catch (exc) {
      if (resume && fs.existsSync(resume.path)) fs.rmSync(resume.path);
      throw exc;
    }
  }
}