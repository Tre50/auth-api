export async function isAuthenticated(req, res, next) {
    //FIRST CHECK IF THEY HAVE TOKEN:
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).send({ message: 'No authorization token found'})

    }
    //THEN CHECK IF TOKEN VALID:
    //IF SO GO ON:
    next();

}