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
    res.send('Hello Rosie ,<img src="/ROSIE.png">');
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

app.get("/topic-id",function (req, res) {
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

// pathVariable 사용하기
app.get('/pathVariable/:id', (req, res) => {
    const userId = req.params.id; // ← 경로 변수
    res.send(`User ID: ${userId}`);
});

// pathVariable 사용하기 queryString 같이 사용
app.get('/pathVariable-query/:id', (req, res) => {
    const productId = req.params.id;       // path variable
    const category = req.query.category ?? "";    // query string
    res.send(`상품ID: ${productId}, 카테고리: ${category}`);
});

/*** 이거 필수로 붙혀야 폼데이터 파싱 가능*/
app.use(express.json()); // JSON 요청 파싱
app.use(express.urlencoded({ extended: true })); // 폼 요청 파싱

// ✅ [1] 폼 페이지
app.get('/form', (req, res) => {

    const html =`<!DOCTYPE html>
                        <html lang="ko">
                        <head><meta charset="UTF-8"><title>폼 제출</title></head>
                        <body>
                          <h1>PRG 패턴 예제</h1>
                          <form action="/submit" method="POST">
                            <input type="text" name="name" placeholder="이름 입력" required />
                            <input type="text" name="message" placeholder="메시지 입력" required />
                            <button type="submit">전송</button>
                          </form>
                        </body>
                        </html>`;

    res.send(html); // form.ejs
});

// ✅ [2] POST 처리
app.post('/submit', (req, res) => {
    const { name, message } = req.body;
    console.log(req.body)
    console.log('폼 데이터:', name, message);
    // 데이터 처리 후 Redirect (PRG 핵심)
    res.redirect(`/success?name=${encodeURIComponent(name)}`);
});

// ✅ [3] GET 결과 페이지
app.get('/success', (req, res) => {
    const name = req.query.name;
    res.send(`✅ ${name}님, 성공적으로 등록되었습니다!`);
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

