import {databaseService} from "@services/database";
import express from "express";

export const postUser = (
    async (req: express.Request, res: express.Response) => {
        await databaseService.createUser({
            name: "Dans",
            email: "haha@gmail.com",
            password: "123123"
        }).catch((err) => {
            // handle not created
            throw err;
        });

        res.status(200).send("OK");
    }
);