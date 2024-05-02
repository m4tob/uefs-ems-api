import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateSensorTable1714655309252 implements MigrationInterface {
  name = 'CreateSensorTable1714655309252'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE `sensor` (' +
      '  `id` int NOT NULL AUTO_INCREMENT, ' +
      '  `modelo` varchar(50) NOT NULL, ' +
      '  `descricao` varchar(255) NULL, ' +
      '  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ' +
      '  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), ' +
      '  `deletedAt` datetime(6) NULL, ' +

      '  INDEX `IDX_9aa960c4d048567633cefadb5a` (`deletedAt`), ' +
      '  PRIMARY KEY (`id`)' +
      ') ENGINE=InnoDB'
    );

    await queryRunner.query('CREATE TABLE `especificacao_grandeza` (' +
      '  `id` int NOT NULL AUTO_INCREMENT, ' +
      '  `sensorId` int NOT NULL, ' +
      '  `grandezaId` int NOT NULL, ' +
      '  `valorMinimo` decimal(8,3) NULL, ' +
      '  `valorMaximo` decimal(8,3) NULL, ' +
      '  `sinal` varchar(15) NULL, ' +
      '  `createdAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), ' +
      '  `updatedAt` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), ' +
      '  `deletedAt` datetime(6) NULL, ' +

      '  INDEX `IDX_25907626172b665fd34153c971` (`deletedAt`), ' +
      '  PRIMARY KEY (`id`)' +
      ') ENGINE=InnoDB'
    );

    await queryRunner.query('ALTER TABLE `especificacao_grandeza` ADD CONSTRAINT `FK_d74a6be186b1a7fe04fbeb90f16` FOREIGN KEY (`sensorId`) REFERENCES `sensor`(`id`) ON DELETE CASCADE ON UPDATE NO ACTION');
    await queryRunner.query('ALTER TABLE `especificacao_grandeza` ADD CONSTRAINT `FK_db4ff1ee7201702067541bf8158` FOREIGN KEY (`grandezaId`) REFERENCES `grandeza`(`id`) ON DELETE NO ACTION ON UPDATE NO ACTION');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE `especificacao_grandeza` DROP FOREIGN KEY `FK_db4ff1ee7201702067541bf8158`');
    await queryRunner.query('ALTER TABLE `especificacao_grandeza` DROP FOREIGN KEY `FK_d74a6be186b1a7fe04fbeb90f16`');
    await queryRunner.query('DROP INDEX `IDX_25907626172b665fd34153c971` ON `especificacao_grandeza`');
    await queryRunner.query('DROP TABLE `especificacao_grandeza`');

    await queryRunner.query('DROP INDEX `IDX_9aa960c4d048567633cefadb5a` ON `sensor`');
    await queryRunner.query('DROP TABLE `sensor`');
  }
}
