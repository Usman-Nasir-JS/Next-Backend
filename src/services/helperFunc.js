import fs from "fs";
import path from "path";


const filesPath = path.join(process.cwd(), "src", "database", "medicens.json");

export function getAll() {
    
    const allData = fs.readFileSync(filesPath);
    const setData = JSON.parse(allData);
    
    return setData;
}

export function getById(id) {
    
    const allData = getAll();
    
    const spacificData = allData.find(single => single.id === Number(id));
    console.log(spacificData);
    
    return spacificData;
}

export function add(image, title, description, waranty, price) {

    const allData = getAll();

    const newItem = {
        id: allData.length + 1,
        image,
        title,
        description,
        waranty,
        price
    };

    allData.push(newItem);

    fs.writeFileSync(filesPath, JSON.stringify(allData));

    return newItem;
}

export function updateOne(id, image, title, description, waranty, price) {

    const allData = getAll();

    const foundData = allData.find(item => item.id === Number(id));

    if (!foundData) {
        return false;
    }

    // update only provided fields
    if (image !== undefined) foundData.image = image;
    if (title !== undefined) foundData.title = title;
    if (description !== undefined) foundData.description = description;
    if (waranty !== undefined) foundData.waranty = waranty;
    if (price !== undefined) foundData.price = price;

    fs.writeFileSync(filesPath, JSON.stringify(allData, null, 2));

    return foundData;
}

export function updateMultiple(newData) {

    const allData = getAll();

    const updatedItems = []; // sirf updated items store karenge

    const updatedData = allData.map(item => {

        const found = newData.find(
            u => Number(u.id) === Number(item.id)
        );

        if (found) {

            const updatedItem = {
                ...item,

                ...(found.image !== undefined && { image: found.image }),
                ...(found.title !== undefined && { title: found.title }),
                ...(found.description !== undefined && { description: found.description }),
                ...(found.waranty !== undefined && { waranty: found.waranty }),
                ...(found.price !== undefined && { price: found.price }),

            };

            updatedItems.push(updatedItem); // sirf updated add karo

            return updatedItem;
        }

        return item;

    });

    fs.writeFileSync(
        filesPath,
        JSON.stringify(updatedData, null, 2)
    );

    return updatedItems; // sirf updated items return
}

export function deleteData(id) {

    const allData = getAll();

    const exist = allData.find(item => item.id === Number(id));

    if (!exist) {
        return false;
    }

    const newData = allData
        .filter(item => item.id !== Number(id))
        .map((item, index) => ({
            ...item,
            id: index + 1
        }));

    fs.writeFileSync(filesPath, JSON.stringify(newData));

    return true;
}
