import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";


export const hallOfFameRouter = Router();

hallOfFameRouter
    .get('/', async (req, res) => {
        const warriors = await WarriorRecord.listTop(10);
        res.render('hall-of-fame/list', {
            warriors,
        })
    })