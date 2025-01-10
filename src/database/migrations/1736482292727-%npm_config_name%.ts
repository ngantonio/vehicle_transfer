import { MigrationInterface, QueryRunner } from 'typeorm';

export class User implements MigrationInterface {
  name = 'User';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "transfer" DROP CONSTRAINT "FK_654d1a357c22b0bd584275f2968"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfer" DROP CONSTRAINT "FK_12ec72399c330456ed58f789d62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_projects" DROP CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_organizationalUnits" DROP CONSTRAINT "FK_5eaeb9521d4c57a79e34c128008"`,
    );
    await queryRunner.query(
      `CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" character varying(50) NOT NULL, "email" character varying(50) NOT NULL, "password" character varying(100) NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfer" ADD CONSTRAINT "FK_654d1a357c22b0bd584275f2968" FOREIGN KEY ("client_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfer" ADD CONSTRAINT "FK_12ec72399c330456ed58f789d62" FOREIGN KEY ("transmitter_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_projects" ADD CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_organizationalUnits" ADD CONSTRAINT "FK_5eaeb9521d4c57a79e34c128008" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_organizationalUnits" DROP CONSTRAINT "FK_5eaeb9521d4c57a79e34c128008"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" DROP CONSTRAINT "FK_e4435209df12bc1f001e5360174"`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_projects" DROP CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfer" DROP CONSTRAINT "FK_12ec72399c330456ed58f789d62"`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfer" DROP CONSTRAINT "FK_654d1a357c22b0bd584275f2968"`,
    );
    await queryRunner.query(`DROP TABLE "users"`);
    await queryRunner.query(
      `ALTER TABLE "users_organizationalUnits" ADD CONSTRAINT "FK_5eaeb9521d4c57a79e34c128008" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_roles" ADD CONSTRAINT "FK_e4435209df12bc1f001e5360174" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "users_projects" ADD CONSTRAINT "FK_0f280c70a3a6ab7f4cf3c658c4c" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfer" ADD CONSTRAINT "FK_12ec72399c330456ed58f789d62" FOREIGN KEY ("transmitter_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "transfer" ADD CONSTRAINT "FK_654d1a357c22b0bd584275f2968" FOREIGN KEY ("client_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }
}
