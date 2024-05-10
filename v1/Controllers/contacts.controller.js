const express = require("express");
const Contacts = require('../Models/contacts.model');
require('dotenv').config();



// publish a contact
exports.AddAContact = async (req, res) => {
    try {
        const contact = req.body;
        const contacts = await Contacts.create(contact);
        res.status(200).json({
            status: "Successful",
            message: "Data Added Successfully",
            data: contacts
        });
    } catch (error) {
        res.json(error);
    }
}



// update a contact
exports.updateAContact = async (req, res) => {
    try {
        const id = req.params.id;
        const contact = req.body;
        const filter = { _id: id }
        const options = { upsert: true };
        const updateDoc = {
            $set: contact
        };
        const contacts = await Contacts.updateOne(filter, updateDoc, options);
        res.status(200).json({
            status: "Successful",
            message: "Data updated Successfully",
            data: contacts
        });
    } catch (error) {
        res.json(error);
    }
}



// get single contact
exports.getSingleContact = async (req, res) => {
    try {
        const id = req.params.id;
        const query = { _id: id }
        const contact = await Contacts.findOne(query);
        return res.status(200).json(contact);
    } catch (err) {
        res.status(404).json(err.message);
    }
}


// get all contacts
exports.getAllContacts = async (req, res) => {
    try {
        let filters = { ...req.query };

        // sort - page - limit => exclude
        const excludesFields = ['page', 'limit'];
        excludesFields.forEach(field => delete filters[field]);

        // gt, lt, gte, lte
        let filterString = JSON.stringify(filters)
        filterString = filterString.replace(/\b(gt|gte|lt|lte)\b/g, match => `$${match}`);

        // parsing algorithm
        filters = JSON.parse(filterString);

        // limit, sort, select ->  Are store Here    
        const queries = {};


        // queries by limit

        if (req.query.limit) {
            const limit = req.query.limit;
            queries.limit = (limit * 1);
        };


        // Pagination

        if (req.query.page) {

            const { page = 1, limit = 6 } = req.query;   //'2' '5'

            queries.limit = limit;

            const skip = (page - 1) * parseInt(limit);

            queries.skip = skip
            queries.limit = parseInt(limit)
        };


        const result = await Contacts.find(filters)
            .skip(queries.skip)
            .limit(queries.limit)
            ;


        const totalContacts = await Contacts.countDocuments(filters);
        const pageCount = Math.ceil(totalContacts / queries.limit);


        // if not data
        if (Contacts.length === 0) {
            return res.status(200).json({
                message: "You've no Data or Entered a Wrong Queries. Please insert first then Find data or check your Queries",
            });
        };


        res.status(200).json({
            status: "success",
            message: "Data Get Successfull",
            data: { totalContacts, pageCount, result }
        });


    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: "Can't Get Data",
            error: error.message
        });
    }
}


// delete a contact
exports.deleteAContact = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(id);
        const query = { _id: id };
        // console.log(query);
        const result = await Contacts.deleteOne(query);
        res.status(200).json({
            status: "Successful",
            message: "Data Deleted Successfully",
            data: result
        });
    } catch (err) {
        res.status(404).json(err);
    }
}



