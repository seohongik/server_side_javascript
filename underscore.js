const _underscore=require('underscore');

const arr=[3,6,9,1,12];

console.log(_underscore.first(arr));
console.log(_underscore.last(arr));
console.log(_underscore.indexOf(arr,6));

const obj = [{key:'key1',value:'value1'},{key: 'key2',value: 'value2'}];
//const objArray=Array.from(obj);
//console.log(objArray);
console.log(_underscore.first(obj));