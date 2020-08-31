import { MigrationInterface, getRepository } from 'typeorm';
import { AdminUser } from '../seed/admin-users';
import { User } from '../entities/User';

export class CreateAdminUser1597605918221 implements MigrationInterface {
  name = 'CreateAdminUser1597605918221';
  public async up(): Promise<void> {
    await getRepository(User).insert(AdminUser);
  }

  public async down(): Promise<void> {
    await getRepository(User).delete(AdminUser);
  }
}
