// importing the dependencies
import express from "express";
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import routes from './v1/routes/routes';
import nconf from "nconf";
import path from "path";


nconf.argv()
    .env()
    .file({
        file: path.resolve("config.json")
    });



// defining the Express app
const app = express();

// adding Helmet to enhance your API's security
app.use(helmet());

// using bodyParser to parse JSON bodies into JS objects
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

// enabling CORS for all requests
app.use(cors());

// adding morgan to log HTTP requests
app.use(morgan('combined'));

app.get('/ping', (req, res) => {
    res.send(`{
        "status": "OK",
        "status_code": 200  
    }`);
})



app.use('/api/v1/', routes);

// app.listen(nconf.get("PORT") || "3001", () => {
//     console.log('listening on port 3001');
// });

export default app