"use strict";

const { getSuccessResponse } = require("../helper/success");
const { getErrorResponse } = require("../helper/error");

const { PartOrdersModel, contactsFields } = require("../Models/PartOrdersModel");
// const { InventoryModel } = require("../Models/InventoryModel");

const db = require("../config/db");
module.exports.main = async (event) => {
  try {
    let query = event.multiValueQueryStringParameters || {};
    delete query.page;
    delete query.limit;
    for (const [key, value] of Object.entries(query)) {
      if (key == "_id") query[key] = value;
      else query[key] = value.map((v) => new RegExp(v, "i"));
    }
    let { page = 1, limit = 10 } = event.queryStringParameters || {};
    const options = {
      page: page || 1,
      limit: limit || 10,
      projection: { __v: 0 },
    };
    const connection = await db.connect();
    const result = await PartOrdersModel.paginate(query, options);

    return getSuccessResponse(result);
  } catch (error) {
    return getErrorResponse(error);
  }
};

module.exports.parts = async (event) => {
  try {
    const { id } = event.pathParameters;
    const connection = await db.connect();
    let query = event.multiValueQueryStringParameters || {};
    delete query.page;
    delete query.limit;
    for (const [key, value] of Object.entries(query)) {
      if (key == "_id") query[key] = value;
      else query[key] = value.map((v) => new RegExp(v, "i"));
    }
    let { page = 1, limit = 10 } = event.queryStringParameters || {};
    const options = {
      page: page || 1,
      limit: limit || 10,
      projection: { name: 1 },
    };
    const purchaseOrders = await PartOrdersModel.findById(id, {
      parts: 1,
      _id: 0,
    });
    // query._id = { $in: purchaseOrders.parts.map((item) => item.itemId) };
    // const result = await InventoryModel.paginate(query, options);

    return getSuccessResponse({ docs: purchaseOrders.parts });
  } catch (error) {
    console.log(error);
    return getErrorResponse(error);
  }
};
