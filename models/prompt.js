import { Schema, model, models } from "mongoose";

const promptSchema = new Schema({
    creator: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    text:{
        type: String,
        require: [true, "prompt is required"]
    },
    tag:{
        type: String,
        require: [true, "Tag is required"]
    }
})

const Prompt = models.Prompt || model("Prompt", promptSchema);
export default Prompt;