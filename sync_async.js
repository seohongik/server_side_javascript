const fs = require('node:fs');
//sync
console.log(1);
const data=fs.readFileSync('data.txt',{encoding:'utf-8'});
console.log(data);

//Async
console.log(2);
fs.readFile('data.txt',{encoding:'utf-8'},function (err,data){
    console.log(3);
    //if(err) {throw  err;}
    console.log(data);
});
console.log(4);

// 비동기 때문에 2 4 3이 실행