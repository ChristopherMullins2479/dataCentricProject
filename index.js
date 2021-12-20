//variables
var express = require('express')
var mySQLAcess = require('./mySQLAcess')
var mongoDBAcess = require('./mongoDBAcess')
var bodyParser = require('body-parser')

var app = express()

app.set('view engine','ejs')

app.use(bodyParser.urlencoded({extended: false}))

//sets up on port 3004
app.listen(3004,()=>{
    console.log("Port 3004 Listening")
})

//Returns the list to the main page
app.get('/',(req,res)=>{
    res.send(
        "<h1>Data centric Christopher Mullins</h1><ul><li>"+
        "<a href = http://localhost:3004/modules>List Modules</a></li>"+
        "<li><a href = http://localhost:3004/students>List Students</a></li>"+
        "<li><a href = http://localhost:3004/lecturers>List Lecturers</a></li>")
    
})

//rusns when Modules is selected
app.get('/modules',(req,res)=>{
    mySQLAcess.GetModules()
        .then((result)=>{
            res.render('showModules',{modules:result})
        })
        .catch((error)=>{
            res.send(error)
        })
})

//rusns when Students is selected
app.get('/students',(req,res)=>{
    mySQLAcess.GetStudents()
    .then((result)=>{
        res.render('showStudents',{students:result})
    })
    .catch((error)=>{
        res.send(error)
    })
})

//rusns when lecturers is selected
app.get('/lecturers',(req,res)=>{
    mongoDBAcess.getLecturers()
        .then((result)=>{
            res.render('showLecturers',{lecturers:result})
        })
        .catch((error)=>{
            res.send(error)
        })
})

//rusns when update is selected from modules list
app.get('/update/:moduleID',(req,res)=>{
    
    mySQLAcess.GetModule(req.params.moduleID)
    .then((result)=>{
        res.render('updateModule',{UpdateModule:result})
        console.log(result)
    })
    .catch((error)=>{
        console.log(error)
    })
})

//runs when student is deleted
app.get('/deleteStudent/:studentID',(req,res)=>{
    
    mySQLAcess.deleteStudent(req.params.studentID)
    .then((result)=>{
        console.log(result)
        res.send("<h1>Student: "+ req.params.studentID+" has been deleted</h1>"+"<a href = http://localhost:3004/students>Confirm</a>")
    })
    .catch((error)=>{
        console.log(error)
        res.send("<h1>Student: "+ req.params.studentID+" has assoicated modules he/she can not be deleted</h1>")
    })
})

//runs when user wats to add a student
app.get('/addStudent',(req,res)=>{
    res.render('addStudent')
})

//runs when user wants to add a lecturer
app.get('/addLecture',(req,res)=>{
    res.render('addLecture')
})

//runs whe user wats to add a student
app.post('/addStudent',(req,res)=>{
    mySQLAcess.addStudent(req.body.student_id,req.body.name,req.body.gpa)
    .then((result)=>{
        console.log(result)
        res.send("<h1>Student: "+ req.body.student_id+" has been added</h1>"+"<a href = http://localhost:3004/students>Confirm</a>")
    })
    .catch((error)=>{
        if(error.message.includes("23000")){
            res.send("<h1>"+req.body.student_id+" is already in the database</h1>")
        }
        else{
            console.log(error)
            res.send(error)
        }
        
    })
})

//runs when user wants to add a lecturer
app.post('/addLecture',(req,res)=>{
    mongoDBAcess.addLecture(req.body._id,req.body.name,req.body.dept)
        .then((result)=>{
            res.send("<h1>Lecturer: "+ req.body._id+" has been added</h1>"+"<a href = http://localhost:3004/lecturers>Confirm</a>")
            console.log(result)
        })
        .catch((error)=>{
            res.send(error)
        })
})

//runs whe user wants to update a module
app.post('/update',(req,res)=>{
   mySQLAcess.updateModule(req.body.module_id,req.body.name,req.body.credits)
   .then((result)=>{
       console.log(result)
       res.send("<h1>Module: "+ req.body.module_id+" has been added</h1>"+"<a href = http://localhost:3004/modules>Confirm</a>")
   })
   .catch((error)=>{
       console.log(error)
       res.send(error)
   })
})

//lists students in each module
app.get('/listStudentsInModule/:moduleID',(req,res)=>{
   
    mySQLAcess.GetStudentsInModule(req.params.moduleID)
    .then((result)=>{
        res.render('studentsModule',{studentsInModule:result})
        console.log(result)
    })
    .catch((error)=>{
        console.log(error)
    })
})
