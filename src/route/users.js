import { Router } from "express";
import board from "../models/board.js";
import db from '../models/index.js'

const User = db.User;

const userRouter = Router();

// 회원 가져오기
userRouter.get("/", async (req, res) => {
    try {
        const { Op } = sequelize;
        let {name, age} = req.query;

        const findUserQuery = {
            attributes: ['id', 'name', 'age']
        }

        if (name && age) {
            findUserQuery['where'] = { name: {[Op.substring]: name}, age }
        } else if (name) {
            findUserQuery['where'] = { name: {[Op.substring]: name} } 
        } else if (age) {
            findUserQuery['where'] = { age }
        }

        const result = await User.findAll(findUserQuery);

        res.send({
            count: result.length,
            result : result
        });
    } catch(err) {
        res.status(500).send("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
});

// 회원 추가하기
userRouter.post("/", async (req, res) => {
    try {
        const createUser = req.body;

        if (!createUser.name || !createUser.age) {
            res.status(400).send("입력 요청이 잘못되었습니다.");
        }

        const user = await User.create({
            name: createUser.name,
            age: parseInt(createUser.age)
        });

        res.status(201).send({
            result : `${createUser.name}님을 생성했습니다.`
        });
        
    } catch(err) {
        res.status(500).send("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
});

// 회원 정보 수정하기
userRouter.put("/:id", async (req, res) => {
    try {
        const updateUser = parseInt(req.params.id);
        const updateUserName = req.body.name;
        const updateUserAge = req.body.age;
        const { Op } = sequelize;

        const findUser = await User.findOne({
            where: {
                id : {[Op.eq]: updateUser}
            }
        });

        if (!findUser || (!updateUserName && !updateUserAge)) {
            res.status(400).send("해당 회원이 존재하지 않거나, 입력 요청이 잘못되었습니다.");
            return; 
        }

        if (updateUserName) findUser.name = updateUserName;
        if (updateUserAge) findUser.age = updateUserAge;
        findUser.save();

        res.status(200).send({
            msg : "수정을 완료하였습니다.",
            result : findUser
        });

    } catch(err) {
        res.status(500).send("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
});

// 회원 정보 삭제하기
userRouter.delete("/:id", async (req, res) => {
    try {
        const deleteUser = parseInt(req.params.id);
        const { Op } = sequelize;

        const findUser = await User.findOne({
            where: {
                id : {[Op.eq]: deleteUser}
            }
        });

        if (!findUser) {
            res.status(400).send("해당 회원이 존재하지 않습니다.");
            return; 
        }

        findUser.destroy();

        res.status(200).send({
            msg : "삭제를 완료하였습니다."
        });

    } catch(err) {
        res.status(500).send("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
});

/* CRUD TEST
    User.create();
    User.findAll();
    User.findOne();
    User.update();
    User.destroy();
*/
userRouter.get("/test/:id", async(req, res) => {
    try {
        const { Op } = sequelize;
        const page = req.body.page;
        const size = req.body.size;
        const offset = (page - 1) * size;

        // const userResult = await User.findAll({
        //     limit: 100
        // })

        // const boardResult = await Board.findAll({
        //     limit: 100
        // });

        // res.status(200).send({
        //     user: {
        //         count: userResult.length,
        //         result: userResult,
        //     },
        //     board: {
        //         count: boardResult.length,
        //         result: boardResult
        //     }
        // });

        const findUser = await User.findOne({
            where : {id: 1000}
        })

        // findUser.name = "진예도";
        // //findUser.save();
        // findUser.destroy();

        res.status(200).send({
            result: findUser
        });
    } catch(err) {
        console.log(err);
        res.status(500).send("서버에 문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    }
});


export default userRouter;