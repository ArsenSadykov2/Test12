import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {Error, Types} from "mongoose";
import Comment from "../models/Comment";
import Recipe from "../models/Recipe";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
    try{
        let filter: {[key: string]: string} = {};
        if(req.query.recipe)filter['recipe'] = String(req.query.recipe);

        const comments = await Comment.find(filter)
            .populate({
                path: 'author',
                select: '-password -token'
            })
            .populate({
                path: 'recipe',
                populate: {
                    path: 'author',
                    select: '-password -token'
                }
            })
            .exec();
        res.send(comments);
    } catch (e) {
        next(e);
    }
});

commentsRouter.get('/:id', async (req, res, next) => {
    const id = req.params.id;
    try{
        const comment = await Comment.findById(id)
            .populate({
                path: 'author',
                select: '-password -token'
            })
            .populate({
                path: 'recipe',
                populate: {
                    path: 'author',
                    select: '-password -token'
                }
            })
            .exec();
        res.send(comment);
    } catch (e) {
        next(e);
    }
});

commentsRouter.post("/", auth, async (req, res, next) => {
    try{
        const user = (req as RequestWithUser).user;

        const newComment = {
            author: user._id as Types.ObjectId,
            recipe: req.body.recipe as Types.ObjectId,
            comment: req.body.comment,
        };

        const comment = new Comment(newComment);
        await comment.save();
        await comment.populate({
            path: 'author',
            select: '-password -token'
        });
        res.status(201).send(comment);
    } catch (e) {
        if(e instanceof Error.ValidationError) {
            res.status(400).send(e);
            return;
        }
        next(e);
    }
});

commentsRouter.delete("/:id", auth, async (req, res, next) => {
    try{
        const {id} = req.params;
        const user = (req as RequestWithUser).user;

        const comment = await Comment.findById(id);
        if(!comment) {
            res.status(404).send("Comment not found");
            return;
        }

        const isCommentAuthor = comment.author.toString() === user._id.toString();

        const recipe = await Recipe.findById(comment.recipe);
        const isRecipeAuthor = recipe && recipe.author.toString() === user._id.toString();

        if (!isCommentAuthor && !isRecipeAuthor) {
            return res.status(403).send({error: "You do not have permission"});
        }

        await Comment.findByIdAndDelete(id);
        res.send({message: "Comment deleted successfully."});
    } catch (e) {
        next(e);
    }
});

export default commentsRouter;