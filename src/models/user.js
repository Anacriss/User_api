const {Schema,model}= require('mongoose')


const userSchema= new Schema({
    name: String, 
    lastName: String,
    userName: String,
    password: String,
    role:{
        type: String,
        enum:['ADMIN','CLIENT']
    }

})

const User=model("user",userSchema)

module.exports=User