const express = require('express');
const router = express.Router();
const essayService = require('../services/essayService');

router.get('/getUserID', (req, res) => {
  essayService.getUserIDs((err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.json(result);
  });
});

router.get('/fetch/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
  
    essayService.fetchEssayAndScores(userId, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json(result);
      }
    });
  });
  
// In your essayRoutes.js file

router.put("/updateRubricScores/:userId", (req, res) => {
    const userId = parseInt(req.params.userId);
    console.log(req.body)
    const { reviewer, score1, score2, score3, score4 } = req.body;
    console.log(reviewer, score1, score2, score3, score4);
  
    essayService.updateRubricScores(userId, reviewer, score1, score2, score3, score4, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).json({ message: "Rubric scores updated successfully." });
      }
    });
  });
  


module.exports = router;