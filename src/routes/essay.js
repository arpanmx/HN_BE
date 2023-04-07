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

router.put('/updateRubric/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const { reviewer, score1, score2, score3, score4 } = req.body;

    if (
        typeof reviewer !== 'string' ||
        typeof score1 !== 'number' ||
        typeof score2 !== 'number' ||
        typeof score3 !== 'number' ||
        typeof score4 !== 'number'
    ) {
        return res.status(400).json({ error: 'Invalid input data' });
    }
    console.log("Arpan")
    essayService.updateRubric(
        userId,
        reviewer,
        score1,
        score2,
        score3,
        score4,
        (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'Error updating the database' });
            }
            res.status(200).json({ message: 'Rubric scores and reviewer updated successfully' });
        }
    );
});


module.exports = router;