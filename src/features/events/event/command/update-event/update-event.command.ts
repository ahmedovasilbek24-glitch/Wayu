import {Command} from "@nestjs/cqrs";
import {UpdateEventResponse} from "@/features/events/event/command/update-event/update-event.response";

export class UpdateEventCommand extends Command<UpdateEventResponse> {
  constructor(
    public id: number,
    public categoryId?: number,
    public title?: string,
    public image?: Express.Multer.File,
    public date?: string,
    public content?: string,
  ) {
    super();
  }
}