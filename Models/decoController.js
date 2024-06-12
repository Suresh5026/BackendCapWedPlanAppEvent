const express = require("express");
const router = express.Router();
const validateToken = require("../middleWares/validateToken");
const Decoration = require("../Models/decoration");
const admin = require("../middleWares/admin")


router.post("/create-decoration", validateToken,admin, async (req, res) => {
    try {
      const decorate = await Decoration.create(req.body);
      return res
        .status(201)
        .json({ message: "Decoration Created Successfully", decorate });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  router.put("/edit-decoration/:id", validateToken,admin, async (req, res) => {
    try {
      const decorate = await Decoration.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.json({ message: "Decoration Updated Successfully", decorate });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  router.delete("/delete-decoration/:id", validateToken,admin, async (req, res) => {
    try {
      await Decoration.findByIdAndDelete(req.params.id);
      return res.json({ message: "Decoration Deleted Successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });

  router.get("/get-decoration", validateToken,admin, async (req, res) => {
    try {
      const decorate = await Decoration.find();
      return res.json({ data:decorate ,message: "Decoration Fetched Successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  router.get("/get-decoration/:id",validateToken,admin,async(req,res)=>{
      try{
          const decorate =await Decoration.findById(req.params.id);
          // console.log(event)
          return res.json({ data:decorate });
      }catch(error){
          return res.status(500).json({ message: error.message });
      }
  })

  module.exports = router;