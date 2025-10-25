import mongoose, {Error} from "mongoose";
import Recipe from "./Recipe";

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    recipe: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Recipe",
        required: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true,
    }
});

CommentSchema.pre('save', async function (next) {
    const comment = this;

    const recipeExist = await Recipe.findById(comment.recipe);

    if(!recipeExist){
        const error = new Error("Recipe not found");
        next(error);
    }
    next();
});

const Comment = mongoose.model('Comment', CommentSchema);
export default Comment;