import { MigrationInterface, getRepository } from 'typeorm';
import { Post } from '../entities';
import { PostsList } from '../seed';

export class CreatePostsData1615534690031 implements MigrationInterface {
  name = 'CreatePostsData1615534690031';
  public async up(): Promise<void> {
    const userRepository = getRepository(Post);
    await userRepository.save(PostsList);
  }

  public async down(): Promise<void> {
    // TODO: To be implemented.
    // await getRepository(Post).remove();
  }
}
