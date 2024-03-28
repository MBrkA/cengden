const {customLogger} = require("../logger");
const {ObjectId} = require("mongodb");
const {sendEmail} = require("../mailer");

async function getUsers(client) {
    const cursor = client.db("495hw1").collection("users")
        .find().limit(100)
    return await cursor.toArray();
}

// get user by id
async function getUserById(client, userId) {
    customLogger(`Getting user with id: ${userId}`)
    return await client.db("495hw1").collection("users")
        .findOne({ "_id": new ObjectId(userId)});
}

// new user with unique email
async function createUser(client, newUser) {
    const result = await client.db("495hw1").collection("users").insertOne(newUser);
    sendEmail(newUser.email, "Verification Email",
        `Click <a href="https://four95hw1-be.onrender.com/user/verify/${result.insertedId}">here</a> to verify your email.`
    )
    customLogger(`New user created with the following id: ${result.insertedId}`);
    return result;
}

// update user
async function updateUser(client, userId, updatedUser) {
    const result = await client.db("495hw1").collection("users").updateOne({ "_id": new ObjectId(userId) }, { $set: updatedUser });
    customLogger(`${result.matchedCount} document(s) matched the query criteria.`);
    customLogger(`${result.modifiedCount} document(s) was/were updated.`);
    return result;
}

//verify user
async function verifyUser(client, userId) {
    const result = await client.db("495hw1").collection("users").updateOne({ "_id": new ObjectId(userId) }, { $set: { isVerified: true } });
    customLogger(`${result.modifiedCount} document(s) was/were verified.`);
    return result;
}

async function deleteUser(client, userId) {
    const result = await client.db("495hw1").collection("users").deleteOne({ "_id": new ObjectId(userId) });
    customLogger(`${result.deletedCount} document(s) was/were deleted.`);
    return result;
}

//login user
async function loginUser(client, email, password) {
    return await client.db("495hw1").collection("users")
        .findOne({ email, password, isVerified: true});
}

// add to favorites array if not already in array
async function addToFavorites(client, userId, listingId) {
    const result = await client.db("495hw1").collection("users").updateOne({ "_id": new ObjectId(userId) }, { $addToSet: { favorites: listingId } });
    customLogger(`${result.matchedCount} document(s) matched the query criteria.`);
    customLogger(`${result.modifiedCount} document(s) was/were updated.`);
    return result;
}

async function removeFromFavorites(client, userId, listingId) {
    const result = await client.db("495hw1").collection("users").updateOne({ "_id": new ObjectId(userId) }, { $pull: { favorites: listingId } });
    customLogger(`${result.matchedCount} document(s) matched the query criteria.`);
    customLogger(`${result.modifiedCount} document(s) was/were updated.`);
    return result;
}

// add listing to listings array

async function addListingFromUser(client, userId, listingId) {
    const result = await client.db("495hw1").collection("users").updateOne({ "_id": new ObjectId(userId) }, { $addToSet: { listings: listingId } });
    customLogger(`${result.matchedCount} document(s) matched the query criteria.`);
    customLogger(`${result.modifiedCount} document(s) was/were updated.`);
    return result;
}

// remove listing from listings array
async function removeListingFromUser(client, userId, listingId) {
    const result = await client.db("495hw1").collection("users").updateOne({ "_id": new ObjectId(userId) }, { $pull: { listings: listingId } });
    customLogger(`${result.matchedCount} document(s) matched the query criteria.`);
    customLogger(`${result.modifiedCount} document(s) was/were updated.`);
    return result;
}

module.exports = {verifyUser,deleteUser,getUsers,getUserById,updateUser, createUser, loginUser,addToFavorites,removeFromFavorites,addListingFromUser,removeListingFromUser};