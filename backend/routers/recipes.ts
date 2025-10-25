import express from "express";
import {imagesUpload} from "../multer";
import {Error, Types} from "mongoose";
import auth, {RequestWithUser} from "../middleware/auth";
import Recipe from "../models/Recipe";

const recipeRouter = express.Router();

interface RecipeMutation {
    author: Types.ObjectId,
    title: string;
    recipe: string;
    image?: string;
}

recipeRouter.get('/', async (req, res, next) => {
    try{
        const recipes = await Recipe.find({})
            .populate({
                path: 'author',
                select: '-password -token'
            })
            .exec();
        res.send(recipes);
    } catch (e) {
        next(e);
    }
});

recipeRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try{
        const recipe = await Recipe.findById(id)
            .populate({
                path: 'author',
                select: '-password -token'
            })
            .exec();
        if (!recipe) {
            return res.status(404).send({error: 'Recipe not found'});
        }
        const recipeObject = recipe.toObject();
        const formattedRecipe = {
            ...recipeObject,
        };

        res.send(formattedRecipe);
    } catch (e) {
        next(e);
    }
});

recipeRouter.post("/",auth, imagesUpload.single('image'), async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        const newRecipe: RecipeMutation = {
            author: user._id as Types.ObjectId,
            title: req.body.title,
            recipe: req.body.recipe,
        };
        if(req.file) newRecipe.image = 'images/' + req.file.filename;

        const recipe = new Recipe(newRecipe);
        await recipe.save();
        await recipe.populate({
            path: 'author',
            select: '-password -token'
        });
        const recipeObject = recipe.toObject();
        res.status(201).send(recipeObject);
    } catch (e) {
        if(e instanceof Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

recipeRouter.delete("/:id", auth, async (req, res, next) => {
    try{
        const {id} = req.params;
        const user = (req as RequestWithUser).user;

        const recipe = await Recipe.findById(id);
        if(!recipe) {
            return res.status(404).send({error: "Recipe not found"});
        }

        const isAuthor = recipe.author.toString() === user._id.toString();

        if (!isAuthor) {
            return res.status(403).send({error: "You do not have permission"});
        }

        await Recipe.findByIdAndDelete(id);
        res.send({message: "Recipe deleted successfully."});
    } catch (e) {
        next(e);
    }
});

export default recipeRouter;