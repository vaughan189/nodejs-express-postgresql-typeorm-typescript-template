import { NUMBERS, RESPONSE_CODE } from '../config';
import { Request, Response } from 'express';
import { Post } from '../entities';
import { getRepository } from 'typeorm';
import { validate } from 'class-validator';

class PostController {
  static getAll = async (_req: Request, res: Response): Promise<void> => {
    const postRepository = getRepository(Post);
    const posts = await postRepository.find({});
    res.send(posts);
  };

  static getById = async (_req: Request, res: Response): Promise<void> => {
    const id: string = _req.params.id;
    const postRepository = getRepository(Post);
    try {
      const post = await postRepository.findOneOrFail(id, {
        select: ['id', 'title', 'content', 'category', 'tags', 'userId']
      });
      res.send(post);
    } catch (error) {
      res.status(RESPONSE_CODE.NOT_FOUND).send('Post not found');
    }
  };

  static create = async (_req: Request, res: Response): Promise<void> => {
    const { title, content, category, tags, userId } = _req.body;

    const post = new Post();
    post.title = title;
    post.content = content;
    post.category = category;
    post.tags = tags;
    post.userId = userId;
    const errors = await validate(post);

    if (errors.length > NUMBERS.ZERO) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(errors);
      return;
    }

    const postRepository = getRepository(Post);
    try {
      await postRepository.save(post);
    } catch (e) {
      res.status(RESPONSE_CODE.SERVER_ERROR).send(e);
      return;
    }
  };

  static update = async (req: Request, res: Response): Promise<void> => {
    const id = req.params.id;

    const { title, content, category, tags, userId } = req.body;

    const postRepository = getRepository(Post);
    let post;
    try {
      post = await postRepository.findOneOrFail(id);
    } catch (error) {
      res.status(RESPONSE_CODE.NOT_FOUND).send('User not found');
      return;
    }
    post.title = title;
    post.content = content;
    post.category = category;
    post.tags = tags;
    post.userId = userId;
    const errors = await validate(post);
    if (errors.length > NUMBERS.ZERO) {
      res.status(RESPONSE_CODE.BAD_REQUEST).send(errors);
      return;
    }

    try {
      await postRepository.save(post);
    } catch (e) {
      res.status(RESPONSE_CODE.CONFLICT).send('username already in use');
      return;
    }
    res.status(RESPONSE_CODE.NO_CONTENT_SUCCESS).send();
  };

  static delete = async (req: Request, res: Response): Promise<void> => {
    //Get the ID from the url
    const id = req.params.id;

    const postRepository = getRepository(Post);
    let post: Post;
    try {
      post = await postRepository.findOneOrFail(id);
      res.send(post);
    } catch (error) {
      res.status(RESPONSE_CODE.NOT_FOUND).send('Post not found');
      return;
    }
    postRepository.delete(id);

    //After all send a 204 (no content, but accepted) response
    res.status(RESPONSE_CODE.NO_CONTENT_SUCCESS).send();
  };
}

export default PostController;
