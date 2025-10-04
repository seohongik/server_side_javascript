const _underscore=require('underscore');

const arr=[3,6,9,1,10];
console.log(_underscore.first(arr));
console.log(_underscore.last(arr));
console.log(_underscore.indexOf(arr,6));

const obj = [{key:'key1',value:'value1'},{key: 'key2',value: 'value2'}];
//const objArray=Array.from(obj);
//console.log(objArray);
console.log(_underscore.first(obj));
arr.sort();
console.log(arr);// [1, 10 , 3, 6, 9];

arr.sort(function (a,b){return b-a;});
console.log(arr);// [10,9,6,3,1]

arr.sort(function (a,b){return a-b;});
console.log(arr); //[1,3,6,9,10]