import {Query} from "@nestjs/cqrs";
import {GetAllEventCategoryResponse} from "@/features/events/events-category/query/get-all-event-category/get-all-event-category.response";
import {GetAllEventCategoryFilters} from "@/features/events/events-category/query/get-all-event-category/get-all-event-category.filters";

export class GetAllEventCategoryQuery extends Query<GetAllEventCategoryResponse[]> {
  constructor(public readonly filters: GetAllEventCategoryFilters) {
    super();
  }
}