const express = require("express");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.listen(3000);

// const users = [];
let user;

app.get("/users", (req, res) => {
    res.send(users);
});

app.get("/users/:id", (req, res) => {
    res.send("user "+req.params.id+" get");
});


//유저생성
app.post("/users", (req, res) => {
    const createUser = req.body;
    let result;
    if(createUser.id && createUser.name && createUser.age){
        //users.push(user);
        user = createUser;
        result = `${user.name}님을 생성 했습니다.`
    } else {
        result = '입력 요청값이 잘못되었습니다.'
    }
    
    res.send({
        result
    });
});

//name 변경
app.put("/users/:id", (req, res) => {
let result;
    if(user && user.id == req.params.id){
        user.name = req.body.name;
        result = `유저 이름을 ${user.name}으로 변경`;
    } else {
        result = `아이디가 ${req.params.id}인 유저가 존재하지 않습니다.`;
    }
    
    res.send({
        result
    });
});
    
    
//user 지우기
app.delete("/user/:id", (req, res) => {
    res.send("user "+req.params.id+" delete");
});

app.put("/users/:id", (req, res) => {
    res.send("user "+req.params.id+" edit");
});

app.delete("/users/:id", (req, res) => {
    res.send("user "+req.params.id+" delete");
});