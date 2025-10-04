const express=require('express');
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
    res.send('Hello Rosie,<img src="/ROSIE.png">');
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