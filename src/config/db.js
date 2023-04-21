const sql = require('msnodesqlv8');

// const connectionString = 'Server=localhost;Database=Arpan;Trusted_Connection=yes;Driver={SQL Server Native Client 11.0}';
const connectionString = "server=tcp:conuwmaa.database.windows.net,1433;Database=HN2;UID=langdc;PWD=!Fuck123!;Driver={SQL Server Native Client 11.0};Encrypt=yes";

module.exports = {
    connect: (callback) => {
        sql.open(connectionString, callback);
    },
    query: (query, callback) => {
        sql.query(connectionString, query, callback);
    }
};
