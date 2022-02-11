const User = require("../models/user")
const bcrypt= require("bcrypt")
const jwt= require("jsonwebtoken")

const register = async(req,res) =>  {
    const body= req.body


    const user= await User.create({
        name: body.name,
        lastName: body.lastName,
        userName: body.userName,
        password: bcrypt.hashSync(body.password,10)
    })
 res.json(user)
 
 
} 


const login = async(req,res) =>{
    //obtener usuario y contraseña
    const {userName,password}=req.body

    //busqueda del usuario
    const user=await User.findOne({
        userName: userName
    })
    if (!user){
        return res.status(404).json({
            msg:"usuario no encontrado"
        })
    }

    //comparar contraseñas
    let iguales= bcrypt.compareSync(password,user.password)
    if (!iguales) {
        return res.status(402).json({
            msg:"contraseña incorrecta"
        })
    }

    //crear token

    const token= jwt.sign({name:user.name,lastName:user.lastName},"holaxd")
    res.json({

        token,
        user
    })



}



module.exports= {
    login,
    register
}