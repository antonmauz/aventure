import {databaseService} from "../../services/database";
import express from "express";

export const patchUser = (
    async (req: express.Request, res: express.Response, next: express.NextFunction) => {
        await databaseService.updateUserById(req.body.userId, req.body.updatedUser).catch((err) => {
            // handle not updated
            throw err;
        });

        res.status(200).send("OK");
    }
);