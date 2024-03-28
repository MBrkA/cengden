const {customLogger} = require("../logger");
const {ObjectId} = require("mongodb");
const {sendEmail} = require("../mailer");

async function getListingById(client, listingId) {
    return await client.db("495hw1").collection("listings")
        .findOne({ "_id": new ObjectId(listingId)});
}
async function getListings(client) {
    const cursor = client.db("495hw1").collection("listings")
        .find({"isActive": true}).limit(100);
    return await cursor.toArray();
}

async function getListingsWithFilter(client, filters) {
    const fieldsOfObject = Object.keys(filters);
    const query = {"isActive": true};
    const cursor = client.db("495hw1").collection("listings")
    fieldsOfObject.forEach(field => {
        if (filters[field].length > 0 || (field === "minPrice" || field === "maxPrice")){
            if (field === "minPrice") {
                if (filters[field] !== "")
                    query.price = {...query.price, $gte: filters[field]};
            } else if (field === "maxPrice") {
                if (filters[field] !== "")
                    query.price = {...query.price, $lte: filters[field]};
            } else if (field === "lesson") {
                query[field] = {$in: [filters[field]]}
            } else {
                if (typeof filters[field] === "string")
                    query[field] = {$regex: filters[field], $options: "i"};
                else
                    query[field] = {$in: filters[field]}
            }
        }
    })
    console.log(query)
    return await cursor.find(query).limit(100).toArray();
}

async function getListingsOfArray(client, idList) {
    idList = idList.map(id => new ObjectId(id));
    const result = await client.db("495hw1").collection("listings")
        .find({ "_id": { $in: idList } });
    return await result.toArray();
}


async function createListing(client, newListing) {
    const result = await client.db("495hw1").collection("listings")
        .insertOne(newListing);
    customLogger(`New listing created with the following id: ${result.insertedId}`);
    return result;
}

async function updateListing(client, listingId, updatedListing) {
    const operation = {$set: updatedListing};
    if (updatedListing.additionalFields && Object.keys(updatedListing.additionalFields).length === 0) {
        operation.$unset = {additionalFields: ""};
        delete updatedListing.additionalFields;
    }
    if (updatedListing.cameraSpecifications && Object.keys(updatedListing.cameraSpecifications).length === 0) {
        operation.$unset = {cameraSpecifications: ""};
        delete updatedListing.cameraSpecifications;
    }
    const result = await client.db("495hw1").collection("listings")
        .updateOne({ "_id": new ObjectId(listingId) }, operation);
    customLogger(`${result.matchedCount} document(s) matched the query criteria.`);
    customLogger(`${result.modifiedCount} document(s) was/were updated.`);
    return result;
}

async function activeListing(client, listingId) {
    const result = await client.db("495hw1").collection("listings")
        .updateOne({ "_id": new ObjectId(listingId) }, { $set: { isActive: true } });
    customLogger(`${result.modifiedCount} document(s) was/were activated.`);
    return result;
}

async function deactiveListing(client, listingId) {
    const result = await client.db("495hw1").collection("listings")
        .updateOne({ "_id": new ObjectId(listingId) }, { $set: { isActive: false } });
    customLogger(`${result.modifiedCount} document(s) was/were deactivated.`);
    return result;
}

async function removeListing(client, listingId) {
    const result = await client.db("495hw1").collection("listings")
        .deleteOne({ "_id": new ObjectId(listingId) });
    customLogger(`${result.deletedCount} document(s) was/were deleted.`);
    return result;
}

async function sendPriceDownEmail(client, listingId) {
    const listing = await getListingById(client, listingId);
    const users = await client.db("495hw1").collection("users")
        .find({favorites: {'$in': [listingId]}}).toArray();
    users.forEach(user => {
        sendEmail(user.email, "Price Down",
            `The price of ${listing.title} has been reduced to ${listing.price}$`);
    })
}

module.exports = {sendPriceDownEmail,getListingsWithFilter,getListingById,getListings,getListingsOfArray,createListing,updateListing,activeListing,deactiveListing,removeListing};
