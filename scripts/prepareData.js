var shi = require('./../asset/shiwen');

var fs = require('fs');
var path = require('path');

var assetPath = path.relative('./','app/asset');

var authorFile = path.join(assetPath,'author.js');
var ageFile = path.join(assetPath,'age.js');
var shiFile = path.join(assetPath,'shi.js');
var versionFile = path.join(assetPath,'assetversion.js');

try{
    fs.unlinkSync(authorFile);
    fs.unlinkSync(ageFile);
    fs.unlinkSync(shiFile);
    fs.unlinkSync(versionFile);
} catch(e){

}


var id = 0;

var authors = new Map();
var ages = new Map();

var shis = [];


shi.forEach(function (item) {
    var author = item.author;
    var age = item.age;
    var innerid = 'shi_' + id++;
    item.innerid = innerid;

    shis.push(item);

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

fs.appendFileSync(shiFile,'var list = ');

fs.appendFileSync(shiFile,JSON.stringify(shis,null,'\t'));

fs.appendFileSync(shiFile,'; \r\nfunction release(){list = null} \r\n function get(){return list}\r\n export default {release,get}');
fs.writeFileSync(versionFile,'export default version = '+Date.now());