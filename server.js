const fs = require('fs')
const path = require('path')

const FileStream = async() => {
    try{
        const data = await fs.readFile(path.join(__dirname,'files','start.txt'),'utf8')
        console.log("Data:",data);
        await fs.writeFile(path.join(__dirname,'files','backend-learning.txt'),"I'm just started to learn a backend developing using node js and mango db....")
        console.log('Write Operation Complete')
        await fs.appendFile(path.join(__dirname,'files','backend-learning.txt'),"\nIt's my Code for updating the filesystem")
        console.log('Text Appended...')
        setTimeout(()=>{
            fs.rename(path.join(__dirname,'files','backend-learning.txt'),path.join(__dirname,'files','mern-learning.txt'))
            console.log('File was renamed...');
        },5000);
        setTimeout(()=>{
            fs.unlink(path.join(__dirname,'files','mern-learning.txt'))
            console.log('File was deleted...');
        },10000)
    }catch(err){
        console.error(err)
    }finally{
        console.log('The Function was ended....');
    }
}

const FileFunction = async() => {
    try{
        const rf = await fs.createReadStream(path.join(__dirname,'files','bigfile.txt'),{encoding:'utf8'})
        const wf = await fs.createWriteStream(path.join(__dirname,'files','new-bigfile.txt'))
        setTimeout(()=>{
            rf.pipe(wf);
        },10000);
    }catch(err){
        console.error(err)
    }finally{
        console.log('End of Function');
    }
}

FileFunction();

process.on('uncaughtException', (err) => {
    console.error(`There was an UncaughtException: ${err}`);
    process.exit(1);
})

