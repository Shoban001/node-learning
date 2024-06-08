const fsPromises = require('node:fs/promises')
const fs = require('fs')
const path = require('path')
const {format} = require('date-fns');
const {v4 : uuid} = require('uuid');

const makeDir = async() => {
    try{
        if(fs.existsSync(path.join(__dirname,'new'))){
            fsPromises.rmdir(path.join(__dirname,'new'))
            console.log('Folder is Already Exists!');
        }else{
            fsPromises.mkdir(path.join(__dirname,'new'))
            console.log('Folder is Created')
        }
    }catch(err){
        console.error(err);
    }finally{

    }
}

// makeDir();

const logEvents = async (msg) => {
    const logData = {
        message : msg,
        createdAt : format(new Date(),'dd/mm/yyyy hh:mm:ss'),
        uniqueId : uuid()
    }
    try{
        const res = await fsPromises.appendFile(path.join(__dirname,'new','MsgData.json'), JSON.stringify(logData));
        console.log('Data was Appended...!',res)
    }catch(err){
        console.error(err);
    }finally{

    }
}

module.exports = {logEvents};

// logEvents('how is your day?')

process.on('uncaughtException',(err)=>{
    console.log(`There was an UncaughtException occurs ${err}`);
    process.exit(1);
})

