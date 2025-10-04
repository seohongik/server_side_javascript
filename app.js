const express=require('express');
const url = require("node:url");
const {object} = require("underscore");
const app = express();
app.use(express.static('public')); // 정적파일 로드
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
    const list =[];
    loginVO.setName("seo hong ik")
    loginVO.setAge(400);
    //list.push(loginVO) // 이거는 참조 값 복사함 // 그래서 마지막 걸로 없어 침
    list.push(JSON.parse(JSON.stringify(loginVO))); // 엎어 치는거 방법 1 => 깊은 복사 나머지는 블로그에 정리
    console.log(loginVO);
    loginVO.setName("another");
    loginVO.setAge(10);
    //list.push(loginVO); // 이거는 찹조 값 복사함 그래서 마지막 걸로 없어 침
    list.push(JSON.parse(JSON.stringify(loginVO))); // 없어치는 없애는 방법 => 깊은 복사 나머지는 블로그에 정리
    //console.log(loginVO); // [{"name":"another","age":10},{"name":"another","age":10}] 개발할 때 이거 중요하다 .. 주소값 없어친다
    console.log(loginVO); // [{"name":"another","age":10},{"name":"another","age":10}] 개발할 때 이거 중요하다 .. 주소값 없어친다 이거 방시하려면 위코드처럼 불변객체 반환 또는 new 생성자 계속 해야함 그래도 딥다이브 자바스크립트 코어자바스크립트 읽어놔서 다행
    res.send(JSON.stringify(list));
});

app.get("/rosie",function (req,res){
    res.send('Hello Rosie ,<img src="/ROSIE.png">');
});

app.listen(port,function (){
    console.log('Connected ',port);
});

app.get("/html-dynamic",function (req,res){

    // 서버 쪽 에서 하는 방법 권장 하지 않음
    let lis = "";
    for (let i=0; i<5; i++){
        lis += `<li> coding ${i+1} </li>`;
    }
    const output = `<!doctype html>
        <html lang="ko">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
            <title>html</title>
        </head>
        <body>
            Hello, Dynamic!
            <ul>
            ${lis}
            </ul>
        </body>
        </html>`
    res.send(output);
});

app.get("/topic",function (req, res) {
    console.dir(req.url) // /topic?id=2
    const myURL = new URL(req.url, `http://${req.headers.host}`);
    const queryString = myURL.searchParams;
    console.log(queryString) //URLSearchParams { 'id' => '2' }
    const map = Object.fromEntries(queryString);
    console.log(map); //{ id: '2' }
    console.log(map.id); //2
    //res.send(map);
    // 위코드는 그냥 검증 후 entity에 널때 사용 하자
    res.send(req.query.id);
});

app.get("/topic2",function (req, res) {
    const topics =[
        'Javascript ...'
        ,'Node.js...'
        ,'Java...'
        ,'Spring...'
        ,'없음'
    ]
    const showId =req.query.id<topics.length-1?req.query.id : 4;
    res.send(topics[showId]);
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