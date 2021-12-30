"use strict";
const { getSuccessResponse } = require("../helper/success");
const { getErrorResponse } = require("../helper/error");
const db = require("../config/db");
const moment = require("moment");
const { PartOrdersModel } = require("../Models/PartOrdersModel");

module.exports.main = async (event) => {
  try {

    const { id } = event.pathParameters;
    const connection = await db.connect();
    const result = await PartOrdersModel.findById(id);
    if(result.orderDate) result.orderDate=moment(result.orderDate).format("YYYY-MM-DD");
    if(result.expectedDate) result.expectedDate=moment(result.expectedDate).format("YYYY-MM-DD");  
    return getSuccessResponse(result);
  } catch (error) {
    return getErrorResponse(error);
  }
};
