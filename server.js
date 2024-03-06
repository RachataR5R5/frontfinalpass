const express = require('express')
const axios = require('axios')
var bodyParser = require('body-parser')
const path = require('path');
const { env } = require('process');
const app = express();

const base_url = "http://localhost:3000"

app.set("views" , path.join(__dirname , "/public/views"))
app.set("view engine" , "ejs")
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended : false}))

app.use(express.static(__dirname + "/public"))






//employee
app.get("/employees" , async (req,res) => {
    try {
        const response = await axios.get(base_url+"/Employee/")
    res.render("employee/employees" , { employees : response.data })
    } catch(err) {
        res.status(500).send(err)
    }
    
})
app.get("/employees/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url+"/Employee/" + req.params.id)
        // const response2 = await axios.get("http://localhost:3000/shelve/search/" + req.params.id)
    res.render("employee/employee" , { employees : response.data  })
    } catch(err) {
        res.status(500).send(err)
    }
    
})
app.get("/employee/create" , async (req,res) => {
    try {
    res.render("employee/employeeCreate")
    } catch(err) {
        res.status(500).send(err)
    }
})
app.post("/employee/create" , async (req,res) => {
    try {
        const data = { Name : req.body.Name,
                       Position : req.body.Position,
                       DepartmentID : req.body.DepartmentID,}
        await axios.post(base_url + "/Employee/"  , data )
        res.redirect("/employees/")


    } catch(err) {
        res.status(500).send(err)
    }
    
})
app.get("/Employee/update/:id" , async (req,res) => {
    try {
        console.log("TRUE!!");
        const response = await axios.get(base_url+"/Employee/" + req.params.id)
        res.render("employee/employeeUpdate" , {employees : response.data})
    } catch(err) {
        res.status(500).send(err)
    }
    
})
app.post("/Employee/update/:id" , async (req,res) => {
    try {
        const data = { Name : req.body.Name,
            Position : req.body.Position,
            DepartmentID : req.body.DepartmentID,}
        await axios.put(base_url + "/Employee/" + req.params.id , data )
        res.redirect("/employees/")


    } catch(err) {
        res.status(500).send(err)
    }
    
})
app.get("/Employee/delete/:id" , async (req,res) => {
    try{
        await axios.delete(base_url + "/Employee/" + req.params.id)
        res.redirect("/employees")
    } catch(err){
        res.status(500).send(err)
    }

})

app.get("/" , async (req,res) => {
    try {
    res.render("index")
    } catch(err) {
        res.status(500).send(err)
    }
    
})



app.get("/departments" , async (req,res) => {
    try {
        const response = await axios.get("http://localhost:3000/Departments/")
    res.render("department/departments" , { departments : response.data })
    } catch(err) {
        res.status(500).send(err)
    }
    
})
app.get("/departments/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url+"/Departments/" + req.params.id)
        // const response2 = await axios.get("http://localhost:3000/shelve/search/" + req.params.id)
    res.render("department/department" , { departments : response.data  })
    } catch(err) {
        res.status(500).send(err)
    }
    
})
app.get("/Department/create" , async (req,res) => {
    try {
    res.render("department/departmentCreate")
    } catch(err) {
        res.status(500).send(err)
    }
})
app.post("/department/create" , async (req,res) => {
    try {
        const data = { Name : req.body.Name,
                        EmployeeID : req.body.EmployeeID,}
        await axios.post(base_url + "/Departments/"  , data )
        res.redirect("/departments/")


    } catch(err) {
        res.status(500).send(err)
    }
    
})
app.get("/department/update/:id" , async (req,res) => {
    try {
        console.log("TRUE!!");
        const response = await axios.get(base_url+"/Departments/" + req.params.id)
        res.render("department/departmentUpdate" , {departments : response.data})
    } catch(err) {
        res.status(500).send(err)
    }
    
})
app.post("/department/update/:id" , async (req,res) => {
    try {
        const data = { Name : req.body.Name,
            EmployeeID : req.body.EmployeeID,}
        await axios.put(base_url + "/Departments/" + req.params.id , data )
        res.redirect("/departments/")


    } catch(err) {
        res.status(500).send(err)
    }
    
})
app.get("/department/delete/:id" , async (req,res) => {
    try{
        await axios.delete(base_url + "/Departments/" + req.params.id)
        res.redirect("/departments")
    } catch(err){
        res.status(500).send(err)
    }

})




