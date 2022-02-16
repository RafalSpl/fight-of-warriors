import express, {static as eStatic, urlencoded} from "express";
import 'express-async-errors';
import methodOverride from "method-override";
import {engine} from "express-handlebars";
import {homeRouter} from "./routers/home";
import {warriorRouter} from "./routers/warrior";
import {arenaRouter} from "./routers/arena";
import {hallOfFameRouter} from "./routers/hall-of-fame";
// import '/utils/db';
import {WarriorRecord} from "./records/warrior.record";

const w = new WarriorRecord({
    name: 'dd',
    agility: 5,
    defence: 1,
    power: 1,
    stamina: 3,
})

console.log(w);

const app = express();

app.use(methodOverride('_method'));
app.use(urlencoded({
    extended: true,
}));
app.use(eStatic('public'));
app.engine('.hbs', engine({
    extname: '.hbs',
    // helpers: ???
}));
app.set('view engine', '.hbs');

app.use('/', homeRouter);
app.use('/warrior', warriorRouter);
app.use('/arena', arenaRouter);
app.use('/hall-of-fame', hallOfFameRouter);

// app.use(handleError);

app.listen(3000, 'localhost', () => {
    console.log('express listing on port 3000');
})