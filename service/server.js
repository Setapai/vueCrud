import express from 'express';
import dotenv from "dotenv";
import inventoryRouter from './routes/inventory.js';
import authRouter from './routes/auth.js';
import { auth } from 'express-openid-connect';
import bodyParser from 'body-parser';
import cors from 'cors';

dotenv.config()
const app = express();
// auth0
const config = {
    authRequired: false,
    auth0Logout: true,
    secret: process.env.AUTH0_SECRET,
    baseURL: process.env.BASE_URL,
    clientID: process.env.AUTH0_CLIENT,
    issuerBaseURL: process.env.AUTH0_DOMAIN
};



app.use(auth(config));
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors({ origin: ['http://localhost:8080'], }))
app.use('/inventory', inventoryRouter);
app.use('/users', authRouter);

app.get('/', (req, res) => {
    res.send(req.oidc.isAuthenticated() ? 'Logged in' : 'Logged out');
});

app.listen(3000, () => {
    console.log('port is running at 3000')
})