const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT || 3000;
const CORSURL = process.env.CORSURL || "http://localhost:4200";

// Habilita CORS para todas las rutas
const corsOptions = {
    origin: CORSURL,
    optionsSuccessStatus: 200
};
console.log(`CORS URL: ${CORSURL}`);

app.use(cors(corsOptions));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

// parse application/json
app.use(bodyParser.json())

// Configuring the database
const dbConfig = require('../config/database.config.js');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

// Connecting to the database
mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then(() => {
    console.log("Conectado exitosamente a la base de datos");
}).catch(err => {
    console.log('No se pudo conectar a la base de datos. Saliendo ...', err);
    process.exit();
});

// require('../routes/category.routes')(app);
['category', 'job', 'carousel', 'contract', 'workingDay', 'province', 'auth', 'companyProfile'].forEach(
    route => require(`../routes/${route}.routes`)(app)
);

require('../routes/auth.routes')(app);
require('../routes/companyProfile.routes')(app);
require('../routes/comment.routes')(app);
require('../routes/inscription.routes')(app);

app.listen(PORT, () => {
    console.log(`Servidor Express en el puerto ${PORT}`);
});