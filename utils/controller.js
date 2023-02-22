/**Controller */

import Service from "../models/Service";


//get: http://localhost:3000/api/services
export async function getServices(req, res) {
  try {
    
    const services = await Service.find({});
    console.log(services);
    if (!services) return res.status(404).json({ error: "Data not found" });
    
    res.status(200).json(services);
  } catch (error) {
    console.log(error);
  }
}


//post: http://localhost:3000/api/services/{id}
export async function getService(req,res) {
    try {
        const{serviceId}=req.query;
        if(serviceId){
            const service=await Service.findById(serviceId);
            res.status(200).json(service);
        }
        res.status(404).json({error:"User not Selected"});
    } catch (error) {
        console.log(error);
        res.status(404).json({error:"Cannot get the Service ...!!"});
    }
}


//post: http://localhost:3000/api/services
export async function postService(req, res) {
  try {
    //req.body= data from the user
    const formData = req.body;
    if (!formData) return res.status(404).json({ error: "Form data not provided ..!!" });
    
    const doc = await Service.create(formData, function (err, data) {
        
      return res.status(200).json(formData);
    });
  } catch (error) {
    return res.status(404).json({ error });
  }
}

//put: http://localhost:3000/api/services/1
export async function putService(req, res) {
    try {
      //getting the value from the url
      const{serviceId}=req.query;
      const formData = req.body;
      
      if(serviceId && formData){
        const service= await Service.findByIdAndUpdate(serviceId,formData);
        res.status(200).json(service);
      }

      res.status(404).json({error:"Service introuvable"});


    } catch (error) {
        console.log(error)
      return res.status(404).json({ error:"Error While Updating the Data..." });
    }
  }


  //delete: http://localhost:3000/api/services/1
  export async function deleteService(req, res) {
    try {
      //getting the value from the url
      const{serviceId}=req.query;
       
      if(serviceId){
        const service= await Service.findByIdAndDelete(serviceId);
        res.status(200).json({deleted:serviceId});
      }

      res.status(404).json({error:"Service introuvable"});


    } catch (error) {
      console.log(error)
      return res.status(404).json({ error:"Error While Deleting the Data..." });
    }
  }