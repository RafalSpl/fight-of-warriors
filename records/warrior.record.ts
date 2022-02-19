import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {pool} from "../utils/db";
import {FieldPacket} from "mysql2";

type warriorRecordResults = [WarriorRecord[], FieldPacket[]];

export class WarriorRecord {
    public id?: string;
    public wins?: number;
    public readonly name: string;
    public readonly power: number;
    public readonly defence: number;
    public readonly stamina: number;
    public readonly agility: number;


    constructor(obj: Omit<WarriorRecord, 'insert' | 'update'>) {
        const {id, name, defence, power, stamina, wins, agility} = obj;

        const stats = [defence, power, stamina, agility];

        const sum = stats.reduce((prev, curr) => prev + curr, 0);
        if (sum !== 10) {
            throw new ValidationError(`Suma wszystkich statystyk musi wynosić 10, aktualnie jest to ${sum}`);
        }
        if(name.length < 3 && name.length > 50) {
            throw new ValidationError(`Imię musi posiadać od 3 do 50 znaków!`)
        }

        for(const stat of stats) {
            if(stat < 1) {
                throw new ValidationError(`Każda ze statystyk musi wynosić minimum 1. Ta zasada została złamana`)
            }
        }

        this.id = id ?? uuid();
        this.wins = wins ?? 0;
        this.name = name;
        this.defence = defence;
        this.power = power;
        this.stamina = stamina;
        this.agility = agility;
    }

    async insert(): Promise<string> {

       await pool.execute("INSERT INTO `warriors`(`id`, `name`, `defence`, `power`, `stamina`, `wins`, `agility`) VALUES (:id, :name, :defence, :power, :stamina, :wins, :agility)", {
           id: this.id,
           name: this.name,
           defence: this.defence,
           power: this.power,
           stamina: this.stamina,
           wins: this.wins,
           agility: this.agility,
       })
        return this.id;
    }
    async update(): Promise<void> {
        await pool.execute("UPDATE `warriors` SET `wins` = :wins WHERE id = :id", {
            id: this.id,
            wins: this.wins,
        })
    }
    static async getOne(id: string): Promise<WarriorRecord | null> {
       const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `id` = :id", {
            id: id,
        }) as warriorRecordResults;
       return results.length === 0 ? null : new WarriorRecord(results[0]);
    }
    static async listAll(): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors`") as warriorRecordResults;

        return results.map(obj => new WarriorRecord(obj));
    }
    static async listTop(topCount: number): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors` ORDER BY `wins` DESC LIMIT :topCount", {
            topCount: topCount,
        }) as warriorRecordResults;

        return results.map(obj => new WarriorRecord(obj));
    }
    static async isNameTaken(name: string): Promise<boolean> {
        const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `name` = :name", {
            name,
        }) as warriorRecordResults

        return results.length > 0;
    }
}