import {Body, Controller, Delete, Param, ParseIntPipe, Post} from "@nestjs/common";
import {ApiTags} from "@nestjs/swagger";
import {CommandBus} from "@nestjs/cqrs";
import {CreateFaqsTagsRequest} from "@/features/support/faqs-tags/admin/command/create-faqs-tags/create-faqs-tags.request";
import {CreateFaqsTagsCommand} from "@/features/support/faqs-tags/admin/command/create-faqs-tags/create-faqs-tags.command";
import {DeleteFaqsTagsCommand} from "@/features/support/faqs-tags/admin/command/delete-faqs-tags/delete-faqs-tags.command";

@Controller('admin/faqs-tags')
@ApiTags('Faqs-Tags')
export class FaqsTagsController {
  constructor(
    private readonly commandBus: CommandBus,
  ) {}

  @Post()
  async createNewsTag(@Body() payload: CreateFaqsTagsRequest){
    let cmd = new CreateFaqsTagsCommand(
      payload.faqsId,
      payload.tagId
    )
    return await this.commandBus.execute(cmd)
  }

  @Delete(':id')
  async deleteFaqsTags(@Param('id',ParseIntPipe) id: number){
    let cmd = new DeleteFaqsTagsCommand(id,0)
    return await this.commandBus.execute(cmd)
  }
}