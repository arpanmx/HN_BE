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

function updateRubricScores(userId, reviewer, q1Score, q2Score, q3Score, q4Score, callback) {
  const spName = 'UpdateRubricScores';
  
  db.connect((err, conn) => {
    if (err) {
      return callback("berr");
    }

    const pm = conn.procedureMgr();
    pm.get(spName, (proc) => {
      const params = {
        UserID: userId,
        Reviewer: reviewer,
        Score1: q1Score,
        Score2: q2Score,
        Score3: q3Score,
        Score4: q4Score
      };

      proc.call(params, (err, results) => {
        console.log(err)
        callback(err, results);
      });
    });
  });
}




  module.exports = {
    executeEssayAppReg,
    getUserIDs,
    fetchEssayAndScores,
    updateRubricScores
  };
  