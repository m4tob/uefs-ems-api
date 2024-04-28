import { MigrationInterface, QueryRunner } from 'typeorm'

const accounts: { nome: string; email: string; password: string }[] = [
  {
    nome: 'Matheus Borges',
    email: 'matob@live.com',
    password: '123456',
  },
  {
    nome: 'Inácio Borges',
    email: 'inacioob@gmail.com',
    password: '123456',
  },
]

export class InsertAccounts1714343577159 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    for (const account of accounts) {
      await queryRunner.manager.query(
        `INSERT INTO account (nome, email, password) VALUES (?, ?, ?)`,
        [account.nome, account.email, account.password],
      )
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const emails = accounts.map((account) => account.email)
    queryRunner.manager.query(
      `DELETE FROM account WHERE email IN (${emails.map(() => '?').join(',')})`,
      emails,
    )
  }
}
