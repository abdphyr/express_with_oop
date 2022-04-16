import express, { Request, Response, NextFunction } from 'express';

const posts: {
    id: number;
    name: string;
    alterEgo: string;
}[] = [
        {
            id: 1,
            name: 'Tor',
            alterEgo: 'Torr'
        },
        {
            id: 2,
            name: 'IronMan',
            alterEgo: 'IronMan'
        },
        {
            id: 3,
            name: 'SpiderMan',
            alterEgo: 'SpiderMan'
        },
        {
            id: 4,
            name: 'BeatMan',
            alterEgo: 'BeatMen'
        }
    ];


export const getPosts = (req: Request, res: Response) => {
    res.status(200).send(posts);
}
export const setPost = (req: Request, res: Response) => {
    const post = {
        id: posts.length + 1,
        name: req.body.name,
        alterEgo: req.body.alterEgo,
    }

    if (!req.body.name && !req.body.alterEgo) {
        return res.status(400).send("Fields are required")
    }
    posts.push(post)
    res.status(201).send(post);
}

export const getAll = (req: Request, res: Response, next: NextFunction) => {
    // this middleware function runs before any request to /posts/:postId
    // but it doesn't accomplish anything just yet---
    // it simply passes control to the next applicable function below using next()
    next();
}

export const getPost = (req: Request, res: Response) => {
    const postId = parseInt(req.params.postId)
    const post = posts.find(post => post.id === postId)
    if (!post) {
        return res.status(404).send('Post not found')
    }
    res.status(200).send(post);
}

export const putPost = (req: Request, res: Response) => {
    const postId = parseInt(req.params.postId)
    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res.status(404).send('Post not found')
    }
    
    const postIndex = posts.findIndex(post => post.id === postId);
    const postName: string = req.body.name;
    const postAlterEgo: string = req.body.alterEgo;
    // console.log(req.params)
    post.name = postName;
    post.alterEgo = postAlterEgo;
    posts.splice(postIndex, 1, post)
    res.send(post);
}
export const patchPost = (req: Request, res: Response) => {
    res.status(200).send(`PATCH requested for id ${req.params.postId}`);
}
export const delPost = (req: Request, res: Response) => {
    const postId = parseInt(req.params.postId)
    const post = posts.find(post => post.id === postId);
    if (!post) {
        return res.status(404).send('Post not found')
    }

    const postIndex = posts.findIndex(post => post.id === postId);
    posts.splice(postIndex, 1);
    res.send(post)
}