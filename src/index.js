const app = require('./app');
const db = require('./config/db');

db.connect((err) => {
    if (err) {
        console.error('Error connecting to MSSQL server:', err);
        process.exit(1);
    } else {
        console.log('Connected to MSSQL server');
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
