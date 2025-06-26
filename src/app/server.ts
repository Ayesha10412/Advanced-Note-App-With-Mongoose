import {Server} from 'http'
import app from './app';
import mongoose from 'mongoose';

let server:Server ;
const Port =5000;
async function main(){
    try{
    await mongoose.connect('mongodb+srv://Practice:JbSutunp5HzJndRr@cluster0.i7pwp.mongodb.net/advanced-note-app?retryWrites=true&w=majority&appName=Cluster0');
    console.log("Connecting to mongodb using mongoose.")
server =app.listen(Port,()=>{
    console.log(`App is listening on port ${Port}`)
})
    }catch(error){
        console.log(error);
    }
}
main()