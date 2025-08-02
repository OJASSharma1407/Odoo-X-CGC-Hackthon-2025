const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../models/Notes");
const { body, validationResult } = require("express-validator");


//ROUTE1: GET ALL NOTES. login required
router.get('/fetch-all-notes', fetchuser, async (req, res) => {
  console.log('Token verified for user:', req.user);
  console.log('Header auth-token:', req.header('auth-token'));
  console.log('Decoded user:', req.user); // ✅ check what this prints
  try {
    const notes = await Notes.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error('Error fetching notes:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//ROUTE2: ADD NOTES. login required
router.post("/add-notes",[
    body('title',"The title should be at least three characters").isLength({min:3}),
    body('description', "enter the description")
],fetchuser,async (req,res)=>{
     const errors = validationResult(req);
     if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
     }

     try{
         const {title,description,tag} = req.body;
         const note = new Notes({
            title,description,tag,user:req.user.id
         });
         const saveNote = await note.save();
         res.json(saveNote);
         
     }catch(err){
        res.satus(500).send('Internal server error');
     }

})


//ROUTE3: UPDATE THE NOTES. login required

router.put('/update-notes/:id',[
    body('title',"The title should be at least three characters").isLength({min:3}),
    body('description', "enter the description")
],fetchuser,async (req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const {title,description,tag} = req.body;

    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};
    
    let note = await Notes.findById(req.params.id);
    if(!note){return res.status(404).send("Not found");}
    if(note.user.toString() !== req.user.id){
      return res.status(401).send("Not Allowed");
    }

    note = await Notes.findByIdAndUpdate(req.param.id,{$set:newNote},{new:true});
    res.json(note);
})

//ROUTE4: DELETE NOTE . login requied

router.delete('/delete-notes/:id',fetchuser,async (req,res)=>{
  let note = await Notes.findById(req.params.id);
  if(!note){return res.status(404).send("Not found");}
  if(note.user.toString() !== req.user.id){
    return res.status(401).send("Not Allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id);
  res.json({ success: "Note deleted successfully", note });
})

module.exports = router;
