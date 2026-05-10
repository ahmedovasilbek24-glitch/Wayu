import {Module} from "@nestjs/common";
import {VacancyController} from "@/features/careers/vacancies/admin/vacancy.controller";
import {VacancyPublicController} from "@/features/careers/vacancies/public/vacancy.public.controller";
import {ApplicationsController} from "@/features/careers/applications/admin/applications.controller";
import {ApplicationPublicController} from "@/features/careers/applications/public/application.public.controller";
import {CreateVacancyHandler} from "@/features/careers/vacancies/admin/command/create-vacancy/create-vacancy.handler";
import {UpdateVacancyHandler} from "@/features/careers/vacancies/admin/command/update-vacancy/update-vacancy.handler";
import {DeleteVacancyHandler} from "@/features/careers/vacancies/admin/command/delete-vacancy/delete-vacancy.handler";
import {GetAllVacancyHandler} from "@/features/careers/vacancies/admin/query/get-all-vacancy/get-all-vacancy.handler";
import {GetOneVacancyHandler} from "@/features/careers/vacancies/admin/query/get-one-vacancy/get-one-vacancy.handler";
import {CreateApplicationHandler} from "@/features/careers/applications/admin/commands/create-applications/create-application.handler";
import {UpdateApplicationHandler} from "@/features/careers/applications/admin/commands/update-applications/update-aplications.handler";
import {DeleteApplicationHandler} from "@/features/careers/applications/admin/commands/delete-applications/delete-applications.handler";
import {GetAllApplicationHandler} from "@/features/careers/applications/admin/query/get-all-applications/get-all-applications.handler";
import {GetOneApplicationHandler} from "@/features/careers/applications/admin/query/get-one-applications/get-one-applications.handler";
import {GetAllApplicationPublicHandler} from "@/features/careers/applications/public/query/get-all-application/get-all-appilication.public.handler";
import {GetOneApplicationPublicHandler} from "@/features/careers/applications/public/query/get-one-application/get-one-application.public.handler";
import {GetOneVacancyPublicHandler} from "@/features/careers/vacancies/public/query/get-one-vacancy/get-one-vacancy.public.handler";
import {GetAllVacancyPublicHandler} from "@/features/careers/vacancies/public/query/get-all-vacancy/get-all-vacancy.public.handler";

@Module({
  controllers: [
    VacancyController,
    VacancyPublicController,
    ApplicationsController,
    ApplicationPublicController,
  ],
  providers: [
    CreateVacancyHandler,
    UpdateVacancyHandler,
    DeleteVacancyHandler,
    GetAllVacancyHandler,
    GetOneVacancyHandler,

    CreateApplicationHandler,
    UpdateApplicationHandler,
    DeleteApplicationHandler,
    GetAllApplicationHandler,
    GetOneApplicationHandler,

    GetAllApplicationPublicHandler,
    GetOneApplicationPublicHandler,
    GetOneVacancyPublicHandler,
    GetAllVacancyPublicHandler
  ]
})
export class CareersModule {}