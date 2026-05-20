import { getById } from "@/services/helperFunc";


export default function handler(req, res) {

    if (req.method === "GET") {
    
        const {medicenId} = req.query;
        const idProvider = getById(medicenId);
    
        return res.status(200).json(idProvider);
    }
  
    return res.status(404).json({message: "This Method is not Allowed"}).send();
}
