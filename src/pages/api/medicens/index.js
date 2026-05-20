import { add, deleteData, getAll, updateMultiple, updateOne } from "@/services/helperFunc";


export default function handler(req, res) {

  if (req.method === "GET") {
    
    const allData = getAll();
    const sendData = res.status(200).json(allData);

    return sendData;
  }


  else if (req.method === "POST") {

    if (Array.isArray(req.body)) {
      return res.status(400).json({
        message: "You can add only one medicine at a time in the form of json only!"
      });
    }

    const { id, image, title, description, waranty, price } = req.body;

    if (id) {
      return res.status(400).json({
        message: "Id is not required, Remove this id & then add!"
      });
    }

    if (!image || !title || !description || !waranty || !price) {
      return res.status(400).json({
        message: "All fields are required but not a id!"
      });
    }

    add(image, title, description, waranty, price);

    return res.status(201).json({
      message: "Data Added Successfully"
    });

  }


  else if (req.method === "PATCH") {

    if (Array.isArray(req.body)) {
      return res.status(400).json({
        message: "You can update only one medicine at a time in the form of json only!"
      });
    }
    
    const { id, image, title, description, waranty, price } = req.body;

    if (!id) {
      return res.status(400).json({
        message: "Id is required, So add this id & then update!"
      });
    }
    
    const updatedOne = updateOne(id, image, title, description, waranty, price);

    if (!updatedOne) {
      return res.status(404).json({
          message: "No matching medicine ID found to update!"
      });
    }

    return res.status(200).json({
      message: "Data Updated Successfully",
      data: updatedOne
    });

  }


  else if (req.method === "PUT") {

    const newData = req.body;

    if (!Array.isArray(newData)) {
      return res.status(400).json({
          message: "You can update multiple medicines at a time in the form of array!"
      });
    }

    if (newData.length === 1) {
      return res.status(400).json({
          message: "Please use PATCH method for single madicine update"
      });
    }

    const missingId = newData.some(item => item.id === undefined);

    if (missingId) {
      return res.status(400).json({
          message: "Each medicine must include an ID to update!"
      });
    }

    const updatedAll = updateMultiple(newData);

    if (updatedAll.length === 0) {
      return res.status(404).json({
          message: "No matching medicines ID found to update."
      });
    }

    return res.status(200).json({
      message: "Multiple Madicines Updated Successfully",
      data: updatedAll
    });

  }


  else if (req.method === "DELETE") {

    const { id } = req.body;

    if (!id) {
      return res.status(400).json({ message: "One id is required in json only" });
    }

    const checkDelete = deleteData(id);

    if (!checkDelete) {
      return res.status(404).json({ message: "No matching medicine ID found to delete!" });
    }

    return res.status(200).json({ message: "Medicine Deleted Successfully" });

  }
  
  
  return res.status(404).json({message: "This Method is not Allowed"}).send();
}
