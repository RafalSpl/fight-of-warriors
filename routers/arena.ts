import {Router} from "express";


export const arenaRouter = Router();

arenaRouter
.get('/fight-form', (req, res) => {
    res.send('formularz walki');
})
.post('/fight', (req, res) => {
    res.send('przeprowadzenie walki');
}) //POST /arena/fight