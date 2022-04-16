
import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import { delPost, getAll, getPost, getPosts, patchPost, putPost, setPost } from './posts.controllers';

export class PostsRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'PostsRoutes');
    }

    configureRoutes() {
        this.app.route(`/posts`)
            .get(getPosts)
            .post(setPost);

        this.app.route(`/posts/:postId`)
            .all(getAll)
            .get(getPost)
            .put(putPost)
            .patch(patchPost)
            .delete(delPost);
        return this.app
    }
}