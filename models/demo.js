import {Schema,model, models} from "mongoose";

const demoSchema= new Schema({
    name:String,
    date:Date
});

const Demo = models.Demo || model("Demo",demoSchema);

export default Demo;