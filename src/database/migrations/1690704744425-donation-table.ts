import { MigrationInterface, QueryRunner } from "typeorm";

export class DonationTable1690704744425 implements MigrationInterface {
    name = 'DonationTable1690704744425'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Donations" ("id" SERIAL NOT NULL, "createdAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "createdBy" character varying(300), "updatedAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updatedBy" character varying(300), "deletedAt" TIMESTAMP, "deletedBy" character varying(255), "count" integer NOT NULL, "displayName" character varying NOT NULL, "email" character varying NOT NULL, "mobile" character varying, "team" character varying, "message" character varying, CONSTRAINT "PK_e33b23e4b84b4cc2ea43a6264fb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Donations"`);
    }

}
