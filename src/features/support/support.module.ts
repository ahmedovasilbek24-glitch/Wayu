import {Module} from "@nestjs/common";
import {QuestionController} from "@/features/support/questions/admin/question.admin.controller";
import {CreateQuestionHandler} from "@/features/support/questions/admin/command/create-question/create-question.handler";
import {UpdateQuestionHandler} from "@/features/support/questions/admin/command/update-question/update-question.handler";
import {DeleteQuestionHandler} from "@/features/support/questions/admin/command/delete-question/delete-question.handler";
import {GetAllQuestionHandler} from "@/features/support/questions/admin/query/get-all-question/get-all-question.handler";
import {GetOneQuestionHandler} from "@/features/support/questions/admin/query/get-one-question/get-one-question.handler";
import {FaqsAdminController} from "@/features/support/faqs/admin/faqs.admin.controller";
import {FaqsTagsController} from "@/features/support/faqs-tags/admin/faqs-tags.admin.controller";
import {FaqsPublicController} from "@/features/support/faqs/public/faqs.public.controller";
import {QuestionPublicController} from "@/features/support/questions/public/question.public.controller";
import {CreateFaqHandler} from "@/features/support/faqs/admin/command/create-faqs/create-faqs.handler";
import {UpdateFaqsHandler} from "@/features/support/faqs/admin/command/update-faqs/update-faqs.handler";
import {DeleteFaqHandler} from "@/features/support/faqs/admin/command/delete-faqs/delete-faqs.handler";
import {GetAllFaqsHandler} from "@/features/support/faqs/admin/query/get-all-faqs/get-all-faqs.handler";
import {GetOneFaqsHandler} from "@/features/support/faqs/admin/query/get-one-faqs/get-one-faqs.handler";
import {CreateFaqsTagHandler} from "@/features/support/faqs-tags/admin/command/create-faqs-tags/create-faqs-tags.handler";
import {DeleteFaqsTagHandler} from "@/features/support/faqs-tags/admin/command/delete-faqs-tags/delete-faqs-tags.handler";
import {GetAllFaqPublicHandler} from "@/features/support/faqs/public/query/get-all-faqs/get-all-faqs.public.handler";
import {GetOneFaqsPublicHandler} from "@/features/support/faqs/public/query/get-one-faqs/get-one-faqs.public.handler";
import {GetAllQuestionPublicHandler} from "@/features/support/questions/public/query/get-all-question/get-all-question.public.handler";
import {GetOneQuestionPublicHandler} from "@/features/support/questions/public/query/get-one-question/get-one-question.public.handler";

@Module({
  controllers: [
    QuestionController,
    FaqsAdminController,
    FaqsTagsController,
    FaqsPublicController,
    QuestionPublicController
  ],
  providers: [
    CreateQuestionHandler,
    UpdateQuestionHandler,
    DeleteQuestionHandler,
    GetAllQuestionHandler,
    GetOneQuestionHandler,

    CreateFaqHandler,
    UpdateFaqsHandler,
    DeleteFaqHandler,
    GetAllFaqsHandler,
    GetOneFaqsHandler,

    CreateFaqsTagHandler,
    DeleteFaqsTagHandler,

    GetAllFaqPublicHandler,
    GetOneFaqsPublicHandler,

    GetAllQuestionPublicHandler,
    GetOneQuestionPublicHandler
  ]
})
export class SupportModule {}