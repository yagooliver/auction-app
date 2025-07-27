import { MigrationInterface, QueryRunner } from "typeorm";

export class Initial1754241093744 implements MigrationInterface {
    name = 'Initial1754241093744'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "bids" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price" numeric NOT NULL, "createdAt" TIMESTAMP NOT NULL, "auctionId" uuid, "buyerId" uuid, CONSTRAINT "PK_7950d066d322aab3a488ac39fe5" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "pictures" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "uri" character varying NOT NULL, "productId" uuid, CONSTRAINT "PK_7aa5e10dd31983e9f05b9f1fc85" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying NOT NULL, "description" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "auctions" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "startingPrice" numeric NOT NULL, "endsAt" TIMESTAMP NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "highestBid" numeric NOT NULL, "ownerId" uuid, "productId" uuid, CONSTRAINT "REL_1e69bf3176e83fc48ac6ffc6f9" UNIQUE ("productId"), CONSTRAINT "PK_87d2b34d4829f0519a5c5570368" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."users_role_enum" AS ENUM('ADMIN', 'BUYER', 'SELLER')`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "name" character varying NOT NULL, "password" character varying NOT NULL, "role" "public"."users_role_enum" NOT NULL DEFAULT 'BUYER', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "bids" ADD CONSTRAINT "FK_6d6b20987ed2f61e8801398f8d1" FOREIGN KEY ("auctionId") REFERENCES "auctions"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "bids" ADD CONSTRAINT "FK_7d1c71c86e68b03d20d9115f430" FOREIGN KEY ("buyerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "pictures" ADD CONSTRAINT "FK_c81df1a7a2d02711a092d423cfc" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD CONSTRAINT "FK_ec74ccf82cc14ed760d18742fe4" FOREIGN KEY ("ownerId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "auctions" ADD CONSTRAINT "FK_1e69bf3176e83fc48ac6ffc6f93" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "auctions" DROP CONSTRAINT "FK_1e69bf3176e83fc48ac6ffc6f93"`);
        await queryRunner.query(`ALTER TABLE "auctions" DROP CONSTRAINT "FK_ec74ccf82cc14ed760d18742fe4"`);
        await queryRunner.query(`ALTER TABLE "pictures" DROP CONSTRAINT "FK_c81df1a7a2d02711a092d423cfc"`);
        await queryRunner.query(`ALTER TABLE "bids" DROP CONSTRAINT "FK_7d1c71c86e68b03d20d9115f430"`);
        await queryRunner.query(`ALTER TABLE "bids" DROP CONSTRAINT "FK_6d6b20987ed2f61e8801398f8d1"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TYPE "public"."users_role_enum"`);
        await queryRunner.query(`DROP TABLE "auctions"`);
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TABLE "pictures"`);
        await queryRunner.query(`DROP TABLE "bids"`);
    }

}
