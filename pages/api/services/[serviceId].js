import connectMongo from "utils/connectMongoDB";
import {
  getService,
  putService,
  deleteService,
} from "utils/controller";

export default async function handler(req, res) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //type of request

  const { method } = req;

  switch (method) {
    case "GET":
      getService(req, res);
      break;
    case "PUT":
      putService(req, res);
      break;
    case "DELETE":
      deleteService(req, res);
      break;np

    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} Not Allowed`);
      break;
  }
}
