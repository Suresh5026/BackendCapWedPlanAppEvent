const express = require("express");
const router = express.Router();
const validateToken = require("../middleWares/validateToken");
const Planmodel = require("../Models/Planevent");


router.post("/create-plan", validateToken, async (req, res) => {
    try {
      const plan = await Planmodel.create(req.body);
      return res
        .status(201)
        .json({ message: "Plan Created Successfully", plan });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  router.put("/edit-plan/:id", validateToken, async (req, res) => {
    try {
      const event = await Planmodel.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
      return res.json({ message: "Plan Updated Successfully", event });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  router.delete("/delete-plan/:id", validateToken, async (req, res) => {
    try {
      await Planmodel.findByIdAndDelete(req.params.id);
      return res.json({ message: "Plan Deleted Successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  router.get("/get-plan", validateToken, async (req, res) => {
    try {
      const plan= await Planmodel.find();
      return res.json({ data:plan ,message: "Events Fetched Successfully" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  });
  
  router.get("/get-plan/:id",validateToken,async(req,res)=>{
      try{
          const plan =await Planmodel.findById(req.params.id);
          // console.log(event)
          return res.json({ data:plan });
      }catch(error){
          return res.status(500).json({ message: error.message });
      }
  })
  module.exports = router;