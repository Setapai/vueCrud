import express from 'express';
import collection from '../config/firebase.js';
import firebase from 'firebase';

let collectionTable = collection('inventory');

const router = express.Router();
// getAllCollection
router.post('/', async (req, res) => {
    try {
        const data = req.body;
        const request = await collectionTable.where('userId','==',data.id).get();
        const list = request.docs.map((doc) =>
            ({ id: doc.id, ...doc.data() }))
        res.send({ data: list, msg: 'Success', status: 200 })
    } catch (error) {
        res.send({ data: false, msg: error, status: 400 })
    }

});
// search
router.post('/search', async (req, res) => {
    try {
        const data = req.body;
        const field = !data.field ? firebase.firestore.FieldPath.documentId() : data.field
        const request = await collectionTable
            .orderBy(field).startAt(data.search).endAt(data.search + '\uf8ff').get()
            const list = request.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            var filter = "userId";
            var keyword = data.id;
    
            var filteredData = list.filter(function (obj) {
                return obj[filter] === keyword;
            });
        res.send({ data: filteredData, msg: 'Success', status: 200 })
    } catch (error) {
        res.send({ data: false, msg: error, status: 400 })
    }

});

// addSingleItem
router.post('/add',async (req, res) => {
    try {
        const data = req.body;
        await collectionTable.add(data)
        res.send({ data: true, msg: 'Success', status: 200 })
    } catch (error) {
        res.send({ data: false, msg: error, status: 400 })

    }
});
// update
router.post('/update',async (req, res) => {
    try {
        const id = req.body.id;
        delete req.body.id;
        await collectionTable.doc(id).update(req.body);
        res.send({ data: true, msg: 'Success', status: 200 })
    } catch (error) {
        res.send({ data: false, msg: error, status: 400 })

    }
});
// delete
router.post('/delete',async (req, res) => {
    try {
        const id = req.body.id;
        await collectionTable.doc(id).delete();
        res.send({ data: true, msg: 'Success', status: 200 })
    } catch (error) {
        res.send({ data: false, msg: error, status: 400 })

    }
});

// addMultiItem
// router.post('/addMulti/:data', (req, res) => {
//     const data = req.body;
//     data.forEach(value => {
//         userSchema.add(value);
//     });
//     res.send({ msg: 'Success', status: res.status(200) })
// });


export default router