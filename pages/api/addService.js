import connectDB from "utils/connectMongoDB";
import Service from "models/Service";

/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

  export default  function deleteService(req, res) {
    try
      {   
        const{service_id}=req.query;
        console.log(service_id);
        console.log("Connecting DB");
        connectDB();
        console.log("DB connected");
        const {titre,images,description}=req.body;
        console.log(req.body);
        console.log('CREATING DOCUMENT');
        const service = Service.findByIdAndDelete(service_id);
        console.log("DELETED DCUMENT");
  
      res.status(200).json({ deleted:service_id });
    }
      catch(error){
        console.log(error);
        res.json({error});
      }
      
    }
  
