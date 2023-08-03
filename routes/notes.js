const express = require('express');
const router = express.Router();
const fetchuser = require('../middlewares/fetchuser')
const Note = require('../models/Note')
const { check, validationResult } = require('express-validator');


//rouute 1 fetch all notes login required
router.get('/fetchallnotes',fetchuser,async(req,res) => {
    try {
        const notes = await Note.find({user:req.user.id});
        res.json(notes)
    } catch (error) {
        console.error(error);
        res.status(500).send("some error occured")
    }
})


//route 2 adding the notes in db login required
router.post('/addnote',fetchuser,[
    check('title','enter a valid title').isLength({min:1})
],async(req,res) => {
    try {
 
    const {title,description,tag}=req.body;

    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({error:error.array()})
    }

    const note = new Note({
        title,description,tag,user:req.user.id
    })
    // console.log(req.user)

    const savenote = await note.save()

res.json(savenote)
       
} catch (error) {
    console.error(error);
    res.status(500).send("some error occured")
}
})

//updating an existing node login required
router.put('/updatenote/:id',fetchuser,async(req,res) => {
    try {
        
    
    const {title ,description,tag} = req.body;
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //finding and updaing the specific note 

    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("note not found")
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send(" action not allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set : newNote}, {new : true})
    res.json({note});
} catch (error) {
     console.error(error.message)
     res.status(500).send("internal server error")   
}
})

//deleting an existing note 
router.delete('/deletenote/:id',fetchuser,async(req,res) => {
    try {
        
    let note = await Note.findById(req.params.id);
    if(!note){
        return res.status(404).send("note not found");
    }
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("action not allowed")
    }

    note = await Note.findByIdAndDelete(req.params.id);
    res.json({"success":"note has been deleted"});
} catch (error) {
        console.error(error.message)
        res.status(500).send("internal server error")
}
})



module.exports = router;