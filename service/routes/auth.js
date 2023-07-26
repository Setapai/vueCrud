import express from 'express';
import collection from '../config/firebase.js';
import bcrypt from 'bcrypt';

let collectionTable = collection('users');

const router = express.Router();
//loginWithAuth
router.post('/login', async (req, res) => {
    try {
        const data = req.body;
        if (data.username !== '' && data.password !== '') {
            const request = await collectionTable
                .where('username', '==', data.username).get();
            request.docs.length !== 0 ?
                request.docs.map((doc) => {
                    bcrypt.compare(data.password, doc.data().password, function (err, result) {
                        const list = result ? { id: doc.id, username: doc.data().username } : []

                        list.length !== 0 ?
                            res.send({ data: list, msg: 'Account Found', status: 200 }) :
                            res.send({ data: false, msg: 'Account not found', status: 400 })
                    });
                }) : res.send({ data: false, msg: 'Account not found', status: 400 });
        } else {
            res.send({ data: false, msg: 'Account not found', status: 400 })
        }

    } catch (error) {
        res.send({ data: false, msg: error, status: 400 })
    }
});

// signUp
router.post('/register', async (req, res) => {
    try {
        const data = req.body;
        if (data.username !== '' && data.password !== '') {
            const request = await collectionTable
                .where('username', '==', data.username).get();
            const list = request.docs.map((doc) => ({ id: doc.id }));
            list.length !== 0 ?
                res.send({ data: false, msg: 'Username Already Exist', status: 409 }) :
                bcrypt.hash(data.password, parseInt(process.env.SALT_ROUNDS), async function (err, hash) {
                    data.password = hash;
                    await collectionTable.add(data)
                    res.send({ data: data, msg: 'Success', status: 200 })
                });
        } else {
            res.send({ data: false, msg: 'Account not found', status: 400 })
        }

    } catch (error) {
        res.send({ data: false, msg: error, status: 400 })

    }
});

// auth0Login
router.post('/auth0', async (req, res) => {
    try {
        const data = req.body;
        const request = await collectionTable
            .where('username', '==', data.email +'_google.com').get();
        request.docs.length !== 0 ?
            //Login 
            request.docs.map((doc) => {
                    const list = { id: doc.id, username: doc.data().username }
                    res.send({ data: list, msg: 'Account Found', status: 200 })
            }) : await collectionTable.add({username:data.email+'_google.com'}).then((req)=>{
                res.send({ data: {id:req.id,username:req.username}, msg: 'account created', status: 200 });
            })
    } catch (error) {
        res.send({ data: false, msg: error, status: 400 })
    }
});

export default router