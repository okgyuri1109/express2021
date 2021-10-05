import { Router } from "express";
import sequelize from "sequelize";
import faker from "faker";
import _ from "lodash";

const seq = new sequelize('express', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    // logging: false
});

const Board = seq.define("board", {
    title: {
        type: sequelize.STRING,
        allowNull: false
    },
    content: {
        type: sequelize.TEXT,
        allowNull:true
    }
});

const board_sync = async() => {
    try{
        await Board.sync({force: true});
        for(let i=0; i < 10000; i++){
            await Board.create({
                title: faker.lorem.sentences(1),
                content: faker.lorem.sentences(10)
            })
        }
    } catch(err){
        console.log(err)
    }
}
board_sync();