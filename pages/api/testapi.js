import connectDB from "utils/connectMongoDB";
import Demo from "models/demo";


/**
 * 
 * @param {import("next").NextApiRequest} req 
 * @param {import("next").NextApiResponse} res 
 */


export default  function handler(req, res) {
    const method = req.method;
    console.log(method);
    res.status(200).json(method );

  }
  
