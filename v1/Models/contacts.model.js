const mongoose = require("mongoose");


const contactsSchema = mongoose.Schema(
    {
        name: {
            type: String,
            trim: true,
            required: [true, "name is required"],
        },
        email: {
            type: String,
            required: [true, "email is required"],
        },
        phone: {
            type: String,
            required: [true, "phone is required"],
        },
        address: {
            type: String,
            required: [true, "address is required"],
        },
        profilePicture: {
            type: String,
            required: [true, "profilePicture is required"],
        },
    },
    {
        timestamps: true,
    }

);


const Contacts = mongoose.model("contacts", contactsSchema);

module.exports = Contacts;