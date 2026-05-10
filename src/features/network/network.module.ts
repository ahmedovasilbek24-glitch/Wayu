import {Module} from "@nestjs/common";
import {RepresentativeController} from "@/features/network/representatives/admin/representative.admin.controller";
import {InstagramPostController} from "@/features/network/instagram-posts/admin/instagram-post.admin.controller";
import {RepresentativePublicController} from "@/features/network/representatives/public/representative.public.controller";
import {BranchesPublicController} from "@/features/network/branches/public/branch.public.controller";
import {InstagramPostsPublicController} from "@/features/network/instagram-posts/public/instagram-post.public.controller";
import {BranchAdminController} from "@/features/network/branches/admin/branch.admin.controller";
import {CreateRepresentativeHandler} from "@/features/network/representatives/admin/command/create-representative/create-representative.handler";
import {UpdateRepresentativeHandler} from "@/features/network/representatives/admin/command/update-representative/update-representative.handler";
import {DeleteRepresentativeHandler} from "@/features/network/representatives/admin/command/delete-representative/delete-representative.handler";
import {GetAllRepresentativeHandler} from "@/features/network/representatives/admin/query/get-all-representative/get-all-representative.handler";
import {GetOneRepresentativeHandler} from "@/features/network/representatives/admin/query/get-one-representative/get-one-representative.handler";
import {CreateBranchHandler} from "@/features/network/branches/admin/command/create-branches/create-branch.handler";
import {UpdateBranchHandler} from "@/features/network/branches/admin/command/update-branches/update-brach.handler";
import {DeleteBranchHandler} from "@/features/network/branches/admin/command/delete-branches/delete-branch.handler";
import {GetAllBranchHandler} from "@/features/network/branches/admin/query/get-all-branches/get-all-brach.handler";
import {GetOneBranchHandler} from "@/features/network/branches/admin/query/get-one-branchens/get-one-branch.handler";
import {CreateInstagramPostHandler} from "@/features/network/instagram-posts/admin/command/create-instagram-post/create-instagrma-post.handler";
import {UpdateInstagramPostHandler} from "@/features/network/instagram-posts/admin/command/update-instagram-post/update-instagrma-post.handler";
import {DeleteInstagramPostHandler} from "@/features/network/instagram-posts/admin/command/delete-instagram-post/delete-instagrma-post.handler";
import {GetAllInstagramPostHandler} from "@/features/network/instagram-posts/admin/query/get-all-instagram-post/get-all-instagram-post.handler";
import {GetOneInstagramPostHandler} from "@/features/network/instagram-posts/admin/query/get-one-instagram-post/get-one-instagram-post.query";
import {GetAllRepresentativePublicHandler} from "@/features/network/representatives/public/query/get-all-representative/get-all-representative.public.handler";
import {GetOneRepresentativePublicHandler} from "@/features/network/representatives/public/query/get-one-representative/get-one-representative.public.handler";
import {GetAllBranchesPublicHandler} from "@/features/network/branches/public/query/get-all-branch/get-all-branch.public.handler";
import {GetOneBranchPublicHandler} from "@/features/network/branches/public/query/get-one-branch/get-one-branch.public.handler";
import {GetAllInstagramPostsPublicHandler} from "@/features/network/instagram-posts/public/query/get-all-instagram-post/get-all-instagram-post.public.handler";
import {GetOneInstagramPostPublicHandler} from "@/features/network/instagram-posts/public/query/get-one-instagram-post/get-one-instagram-post.public.handler";


@Module({
  controllers: [
    RepresentativeController,
    BranchAdminController,
    InstagramPostController,
    RepresentativePublicController,
    BranchesPublicController,
    InstagramPostsPublicController,
  ],
  providers: [
    CreateRepresentativeHandler,
    UpdateRepresentativeHandler,
    DeleteRepresentativeHandler,
    GetAllRepresentativeHandler,
    GetOneRepresentativeHandler,

    CreateBranchHandler,
    UpdateBranchHandler,
    DeleteBranchHandler,
    GetAllBranchHandler,
    GetOneBranchHandler,

    CreateInstagramPostHandler,
    UpdateInstagramPostHandler,
    DeleteInstagramPostHandler,
    GetAllInstagramPostHandler,
    GetOneInstagramPostHandler,

    GetAllRepresentativePublicHandler,
    GetOneRepresentativePublicHandler,

    GetAllBranchesPublicHandler,
    GetOneBranchPublicHandler,

    GetAllInstagramPostsPublicHandler,
    GetOneInstagramPostPublicHandler,
  ]
})
export class NetworkModule {}