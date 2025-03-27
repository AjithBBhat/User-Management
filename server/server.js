const express = require('express')
const bodyParser = require('body-parser')

const app = express()
//middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

const port = 3000

// Sample Users Data
let users = [
    { userUniqueId: "1", userName: "Aditya Gupta", userEmail: "aditya@gmail.com", userAge: "22" },
    { userUniqueId: "2", userName: "Vanshita Jaiswal", userEmail: "vanshita@gmail.com", userAge: "21" },
    { userUniqueId: "3", userName: "Sachin Yadav", userEmail: "sachin@gmail.com", userAge: "22" }
];

//get all
app.get('/', (req, res) => res.send(users))
//add user
app.post("/",(req,res)=>{
   const newUser = {
    userUniqueId : (users.length+1).toString(),
    userName: req.body.userName, userEmail: req.body.userEmail, userAge: req.body.userAge
    }
    users.push(newUser)
    res.send(users)
})
//get one user 
app.get("/:id",(req,res)=>{
    const userUniqueId = req.params.id   
    let foundUser = null;
    users.forEach(user=>{
        if(user.userUniqueId === userUniqueId){
            foundUser = {userUniqueId: userUniqueId, userName: user.userName, userEmail: user.userEmail, userAge: user.userAge}
        }
    })
     res.send(foundUser || {message: " User not found"})
 })
//update
app.post("/:id",(req,res)=>{
    const userUniqueId = req.params.id   
    let foundUser = false;
   users =  users.map(user=>{
        if(user && user.userUniqueId === userUniqueId){
            foundUser = true
            return {
                ...user,
                userName: req.body.userName,
                userEmail: req.body.userEmail,
                userAge: req.body.userAge
            }      
        }
        return user
    })
    if (foundUser) {
        res.send({ message: "User updated successfully" });
    } else {
        res.send({ message: "User not found" });
    }
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))