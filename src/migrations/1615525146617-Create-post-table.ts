/* eslint-disable no-magic-numbers */
import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
  TableIndex
} from 'typeorm';

export class CreatePostTable1615525146617 implements MigrationInterface {
  tableName = 'post';
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: this.tableName,
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment'
          },
          {
            name: 'title',
            type: 'varchar'
          },
          {
            name: 'content',
            type: 'varchar'
          },
          {
            name: 'category',
            type: 'varchar'
          },
          {
            name: 'tags',
            type: 'varchar'
          },
          {
            name: 'userId',
            type: 'int'
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()'
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
            onUpdate: 'true'
          }
        ]
      }),
      true
    );

    await queryRunner.createIndex(
      this.tableName,
      new TableIndex({
        name: 'IDX_POST_title',
        columnNames: ['title']
      })
    );

    await queryRunner.createForeignKey(
      this.tableName,
      new TableForeignKey({
        columnNames: ['userId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'user',
        onDelete: 'CASCADE'
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable(this.tableName);
    const foreignKey = table?.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('userId') !== -1
    );
    if (foreignKey) {
      await queryRunner.dropForeignKey(this.tableName, foreignKey);
    }
    await queryRunner.dropIndex(this.tableName, 'IDX_POST_title');
    await queryRunner.dropTable(this.tableName);
  }
}
