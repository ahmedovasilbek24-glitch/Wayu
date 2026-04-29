import { MigrationInterface, QueryRunner } from "typeorm";

export class Wayu1777377212904 implements MigrationInterface {
    name = 'Wayu1777377212904'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "useFull-links" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(128) NOT NULL, "icon" character varying(128) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_10d294d969e715843d186cc38a3" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "static-info" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "appStoreLink" character varying(128) NOT NULL, "playMarketLink" character varying(128) NOT NULL, "aboutUs" text NOT NULL, CONSTRAINT "PK_611b43e6db2308b18e6b064a4e8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "social-links" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, "icon" character varying(128) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_c3c95a24a8ac78a37948792a7db" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."vacancies_type_enum" AS ENUM('fullname', 'parttime')`);
        await queryRunner.query(`CREATE TABLE "vacancies" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(256) NOT NULL, "address" character varying(128) NOT NULL, "description" text NOT NULL, "phoneNumber" character varying(16) NOT NULL, "type" "public"."vacancies_type_enum" NOT NULL, "salary" character varying(64) NOT NULL, "isActive" boolean NOT NULL DEFAULT true, "vacancyId" integer, CONSTRAINT "PK_3b45154a366568190cc15be2906" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "branches" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "city" character varying(64) NOT NULL, "latitude" numeric(10,7) NOT NULL, "longitude" numeric(10,7) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "countryId" integer NOT NULL, "representativeId" integer NOT NULL, CONSTRAINT "PK_7f37d3b42defea97f1df0d19535" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "country" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, "flag" character varying(128) NOT NULL, CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "newsTags" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "newsId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_42b07a411c1ead304d80ea44836" PRIMARY KEY ("id", "newsId", "tagId"))`);
        await queryRunner.query(`CREATE TABLE "news-category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_097b4882f7087a24fe2739d5638" UNIQUE ("title"), CONSTRAINT "PK_9e7cab77721ea092a126dae64bb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "news" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "categoryId" integer NOT NULL, "countryId" integer NOT NULL, "title" character varying(256) NOT NULL, "image" character varying(128) NOT NULL, "date" date NOT NULL, "content" text NOT NULL, CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "faqsTags" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "faqsId" integer NOT NULL, "tagId" integer NOT NULL, CONSTRAINT "PK_23268b6dc3e447098bea95db51d" PRIMARY KEY ("id", "faqsId", "tagId"))`);
        await queryRunner.query(`CREATE TABLE "faqs" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "question" character varying(256) NOT NULL, "answer" character varying(512) NOT NULL, CONSTRAINT "PK_2ddf4f2c910f8e8fa2663a67bf0" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_25cae3ff755adc0abe5ca284092" UNIQUE ("title"), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."representatives_status_enum" AS ENUM('pending', 'answered', 'repeated', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "representatives" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "question" character varying(2000) NOT NULL, "status" "public"."representatives_status_enum" NOT NULL, CONSTRAINT "PK_80e9af53802d5e0376d1ae8f68c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "language" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_cc0a99e710eb3733f6fb42b1d4c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "instagram-post" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "image" character varying(256) NOT NULL, "link" character varying(128) NOT NULL, CONSTRAINT "PK_6916482183ef803ad5fabcca0c9" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "expenses" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(12,2) NOT NULL, "date" TIMESTAMP NOT NULL, "title" character varying(256) NOT NULL, "description" text NOT NULL, "transactionId" character varying(64) NOT NULL, CONSTRAINT "PK_94c3ceb17e3140abc9282c20610" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "events" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(256) NOT NULL, "content" text NOT NULL, "image" character varying(128) NOT NULL, "date" TIMESTAMP NOT NULL, "address" character varying(128) NOT NULL, CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "event-category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "UQ_ef2fb00833a2ee483e1824ed2e2" UNIQUE ("title"), CONSTRAINT "PK_aceebefb938d7d62c50dcbac8b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."donations_paidby_enum" AS ENUM('payme', 'click', 'oson')`);
        await queryRunner.query(`CREATE TABLE "donations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "amount" numeric(12,2) NOT NULL, "fullName" character varying(128) NOT NULL, "date" TIMESTAMP NOT NULL, "paidBy" "public"."donations_paidby_enum" NOT NULL, CONSTRAINT "PK_c01355d6f6f50fc6d1b4a946abf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "author" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(64) NOT NULL, CONSTRAINT "PK_5a0e79799d372fe56f2f3fa6871" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "book-category" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "title" character varying(64) NOT NULL, CONSTRAINT "PK_f23a27b133afab1fee51cd3c250" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "books" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer NOT NULL, "categoryId" character varying NOT NULL, "title" character varying(256) NOT NULL, "image" character varying(128) NOT NULL, "description" text NOT NULL, "file" character varying(256) NOT NULL, "pages" integer NOT NULL, "year" integer NOT NULL, CONSTRAINT "PK_f3f2f25a099d24e12545b70b022" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."applications_status_enum" AS ENUM('avtivate', 'accepted', 'rejected')`);
        await queryRunner.query(`CREATE TABLE "applications" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "fullName" character varying(64) NOT NULL, "phoneNumber" character varying(16) NOT NULL, "email" character varying(64) NOT NULL, "vacancyId" integer NOT NULL, "resume" character varying(128) NOT NULL, "status" "public"."applications_status_enum" NOT NULL, CONSTRAINT "PK_938c0a27255637bde919591888f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "vacancies" ADD CONSTRAINT "FK_6668590b62abc9d278a8818c44c" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "branches" ADD CONSTRAINT "FK_ec93cf21dec41ec5ca617512ef0" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsTags" ADD CONSTRAINT "FK_c15e3bc5da07ad136f046bfccfe" FOREIGN KEY ("newsId") REFERENCES "news"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "newsTags" ADD CONSTRAINT "FK_6a3e1431f0059d7e07c983e941b" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01" FOREIGN KEY ("categoryId") REFERENCES "news-category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "news" ADD CONSTRAINT "FK_81498edd9eaa443973b3f8f655f" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faqsTags" ADD CONSTRAINT "FK_e2eb9ee9fbbcc7b0122693438bc" FOREIGN KEY ("faqsId") REFERENCES "faqs"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "faqsTags" ADD CONSTRAINT "FK_a91e2b80338307840e51d8522bc" FOREIGN KEY ("tagId") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "books" ADD CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86" FOREIGN KEY ("authorId") REFERENCES "author"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applications" ADD CONSTRAINT "FK_5707a4abd8063c6494064d22d05" FOREIGN KEY ("vacancyId") REFERENCES "vacancies"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "applications" DROP CONSTRAINT "FK_5707a4abd8063c6494064d22d05"`);
        await queryRunner.query(`ALTER TABLE "books" DROP CONSTRAINT "FK_54f49efe2dd4d2850e736e9ab86"`);
        await queryRunner.query(`ALTER TABLE "faqsTags" DROP CONSTRAINT "FK_a91e2b80338307840e51d8522bc"`);
        await queryRunner.query(`ALTER TABLE "faqsTags" DROP CONSTRAINT "FK_e2eb9ee9fbbcc7b0122693438bc"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_81498edd9eaa443973b3f8f655f"`);
        await queryRunner.query(`ALTER TABLE "news" DROP CONSTRAINT "FK_12a76d9b0f635084194b2c6aa01"`);
        await queryRunner.query(`ALTER TABLE "newsTags" DROP CONSTRAINT "FK_6a3e1431f0059d7e07c983e941b"`);
        await queryRunner.query(`ALTER TABLE "newsTags" DROP CONSTRAINT "FK_c15e3bc5da07ad136f046bfccfe"`);
        await queryRunner.query(`ALTER TABLE "branches" DROP CONSTRAINT "FK_ec93cf21dec41ec5ca617512ef0"`);
        await queryRunner.query(`ALTER TABLE "vacancies" DROP CONSTRAINT "FK_6668590b62abc9d278a8818c44c"`);
        await queryRunner.query(`DROP TABLE "applications"`);
        await queryRunner.query(`DROP TYPE "public"."applications_status_enum"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "book-category"`);
        await queryRunner.query(`DROP TABLE "author"`);
        await queryRunner.query(`DROP TABLE "donations"`);
        await queryRunner.query(`DROP TYPE "public"."donations_paidby_enum"`);
        await queryRunner.query(`DROP TABLE "event-category"`);
        await queryRunner.query(`DROP TABLE "events"`);
        await queryRunner.query(`DROP TABLE "expenses"`);
        await queryRunner.query(`DROP TABLE "instagram-post"`);
        await queryRunner.query(`DROP TABLE "language"`);
        await queryRunner.query(`DROP TABLE "representatives"`);
        await queryRunner.query(`DROP TYPE "public"."representatives_status_enum"`);
        await queryRunner.query(`DROP TABLE "tags"`);
        await queryRunner.query(`DROP TABLE "faqs"`);
        await queryRunner.query(`DROP TABLE "faqsTags"`);
        await queryRunner.query(`DROP TABLE "news"`);
        await queryRunner.query(`DROP TABLE "news-category"`);
        await queryRunner.query(`DROP TABLE "newsTags"`);
        await queryRunner.query(`DROP TABLE "country"`);
        await queryRunner.query(`DROP TABLE "branches"`);
        await queryRunner.query(`DROP TABLE "vacancies"`);
        await queryRunner.query(`DROP TYPE "public"."vacancies_type_enum"`);
        await queryRunner.query(`DROP TABLE "social-links"`);
        await queryRunner.query(`DROP TABLE "static-info"`);
        await queryRunner.query(`DROP TABLE "useFull-links"`);
    }

}
