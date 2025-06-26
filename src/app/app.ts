import express, { Application, Request, Response } from "express";
import mongoose, { Schema } from "mongoose";
const app:Application=express();
app.use(express.json())
const noteSchema=new Schema({
    title:String,
    content:String
})

const Note = mongoose.model('Note',noteSchema);
app.post('/create-note',async(req:Request,res:Response)=>{
    const myNote = new Note({
        title:"Learning Mongoose!",
        content:"I am learning Mongoose."
    })
    await myNote.save()
    res.status(201).json({success:true,message:"Note created successfully!",note:myNote})
})

const userSchema=new Schema({
    name:String,
    email:String,
    createdAt:{
        type:Date,
        default:Date.now
    }
})
const userNote = mongoose.model("userNote",userSchema)
app.post("/create-userNote",async(req:Request,res:Response)=>{
    const user=new userNote({
        name:"Ayesha",
        email:"ayesha@gmail.com"
    })
    await user.save()
    res.status(201).json(
        {
            success:true,
            message:"User note created successfully!",
            note:user
        }
    )
})
//enum is a field of predefined list of options
const appSchema=new Schema({
title:{type:String,required:true,trim:true},
content:{type:String,default:''},
category:{
    type:String,
    enum:["personal","work","study","other"],
    default:"personal"
},
pinned:{
    type:Boolean,
    default:false
},
tags:{
    label:{type:String,required:true},
    color:{type:String,default:'Green'}
}

})
const appNoteSchema=mongoose.model("appNoteSchema",appSchema)
app.post('/create-advanced-note',async(req:Request,res:Response)=>{
    //approach1
    const advancedNote = new appNoteSchema({
        title:"Learning Node",
        tags:{
            label:'database'
        }
    })
    await advancedNote.save()
    res.status(201).json({
        success:true,message:"Advanced note created successfully.",note:advancedNote
    })
})
app.post('/note/create-advanced-note',async(req:Request,res:Response)=>{
    const body=req.body;
    const note = await appNoteSchema.create(body)
    res.status(201).json({
        success:true,message:"Advanced note created successfully.",note:note
    })
})
app.get('/notes',async(req:Request,res:Response)=>{
    const notes = await appNoteSchema.find();
 res.status(201).json({
        success:true,message:"Advanced note created successfully.",note:notes
    })})

app.get('/notes/:noteId',async(req:Request,res:Response)=>{
    const noteId = req.params.noteId
    // const note= await appNoteSchema.findById(noteId)
    const note =await appNoteSchema.findOne({_id:noteId})
     res.status(201).json({
        success:true,message:"Advanced note created successfully.",note
    })

})    

app.get('/',(req:Request,res:Response)=>{
    res.send('Welcome to Note App!')
})
export default app;