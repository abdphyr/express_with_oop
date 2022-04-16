import { Request, Response } from "express";

const channels: {
    id: string;
    courses: string[]
}[] = [
        {
            id: "codeevolution",
            courses: ["react", "vue", "angular"]
        }
    ]

export const getChannels = (req: Request, res: Response) => {
    if (!channels) {
        res.status(404).send("Channels not found")
    }
    res.status(200).send(channels)
}
export const postChannel = (req: Request, res: Response) => {
    if (!req.body.id && !req.body.courses) {
        res.status(400).send("Id and name are required")
    }
    const channel: {
        id: string;
        courses: string[];
    } = {
        id: req.body.id,
        courses: req.body.courses
    }
    channels.push(channel)
    res.status(201).send(channel)
}
