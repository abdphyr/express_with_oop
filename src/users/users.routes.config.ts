
import { CommonRoutesConfig } from '../common/common.routes.config';
import express from 'express';
import { delUser, getUser, getUsers, postUser, putUser } from './users.controllers';

export class UsersRoutes extends CommonRoutesConfig {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app.route(`/users`)
            .get(getUsers)
            .post(postUser);

        this.app.route(`/users/:userId`)
            .all((req: express.Request, res: express.Response, next: express.NextFunction) => {
                // this middleware function runs before any request to /users/:userId
                // but it doesn't accomplish anything just yet---
                // it simply passes control to the next applicable function below using next()
                next();
            })
            .get(getUser)
            .put(putUser)
            .patch((req: express.Request, res: express.Response) => {
                res.status(200).send(`PATCH requested for id ${req.params.userId}`);
            })
            .delete(delUser );

        return this.app
    }
}