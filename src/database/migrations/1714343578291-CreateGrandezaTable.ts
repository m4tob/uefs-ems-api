import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateGrandezaTable1714343578291 implements MigrationInterface {
  name = 'CreateGrandezaTable1714343578291'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `grandeza` (' +
      '  `id` int NOT NULL AUTO_INCREMENT, ' +
      '  `nome` varchar(50) NOT NULL, ' +
      '  `unidade_medida` varchar(50) NULL, ' +
      '  `sigla` varchar(20) NULL, ' +
      '  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ' +
      '  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), ' +
      '  `deletedAt` datetime(6) NULL, ' +

      '  INDEX `IDX_02c8f9008cf95ef32bbedf463a` (`deletedAt`), ' +
      '  PRIMARY KEY (`id`)' +
      ') ENGINE=InnoDB'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_02c8f9008cf95ef32bbedf463a` ON `grandeza`');
    await queryRunner.query('DROP TABLE `grandeza`');
  }
}
