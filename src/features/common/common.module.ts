import {Module} from "@nestjs/common";
import {CountryController} from "@/features/common/counties/country.controller";
import {GetAllCountryHandler} from "@/features/common/counties/query/get-all-country/get-all-country.handler";
import {CreateCountryHandler} from "@/features/common/counties/commands/create-country.commonds/create-country.handler";
import {GetOneCountryHandler} from "@/features/common/counties/query/get-one-country/get-one-country.handler";
import {DeleteCountryHandler} from "@/features/common/counties/commands/delete-country/delete-country.handle";
import {UpdateCountryHandler} from "@/features/common/counties/commands/update-country/update-country.handler";
import {CreateLanguageHandler} from "@/features/common/language/commands/create-language/create-language.handler";
import {GetAllLanguageHandler} from "@/features/common/language/query/get-all-language/get-all-language.handler";
import {GetOneLanguageHandler} from "@/features/common/language/query/get-one-language/get-one-language.handler";
import {DeleteLanguageHandler} from "@/features/common/language/commands/delete-language/delete-language.handler";
import {UpdateLanguageHandler} from "@/features/common/language/commands/update-language/update-language.handler";
import {LanguageController} from "@/features/common/language/language.controller";
import {CreateSocialLinkHandler} from "@/features/common/socilaLinks/commands/create-social-links/create-social-link.handler";
import {DeleteSocialLinkHandler} from "@/features/common/socilaLinks/commands/delete-social-links/delete-social-link.handler";
import {UpdateSocialLinkHandler} from "@/features/common/socilaLinks/commands/update-social-links/update-social-link.handler";
import {GetAllSocialLinkHandler} from "@/features/common/socilaLinks/query/get-all-social-links/get-all-social-link.handler";
import {GetOneSocialLinkHandler} from "@/features/common/socilaLinks/query/get-one-social-links/get-one-social-link.handler";
import {SocialLinkController} from "@/features/common/socilaLinks/socialLinks.controller";
import {StaticInfoController} from "@/features/common/staticInfo/static-info.controller";
import {CreateStaticInfoHandler} from "@/features/common/staticInfo/commands/create-static-info/create-static-info.handler";
import {DeleteStaticInfoHandler} from "@/features/common/staticInfo/commands/delete-static-info/delete-static-info.handler";
import {UpdateStaticInfoHandler} from "@/features/common/staticInfo/commands/update-static-info/update-static-info.handler";
import {GetAllStaticInfoHandler} from "@/features/common/staticInfo/query/get-all-static-info/get-all-static-info.handler";
import {GetOneStaticInfoHandler} from "@/features/common/staticInfo/query/get-one-static-info/get-one-static-info.handler";
import {CreateTagsHandler} from "@/features/common/tags/commands/create-tags/create-tags.handler";
import {DeleteTagsHandler} from "@/features/common/tags/commands/delete-tags/delete-tags.handler";
import {UpdateTagsHandler} from "@/features/common/tags/commands/update-tags/update-tags.handler";
import {GetAllTagsHandler} from "@/features/common/tags/query/get-all-tags/get-all-tags.handler";
import {GetOneTagsHandler} from "@/features/common/tags/query/get-one-tags/get-one-tags.handler";
import {TagsController} from "@/features/common/tags/tags.controller";
import {CreateUsefulLinkHandler} from "@/features/common/useFullLinks/commonds/create-use-full-links/create-use-full-links.handler";
import {DeleteUsefulLinkHandler} from "@/features/common/useFullLinks/commonds/delete-use-full-links/delete-use-full-links.handler";
import {UpdateUsefulLinkHandler} from "@/features/common/useFullLinks/commonds/update-use-full-links/update-use-full-links.handler";
import {GetAllUsefulLinkHandler} from "@/features/common/useFullLinks/query/get-all-use-full-links/get-all-use-full-links.handler";
import {GetOneUsefulLinkHandler} from "@/features/common/useFullLinks/query/get-one-use-full-links/get-one-use-full-links.handler";
import {UsefulLinkController} from "@/features/common/useFullLinks/useFullLinks.controller";

@Module({
  controllers: [
    CountryController,
    LanguageController,
    SocialLinkController,
    StaticInfoController,
    TagsController,
    UsefulLinkController
  ],
  providers: [
    GetAllCountryHandler,
    CreateCountryHandler,
    GetOneCountryHandler,
    DeleteCountryHandler,
    UpdateCountryHandler,

    CreateLanguageHandler,
    GetAllLanguageHandler,
    GetOneLanguageHandler,
    DeleteLanguageHandler,
    UpdateLanguageHandler,

    CreateSocialLinkHandler,
    DeleteSocialLinkHandler,
    UpdateSocialLinkHandler,
    GetAllSocialLinkHandler,
    GetOneSocialLinkHandler,

    CreateStaticInfoHandler,
    DeleteStaticInfoHandler,
    UpdateStaticInfoHandler,
    GetAllStaticInfoHandler,
    GetOneStaticInfoHandler,

    CreateTagsHandler,
    DeleteTagsHandler,
    UpdateTagsHandler,
    GetAllTagsHandler,
    GetOneTagsHandler,

    CreateUsefulLinkHandler,
    DeleteUsefulLinkHandler,
    UpdateUsefulLinkHandler,
    GetAllUsefulLinkHandler,
    GetOneUsefulLinkHandler,
  ]
})

export class CommonModule {
}