import mongoose from "mongoose";
// 1-create a schema
// 2-model based off the schema

const noteSchema = new mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true } // createdAt and updatedAt fields will be automatically added to the schema
);

const Note = mongoose.model("Note", noteSchema); // Create a model named "Note" based on the noteSchema.
export default Note;