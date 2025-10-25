import express from "express";
import auth, {RequestWithUser} from "../middleware/auth";
import {Error, Types} from "mongoose";
import Comment from "../models/Comment";

const commentsRouter = express.Router();

commentsRouter.get('/', async (req, res, next) => {
    try{
        let filter: {[key: string]: string} = {};
        if(req.query.recipe)filter['recipe'] = String(req.query.recipe);

        const comments = await Comment.find(filter)
            .populate({
                path: 'author',
                select: '-password -token -_id'
            })
            .populate({
                path: 'recipe',
                populate: {
                    path: 'author',
                    select: '-password -token -_id'
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
                select: '-password -token -_id'
            })
            .populate({
                path: 'recipe',
                populate: {
                    path: 'author',
                    select: '-password -token -_id'
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
            select: '-password -token -_id'
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

export default commentsRouter;