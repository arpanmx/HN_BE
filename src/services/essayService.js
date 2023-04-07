const sql = require('msnodesqlv8');
const db = require('../config/db');

function executeEssayAppReg(essayId, userId, firstName, lastName, essay, username, password, callback) {
  const query = 'EXEC dbo.EssayAppReg @Essay_ID, @UserID, @FirstNameConfirming, @LastNameConfirming, @HN_Essay, @Username, @Password';
  const params = [
    { name: 'Essay_ID', type: sql.Int, value: essayId },
    { name: 'UserID', type: sql.Int, value: userId },
    { name: 'FirstNameConfirming', type: sql.VarChar, value: firstName },
    { name: 'LastNameConfirming', type: sql.VarChar, value: lastName },
    { name: 'HN_Essay', type: sql.VarChar, value: essay },
    { name: 'Username', type: sql.VarChar, value: username },
    { name: 'Password', type: sql.VarChar, value: password }
  ];

  db.connect((err, conn) => {
    if (err) {
      return callback(err);
    }

    conn.query(query, params, (err, result) => {
      callback(err, result);
    });
  });
}


function getUserIDs(callback) {
  const query = 'EXEC dbo.GetUserIDs';

  db.query(query, (err, result) => {
    callback(err, result);
  });
}

//Change to parameterized
function fetchEssayAndScores(userID, callback) {
  const query = `EXEC dbo.FetchEssayAndScores @UserID = ${userID}`;

  db.query(query, (err, result) => {
    callback(err, result);
  });
}

function updateRubric(userID, reviewer, score1, score2, score3, score4, callback) {
  const query = 'EXEC dbo.UpdateRubricScoresAndReviewer @UserID, @Reviewer, @Score1, @Score2, @Score3, @Score4';
  const params = [
      { name: 'UserID', type: sql.Int, val: userID },
      { name: 'Reviewer', type: sql.VarChar, val: reviewer },
      { name: 'Score1', type: sql.Int, val: score1 },
      { name: 'Score2', type: sql.Int, val: score2 },
      { name: 'Score3', type: sql.Int, val: score3 },
      { name: 'Score4', type: sql.Int, val: score4 }
  ];
  db.query(query, params, (err, result) => {
      callback(err, result);
      console.log("Mondal")
  });
}


  module.exports = {
    executeEssayAppReg,
    getUserIDs,
    fetchEssayAndScores,
    updateRubric
  };
  