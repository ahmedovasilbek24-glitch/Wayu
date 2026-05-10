import {Module} from "@nestjs/common";
import {EventController} from "@/features/events/event/event.controller";
import {EventCategoryController} from "@/features/events/events-category/event-category.controller";
import {CreateEventHandler} from "@/features/events/event/command/create-event/create-event.handler";
import {UpdateEventHandler} from "@/features/events/event/command/update-event/update-event.handler";
import {DeleteEventHandler} from "@/features/events/event/command/delete-event/delete-event.handler";
import {GetAllEventHandler} from "@/features/events/event/query/get-all-event/get-all-event.handler";
import {GetOneEventHandler} from "@/features/events/event/query/get-one-event/get-one-event.handler";
import {CreateEventCategoryHandler} from "@/features/events/events-category/command/create-event-category/create-event-category.handler";
import {UpdateEventCategoryHandler} from "@/features/events/events-category/command/update-event-category/update-event-category.handler";
import {DeleteEventCategoryHandler} from "@/features/events/events-category/command/delete-event-category/delete-event-category.handler";
import {GetAllEventCategoryHandler} from "@/features/events/events-category/query/get-all-event-category/get-all-event-category.handler";
import {GetOneEventCategoryHandler} from "@/features/events/events-category/query/get-one-event-category/get-one-event-category.handler";

@Module({
  controllers: [
    EventController,
    EventCategoryController,
  ],
  providers: [
    CreateEventHandler,
    UpdateEventHandler,
    DeleteEventHandler,
    GetAllEventHandler,
    GetOneEventHandler,
    CreateEventCategoryHandler,
    UpdateEventCategoryHandler,
    DeleteEventCategoryHandler,
    GetAllEventCategoryHandler,
    GetOneEventCategoryHandler,
  ]
})
export class EventModule {}