import mongoose from "mongoose";
import config from "./config";
import User from "./models/User";
import Recipe from "./models/Recipe";
import Comment from "./models/Comment";
import {randomUUID} from "node:crypto";

const run = async () => {
    await mongoose.connect(config.db);
    const db = mongoose.connection;

    try{
        await db.dropCollection('users');
        await db.dropCollection('recipes');
        await db.dropCollection('comments');
    } catch (e){
        console.log('Collections were not present');
    }

    const adminUser = await User.create({
        email: 'Admin@mail.com',
        password: '123',
        displayName: 'Admin',
        token: randomUUID(),
    });

    const userUser = await User.create({
        email: 'User@mail.com',
        password: '123',
        displayName: 'User',
        token: randomUUID(),
    });

    const adminRecipe = await Recipe.create({
        author: adminUser._id,
        title: "Admin's Special Mojito",
        recipe: "A refreshing mojito with a special twist. Muddle mint leaves with sugar and lime juice. Add white rum and top with club soda. Garnish with fresh mint sprig and lime wedge.",
        image: 'fixtures/img_1.png',
    });

    const userRecipe = await Recipe.create({
        author: userUser._id,
        title: "Classic Margarita",
        recipe: "The perfect classic margarita. Shake tequila, lime juice and triple sec with ice. Strain into a salt-rimmed glass. Garnish with lime wheel.",
        image: 'fixtures/img.png',
    });

    await Comment.create([
        {
            author: adminUser._id,
            recipe: userRecipe._id,
            comment: "Great classic recipe! I love the balance of flavors."
        },
        {
            author: userUser._id,
            recipe: adminRecipe._id,
            comment: "Amazing mojito! The mint is very refreshing."
        }
    ]);

    await db.close();
};

run().catch(console.error);