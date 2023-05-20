import {databaseService} from "../../services/database";
import express from "express";

export const getUser = async (req: express.Request, res: express.Response) => {
    const test = req.body
    console.log("body: ", test)

    const user = await databaseService.findUserById(req.body.userId).catch((err) => {
        // handle not found in DB
        throw err;
    });

    res.status(200).json(user);
}
