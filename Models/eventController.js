const express = require("express");
const router = express.Router();
const validateToken = require("../middleWares/validateToken");
const eventModel = require("../Models/eventModel");
const admin = require("../middleWares/admin")


router.post("/create-event", validateToken,admin, async (req, res) => {
  try {
    const event = await eventModel.create(req.body);
    return res
      .status(201)
      .json({ message: "Event Created Successfully", event });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.put("/edit-event/:id", validateToken,admin, async (req, res) => {
  try {
    const event = await eventModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    return res.json({ message: "Event Updated Successfully", event });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.delete("/delete-event/:id", validateToken,admin, async (req, res) => {
  try {
    await eventModel.findByIdAndDelete(req.params.id);
    return res.json({ message: "Event Deleted Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/get-events", validateToken,admin, async (req, res) => {
  try {
    const event = await eventModel.find();
    return res.json({ data:event ,message: "Events Fetched Successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get("/get-events/:id",validateToken,admin,async(req,res)=>{
    try{
        const event =await eventModel.findById(req.params.id);
        // console.log(event)
        return res.json({ data:event });
    }catch(error){
        return res.status(500).json({ message: error.message });
    }
})
module.exports = router;