import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";


export const warriorRouter = Router();

warriorRouter
.get('/add-form', (req, res) => {
    res.render('warrior/add-form');
})
.post('/', async(req, res) => {
    const {name, defence, power, stamina, agility} = req.body;
    if(await WarriorRecord.isNameTaken(name)) {
        throw new Error(`Imię ${req.body.name} jest już zajęte, wybierz inne!`)
    }
    const warrior = new WarriorRecord({
        ...req.body,
        defence: Number(defence),
        power: Number(power),
        stamina: Number(stamina),
        agility: Number(agility),
    });
    await warrior.insert();
    res.render('warrior/warrior-added', {
        id: warrior.id,
        name: warrior.name,
    })
})