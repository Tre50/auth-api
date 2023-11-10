import jwt from "jsonwebtoken";
import { db } from "./dbConnect.js";
import { secretKey } from "./creds.js";

const coll = db.collection('users');

export async function createUser(req, res) {
    const { email, password } = req.body
    if(!email || !password || email.length < 6 || password.length < 6) {
        res.status(400).send
({ message: 'invalid user'});
    }   await coll.add({ email: email.toLowerCase(), password})// TODO: HASH PASSWORD
    login(req, res);
    //SEND SOMETHING BACK ??
}

export async function login(req, res) {

    const {email, password } = req.body;
    const userColl = await coll.where ('email', '==', email.toLowerCase())
                                .where('password', '==', password)
                                .get()
    const user = userCol.docs.map(doc => ({ id: doc.id, ...doc.data()})) [0]
   if(!user) {
res.status(400).send({ messages: 'Not Athorized; missing or bad email or passworde.'})

   }
    delete user.password;//remove PASSWORD FROM USER OBJECT
    const token = jwt.sign(user, secretKey);

    res.send({ token })

}


