"use strict";

const { getSuccessResponse } = require("../helper/success");
const { getErrorResponse } = require("../helper/error");

const { PartOrdersModel, contactsFields } = require("../Models/PartOrdersModel");

const WorKOrder = require('../Models/WorKOrder');

const db = require("../config/db");

module.exports.main = async (event) => {
    try {
        const connection = await db.connect();
        var parts = await PartOrdersModel.find();
        var jobs = await WorKOrder.find();
        var partStats = {
            inStock: 0,
            backOrdered: 0,
            cancelled: 0,
            notAvailable: 0,
            received: 0,
            transferred: 0,
            requestedWarranty: 0,
            orderedWarranty: 0,
            installed: 0,
            returedVendor: 0,
            loss: 0,
            returnedOffice: 0
        };


        jobs.forEach(job => {
            if (job.parts !== undefined) {
                console.log(job.parts);
            }
        });

        parts.forEach(part => {
            if (part.partStatus !== undefined) {
                switch (part.partStatus.trim().toLowerCase()) {
                    case 'in stock':
                        partStats.inStock += part.partQuantity;
                        break;
                    case 'back ordered':
                        partStats.backOrdered += part.partQuantity;
                        break;
                    case 'cancelled':
                        partStats.cancelled += part.partQuantity;
                        break;
                    case 'not available':
                        partStats.notAvailable += part.partQuantity;
                        break;
                    case 'received':
                        partStats.received += part.partQuantity;
                        break;
                    case 'transferred':
                        partStats.transferred += part.partQuantity;
                        break;
                    case 'requested-warranty':
                        partStats.requestedWarranty += part.partQuantity;
                        break;
                    case 'ordered-warranty':
                        partStats.orderedWarranty += part.partQuantity;
                        break;
                    case 'installed':
                        partStats.installed += part.partQuantity;
                        break;
                    case 'retured-vendor':
                        partStats.returedVendor += part.partQuantity;
                        break;
                    case 'loss':
                        partStats.loss += part.partQuantity;
                        break;
                    case 'returned-office':
                        partStats.returnedOffice += part.partQuantity;
                        break;
                };
            }
        });
        return getSuccessResponse(partStats);
    } catch (error) {
        return getErrorResponse(error);
    }
};