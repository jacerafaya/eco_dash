import connectMongo from "utils/connectMongoDB";
import Demo from "models/demo";



/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */

export default  function handler(req, res) {
    try{
      //connectDB();
      
//      res.status(200).json({ });

      
    console.log("Connecting DB");
    connectMongo().catch(() =>res.status(405).json({ error: "Error in the connection" }));
    console.log("DB connected");
    const { name,email}=req.body;
    console.log(req.body);
    console.log('CREATING DOCUMENT');
    const demo = Demo.create(req.body);
    console.log("CREATED DCUMENT");

    res.status(200).json({ demo });
    
  }
  catch(error){
    res.json({error});
  }
    
  }
  
