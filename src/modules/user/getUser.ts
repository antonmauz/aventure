import {databaseService} from "@services/database";
import express from "express";

export const getUser = async (req: express.Request, res: express.Response) => {
    const userId = req.query.userId

    if (typeof userId !== "string") {
        res.status(400).send("error");
        return
    }

    const user = await databaseService.findUserById(userId).catch((err) => {
        // handle not found in DB
        throw err;
    });

    res.status(200).json(user);
}
