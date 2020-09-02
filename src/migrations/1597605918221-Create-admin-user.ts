import { MigrationInterface, getRepository } from 'typeorm';
import { AdminUser } from '../seed';
import { User } from '../entities';

export class CreateAdminUser1597605918221 implements MigrationInterface {
  name = 'CreateAdminUser1597605918221';
  public async up(): Promise<void> {
    const user = new User();
    user.username = AdminUser.username;
    user.password = AdminUser.password;
    user.role = AdminUser.role;
    const userRepository = getRepository(User);
    await userRepository.save(user);
  }

  public async down(): Promise<void> {
    await getRepository(User).delete(AdminUser);
  }
}
