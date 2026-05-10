import {Command} from "@nestjs/cqrs";
import {CreateEventCategoryResponse} from "@/features/events/events-category/command/create-event-category/create-event-category.response";

export class CreateEventCategoryCommand extends Command<CreateEventCategoryResponse> {
  constructor(public title: string) {
    super();
  }
}