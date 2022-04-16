import express, { Request, Response } from 'express';

const users: {
    id: number;
    name: string;
    channelId: string;
}[] = [
        {
            id: 1,
            name: "Vali",
            channelId: 'codevolution'
        },
        {
            id: 2,
            name: "Asad",
            channelId: 'codevolution2'
        },
        {
            id: 3,
            name: "Guli",
            channelId: 'codevolution3'
        },
        {
            id: 4,
            name: "Kamoliddin",
            channelId: 'codevolution4'
        }
    ]

export const getUsers = (req: Request, res: Response) => {
    res.status(200).send(users);
}

export const postUser = (req: Request, res: Response) => {
    const userName = req.body.name
    if (!userName) {
        return res.status(400).send('name is required')
    }
    const newUser = {
        id: users.length + 1,
        name: req.body.name,
        channelId: req.body.channelId
    }
    users.push(newUser)
    res.status(201).send(newUser);
}
export const getUser = (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId)
    const user = users.find(user => user.id === userId)
    if (!user) {
        return res.status(404).send('User not found')
    }
    res.status(200).send(user)
}

export const putUser = (req: Request, res: Response) => {
    const userId = parseInt(req.params.userId)
    const user = users.find(user => user.id === userId)
    if (!user) {
        return res.status(404).send('User not found')
    }
    user.name = req.body.name
    user.channelId = req.body.channelId
    const userIndex = users.findIndex(user => user.id === userId)
    users.splice(userIndex, 1, user)
    res.status(200).send(user)
}

export const delUser = (req: express.Request, res: express.Response) => {
    const userId = parseInt(req.params.userId)
    const user = users.find(user => user.id === userId)
    if (!user) {
        return res.status(404).send('User not found')
    }
    const userIndex = users.findIndex(user => user.id === userId)
    users.splice(userIndex, 1)
    res.status(200).send(user)
}
