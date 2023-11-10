import { onRequest } from "firebase-functions/v2/https";
import  express  from "express.js";
import cors from "cors";
import { createUser, login } from "./src/users.js";
import { getAllRecipes, createRecipe } from "./src/recipes.js";
import { isAuthenticated } from "./src/middleware.js";


const app = express ();
app.use(cors());
app.use (express.json());

//non protected routes
app.post('/user', createUser);
app.post('/user/login', login);
app.post('/recipes', getAllRecipes);

//Protected Routes

app.post('/recipes', isAuthenticated, createRecipe);
//app.patch('/recipes/recipes/recipeId', updateRecipe)

export const api = onRequest(app);





