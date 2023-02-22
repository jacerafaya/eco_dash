import {Schema,model, models} from "mongoose";

const ServiceSchema= new Schema({
    titre:String,
    images:Array,
    description:String
});

const Service = models.Service || model("Service",ServiceSchema);

export default Service;