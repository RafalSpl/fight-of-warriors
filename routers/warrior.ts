import {Router} from "express";


export const warriorRouter = Router();

warriorRouter
.get('/add-form', (req, res) => {
    res.send('formularz dodawania wojownika');
})
.post('/', (req, res) => {
    res.send('dodawanie wojownika');
})