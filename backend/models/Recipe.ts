import mongoose from "mongoose";

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    recipe: {
        type: String,
        default: "",
    },
    image: {
        type: String,
        default: null,
    }
});

const Recipe = mongoose.model('Recipe', RecipeSchema);
export default Recipe;