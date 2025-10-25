import {Button, TextField} from "@mui/material";
import Grid from "@mui/material/Grid";
import {useState} from "react";
import type {RecipeMutation} from "../../../types";
import Spinner from "../../../components/Spinner/Spinner.tsx";
import FileInput from "../../../components/FileInput/FileInput.tsx";

interface Props {
    onSubmitRecipe: (recipe: RecipeMutation) => void;
    loading: boolean;
}

const RecipeForm: React.FC<Props> = ({onSubmitRecipe, loading}) => {
    const [form, setForm] = useState<RecipeMutation>({
        author: '',
        title: '',
        recipe: '',
        image: null,
    });

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmitRecipe({...form});
    };

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const {name, files} = e.target;

        if(files) {
            setForm(prevState => ({
                ...prevState,
                [name]: files[0],
            }));
        }
    };

    return (
        <form onSubmit={onSubmit} style={{ width: "50%", margin: "0 auto" }}>
            <Grid container spacing={2} direction="column" alignItems="center">
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{ width: "100%"}}
                        id="title"
                        label="Title"
                        name="title"
                        value={form.title}
                        onChange={onInputChange}
                        disabled={loading}
                    />
                </Grid>

                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <TextField
                        style={{ width: "100%"}}
                        multiline
                        rows={3}
                        id="recipe"
                        label="Recipe"
                        name="recipe"
                        value={form.recipe}
                        onChange={onInputChange}
                        disabled={loading}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <FileInput
                        name="image"
                        label="Image"
                        onChange={fileInputChangeHandler}
                        disabled={loading}
                    />
                </Grid>
                <Grid size={{sm: 12, md: 6, lg: 6}}>
                    <Button
                        style={{ width: "100%"}}
                        type="submit"
                        color="primary"
                        variant="contained"
                        disabled={loading}
                    >
                        {loading ? <Spinner /> : "Create"}
                    </Button>
                </Grid>
            </Grid>
        </form>
    );
};

export default RecipeForm;