const express = require("express");
const router = express.Router();
const Neighborhood = require("../models/Neighborhood");

router.post("/match", async(req, res) => {
  
  const greenery = Number(req.body.greenery);
  const traffic = Number(req.body.traffic);
  const budget = Number(req.body.budget);
  const temple = Number(req.body.temple);
  const park = Number(req.body.park);
  const roadSize = Number(req.body.roadSize);
  const gym = Number(req.body.gym);

  try {
    const neighborhoods = await Neighborhood.find();

    let bestMatch = null;
    let bestScore = Number.MAX_SAFE_INTEGER;

    for (const n of neighborhoods) {
      let score = 0;
      if (greenery) score += Math.abs(n.greenery - greenery);
      if (traffic) score += Math.abs(n.traffic - traffic);
      if (budget) score += Math.abs(n.budget - budget);
      if (temple) score += Math.abs(n.temple - temple);
      if (park) score += Math.abs(n.park - park);
      if (roadSize) score += Math.abs(n.roadSize - roadSize);
      if (gym) score += Math.abs(n.gym - gym);

      if (score < bestScore) {
        bestScore = score;
        bestMatch = n;
      }
    }

    if (bestMatch) {
      res.json({ name: bestMatch.name });
    } else {
      res.status(404).json({ message: "No match found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err });
  }
});

module.exports = router;

