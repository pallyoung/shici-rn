var shi = require('./../asset/shiwen');

var fs = require('fs');
var path = require('path');

var assetPath = path.relative('./','app/asset');

var authorFile = path.join(assetPath,'author.js');
var ageFile = path.join(assetPath,'age.js');
var shiFile = path.join(assetPath,'shi.js');

fs.unlinkSync(authorFile);
fs.unlinkSync(ageFile);
fs.unlinkSync(shiFile);

var id = 0;

var authors = new Map();
var ages = new Map();

var shis = new Map();


shi.forEach(function (item) {
    var author = item.author;
    var age = item.age;
    var innerid = 'shi_' + id++;

    shis.set(innerid, item);

    var authorS,ageS;
    if (!authors.has(author)) {
        authors.set(author, []);
    }
    if(!ages.has(age)){
        authors.set(age, []);
    }
    authorS = authors.get(author);
    ageS = authors.get(author);
    ageS.push(innerid);
    authorS.push(innerid);
    authors.set(author,authorS);
    ages.set(age,ageS);
});

fs.appendFileSync(authorFile,'export default {')
authors.forEach(function(v,k){
    fs.appendFileSync(authorFile,'"'+k+'"'+':'+JSON.stringify(v)+',');
});
fs.appendFileSync(authorFile,'}');

fs.appendFileSync(ageFile,'export default {')
ages.forEach(function(v,k){
    fs.appendFileSync(ageFile,'"'+k+'"'+':'+JSON.stringify(v)+',');
});
fs.appendFileSync(ageFile,'}');

fs.appendFileSync(shiFile,'export default {')
shis.forEach(function(v,k){
    fs.appendFileSync(shiFile,'"'+k+'"'+':'+JSON.stringify(v)+',');
});
fs.appendFileSync(shiFile,'}');