import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateAccountTable1714343577159 implements MigrationInterface {
  name = 'CreateAccountTable1714343577159'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TABLE `account` (' +
      '  `id` int NOT NULL AUTO_INCREMENT,' +
      '  `nome` varchar(100) NULL,' +
      '  `email` varchar(100) NULL,' +
      '  `password` varchar(255) NULL,' +
      '  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6),' +
      '  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6),' +
      '  `deletedAt` datetime(6) NULL,' +

      '  INDEX `IDX_2cabb849760babe66490f024e1` (`deletedAt`),' +
      '  UNIQUE INDEX `IDX_account_email` (`email`),' +
      '  PRIMARY KEY (`id`)' +
      ') ENGINE=InnoDB'
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP INDEX `IDX_account_email` ON `Account`');
    await queryRunner.query('DROP INDEX `IDX_2cabb849760babe66490f024e1` ON `Account`');
    await queryRunner.query('DROP TABLE `Account`');
  }
}
