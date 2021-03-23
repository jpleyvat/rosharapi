const router = require("express").Router();
// const db = require("../db.json");
const Character = require("../model/Character");

// ----------#----------#----------#----------#----------#----------#----------#
// Get characters
router.get("/:id?/", async (req, res) => {
  // Get id if present
  const id = req.param("id");

  // Fetch data
  const data = id ? await Character.find({ id: id }) : await Character.find({});

  // Response
  res.send({ status: 200, data: data });
});

// ----------#----------#----------#----------#----------#----------#----------#
// Post character
router.post("/create", async (req, res) => {
  // Check if character exists
  const fullnameExists = await Character.findOne({
    fullname: [req.body.first_name, req.body.last_name].join(" "),
  });
  if (fullnameExists)
    // Character exists
    return res.status(400).send("This character already exists.");

  // Create fullname
  const fullname = [req.body.first_name, req.body.last_name].join(" ");

  // Check if id already exists
  const idExists = await Character.findOne({ id: req.body.id });
  if (idExists) {
    // Increment all ids in 1
    await Character.updateMany(
      { id: { $gte: req.body.id } },
      { $inc: { id: 0.5 } },
      (err, res) => {
        // Error;
        if (err)
          return res.send(
            "That id already exists and could not be handled.",
            err
          );
      }
    );
  }

  // Create new character
  const character = new Character({ fullname: fullname, ...req.body });

  // Save character
  try {
    const saveCharacter = await character.save();
    res.send({ status: 200, data: saveCharacter });
  } catch (err) {
    // Error;
    res.status(400).send(err);
  }
});

// ----------#----------#----------#----------#----------#----------#----------#
// Update character
router.post("/update/:id", async (req, res) => {
  const id = req.param("id");
  try {
    const updated = await Character.updateOne({ id: id }, { ...req.body });
    res.status(200).send({ data: updated });
  } catch (err) {
    res.status(400).send(err);
  }
});

// ----------#----------#----------#----------#----------#----------#----------#
// Delete character
router.post("/delete/:id", async (req, res) => {
  const id = req.param("id");
  res.status(200);
});

module.exports = router;
