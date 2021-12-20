//variables
var mySQL = require('promise-mysql')
var pool

//creates the sql pool
mySQL.createPool({
    connectionLimit : 3,
    host            : 'localhost',
    user            : 'root',
    password        : '',
    database        : 'collegedb'
})
.then((result)=>{
    pool = result
})
.catch((error)=>{
    console.log(error)
});

//function to get Modules
var GetModules = function(){
    return new Promise((resolve,reject)=>{
        pool.query('select * from module')
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
            console.log("Error: "+error)
        })
    })
}

//will get the module selected
var GetModule = function(moduleID){
return new Promise((resolve,reject)=>{
    pool.query(" select * from module where mid ='"+moduleID+"'")
    .then((result)=>{
        resolve(result)
    })
    .catch((error)=>{
        reject(error)
        console.log("Error: "+error)
    })
})
}

//function to list students
var GetStudents = function(){
    return new Promise((resolve,reject)=>{
        pool.query('select * from student')
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
            console.log("Error: "+error)
        })
    })
}

var GetStudentsInModule = function(moduleID){
    return new Promise((resolve,reject)=>{
        pool.query("select s.sid, s.name,m.mid from student_module m join student s on s.sid = m.sid and m.mid = '"+moduleID+"'")
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
            console.log("Error: "+error)
        })
    })
}

//adds student
var addStudent = function(studentID,studentName,studentGPA){
    return new Promise((resolve,reject)=>{
        let query = {
            sql: "INSERT INTO student (sid, name, gpa)VALUES(?,?,?)",
            values: [studentID,studentName,studentGPA]
        }
        pool.query(query)
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
            console.log("Error: "+error)
        })
    })
}

//deletes selected student
var deleteStudent = function(studentID){
    return new Promise((resolve,reject)=>{
        pool.query("DELETE FROM student WHERE sid ='"+studentID+"'")
        .then((result)=>{
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
            console.log("Error: "+error)
        })
    })
}

//update module
var updateModule = function(moduleID,moduleName,moduleCredits){
    return new Promise((resolve,reject)=>{
        let query = {
            sql: "UPDATE module SET mid = ?, name = ?, credits = ? WHERE mid = ?",
            values:[moduleID,moduleName,moduleCredits,moduleID]
        }
        pool.query(query)
        .then((result)=>{
            console.log(result)
            resolve(result)
        })
        .catch((error)=>{
            reject(error)
            console.log(error)
        })
    })
}

module.exports = {GetModules,GetStudents,GetStudentsInModule,GetModule,deleteStudent,addStudent,updateModule}