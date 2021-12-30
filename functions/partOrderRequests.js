"use strict";

const { getSuccessResponse } = require("../helper/success");
const { getErrorResponse } = require("../helper/error");

const { PartOrdersModel, contactsFields } = require("../Models/PartOrdersModel");

const WorKOrder = require('../Models/WorKOrder');

const db = require("../config/db");

module.exports.main = async (event) => {
    try {
        const connection = await db.connect();
        var jobs = await WorKOrder.find();
        var result = [];
        jobs.forEach(job => {
            if (job.parts !== undefined) {
                var parts = job.parts;
                var row = {};
                parts.forEach(part => {
                    row["workOrderNumber"] = (job.id !== undefined) ? job.id : "undefined";
                    row["customerName"] = (job.customerName !== undefined) ? job.customerName : "undefined";
                    row["partQuantity"] = (part.requiredQuantity !== undefined) ? part.requiredQuantity : "undefined";
                    row["partName"] = (part.name !== undefined) ? part.name : "undefined";
                    row["partNumber"] = (part.partNumber !== undefined) ? part.partNumber : "undefined";
                    result.push(row);
                });
            }
        });
        return getSuccessResponse(result);
    } catch (error) {
        return getErrorResponse(error);
    }
};