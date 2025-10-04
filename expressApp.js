const express=require('express');
const app = express();
const port = 3000;

app.get('/',function (req,res){
    res.status(200);
    res.setHeader('Content-Type', 'text/plane');
    res.end("welcome to home");
    //res.send("welcome to home");
});

app.get('/login',function (req,res){
    res.status(200);
    res.setHeader('Content-Type', 'text/plane');
    res.send('login please');
});

app.get('/VO',function (req,res){
    res.status(200);
    res.setHeader('Content-Type', 'application/json');
    const loginVO = new LoginVO();
    loginVO.setName("seo hong ik")
    loginVO.setAge(400);
    console.log(loginVO);

    loginVO.setName("another")
    console.log(loginVO);

    res.send(JSON.stringify(loginVO));
});

app.listen(port,function (){
    console.log('Connected ',port);
});

class LoginVO{
    /*constructor(name,age) {
        this.name=name;
        this.age= age;
    }*/
    constructor() {
    }
    getName(name){
        return name;
    }
    setName(name){
        this.name = name;
    }
    getAge(age){
        return age;
    }
    setAge(age){
        this.age = age;
    }

}