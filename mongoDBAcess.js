const mongoClient = require('mongodb').MongoClient;

const url = 'mongodb://localhost:27017';

const dbName = 'lecturersDB'
const colName = 'lecturers'

var lecturersDB
var lecturers


mongoClient.connect(url,{useNewUrlParser: true,useUnifiedTopology: true})
    .then((client) => {
        lecturersDB = client.db(dbName)
        lecturers = lecturersDB.collection(colName)
    })
    .catch((error)=>{
        console.log(error);
    })

var getLecturers = function(){
    return new Promise((resolve,reject)=>{
        var cursor = lecturers.find()
        cursor.toArray()
            .then((documents)=>{
                console.log(documents)
                resolve(documents)
            })
            .catch((error)=>{
                reject(error)
            })
    })
}

var addLecture = function(_id,name,dept){
    return new Promise((resolve,reject)=>{
        lecturers.insertOne({"_id":_id,"name":name,"dept":dept})
            .then((result)=>{
                console.log("test: "+dept)
                resolve(result)
            })
            .catch((error)=>{
                reject(error)
            })
    })
}

module.exports = {getLecturers,addLecture}