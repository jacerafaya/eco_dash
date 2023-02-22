import connectMongo from "../../../utils/connectMongoDB";
import { getServices, postService,putService,deleteService } from "../../../utils/controller";

export default async function handler(req, res) {
  connectMongo().catch(() =>res.status(405).json({ error: "Error in the connection" }));
  
  //type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getServices(req,res);
      //res.status(200).json({method,name:'GET Request'});
      
      break;

    case "POST":
      postService(req,res);
      break;



    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
