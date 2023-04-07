const sql = require('msnodesqlv8');

const connectionString = 'Server=localhost;Database=Arpan;Trusted_Connection=yes;Driver={SQL Server Native Client 11.0}';

module.exports = {
    connect: (callback) => {
        sql.open(connectionString, callback);
    },
    query: (query, callback) => {
        sql.query(connectionString, query, callback);
    }
};
