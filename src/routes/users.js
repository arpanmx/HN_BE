const express = require('express');
const router = express.Router();
const userService = require('../services/essayService');

router.put('/reg', (req, res) => {
    const user = req.body;
  
    userService.executeEssayAppReg(user.essayId, user.userId, user.firstName, user.lastName, user.essay, user.username, user.password, (err, result) => {
      if (err) {
        res.status(500).send(err);
      } else {
        res.status(200).send('User updated successfully');
      }
    });
  });
  

module.exports = router;