app.get("/tasks" , async (req,res) => {
    try {
        const response = await axios.get(base_url+"/Tasks/")
    res.render("Tasks/Tasks" , { Tasks : response.data })
    } catch(err) {
        res.status(500).send(err)
    }
    
})


app.get("/tasks/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url+"/Tasks/" + req.params.id)
    res.render("Tasks/Task" , { Task : response.data })
    } catch(err) {
        res.status(500).send(err)
    }
    
})


app.get("/task/create" , async (req,res) => {
    try {
    res.render("Tasks/Taskcreate")
    } catch(err) {
        res.status(500).send(err)
    }
    
})


app.post("/Task/create" , async (req,res) => {
    try {
        const data = { Description : req.body.Description , EmployeeID : req.body.EmployeeID , ProjectID : req.body.ProjectID}
        await axios.post(base_url + "/Tasks/"  , data )
        res.redirect("/Tasks/")


    } catch(err) {
        res.status(500).send(err)
    }
    
})





app.get("/Task/update/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url+"/Tasks/" + req.params.id)
        res.render("Tasks/Taskupdate" , {Task : response.data})
    } catch(err) {
        res.status(500).send(err)
    }
    
})

app.post("/Task/update/:id" , async (req,res) => {
    try {
        const data = { Description : req.body.Description , EmployeeID : req.body.EmployeeID , ProjectID : req.body.ProjectID }
        await axios.put(base_url + "/Tasks/" + req.params.id , data )
        res.redirect("/Tasks/")


    } catch(err) {
        res.status(500).send(err)
    }
    
})


app.get("/Tasks/delete/:id" , async (req,res) => {
    try{
        await axios.delete(base_url + "/Tasks/" + req.params.id)
        res.redirect("/Tasks")
    } catch(err){
        res.status(500).send(err)
    }

})






app.get("/books" , async (req,res) => {
    try {
        const response = await axios.get("http://localhost:3000/books/")
    res.render("books/books" , { books : response.data })
    } catch(err) {
        res.status(500).send(err)
    }
    
})


















app.get("/Projects" , async (req,res) => {
    try {
        const response = await axios.get(base_url+"/projects/")
    res.render("Projects/Projects" , { Projects : response.data })
    } catch(err) {
        res.status(500).send(err)
    }
    
})


app.get("/Projects/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url+"/Projects/" + req.params.id)
    res.render("Projects/Project" , { Project : response.data })
    } catch(err) {
        res.status(500).send(err)
    }
    
})


app.get("/Project/create" , async (req,res) => {
    try {
    res.render("Projects/Projectcreate")
    } catch(err) {
        res.status(500).send(err)
    }
    
})


app.post("/Project/create" , async (req,res) => {
    try {
        const data = { Name : req.body.Name ,  DepartmentID : req.body.DepartmentID}
        await axios.post(base_url + "/projects/"  , data )
        res.redirect("/Projects/")


    } catch(err) {
        res.status(500).send(err)
    }
    
})





app.get("/Project/update/:id" , async (req,res) => {
    try {
        const response = await axios.get(base_url+"/Projects/" + req.params.id)
        res.render("Projects/Projectupdate" , {Projects : response.data})
    } catch(err) {
        res.status(500).send(err)
    }
    
})

app.post("/Project/update/:id" , async (req,res) => {
    try {
        const data = { Name : req.body.Name , DepartmentID : req.body.DepartmentID }
        await axios.put(base_url + "/Projects/" + req.params.id , data )
        res.redirect("/Projects/")


    } catch(err) {
        res.status(500).send(err)
    }
    
})


app.get("/Projects/delete/:id" , async (req,res) => {
    try{
        await axios.delete(base_url + "/Projects/" + req.params.id)
        res.redirect("/Projects")
    } catch(err){
        res.status(500).send(err)
    }

})






app.get("/books" , async (req,res) => {
    try {
        const response = await axios.get("http://localhost:3000/books/")
    res.render("books/books" , { books : response.data })
    } catch(err) {
        res.status(500).send(err)
    }
    
})








app.listen(5500 , () => {
    console.log("Server start on port 5500")
})