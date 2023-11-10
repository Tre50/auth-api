import { db } from "./dbConnect";

const coll =db.collection('recipes');

export async function createRecipe(res, req) {
    let newRecipe = req.body;
    //add user id to the recipe
    newRecipe.userId = req.locals.id;
    await coll.add(newRecipe);
    //send back updated list of recipes
    getAllRecipes(req, res);

}


export async function getAllRecipes (req, res) {
    const recipeColl = await coll.get();
    const recipe = recipeColl.docs.map(doc => ({id: doc.id, ...doc.data()}));
    res.send(recipes);


}
