const mongoose = require("mongoose");

const workOrdersSchema = {
    id: {
        type: String,
        required: true,
        unique: true,
        index: true,
    },
    customerId: {
        type: String,
    },
    customerName: {
        type: String,
    },
    customerPhone: {
        type: String,
    },
    customerAddress: {
        type: String,
    },
    type: {
        // warranty/cod
        type: String,
        enum: ["warranty", "cod"],
    },
    cod: {
        // unique number auto generated.
        type: String,
        default: null,
    },
    warranty: {
        type: String,
    },
    warrantyCompany: {
        type: String,
    },
    warrantyId: {
        type: String,
    },
    deductible: {
        type: String,
    },
    deductibleCollected: {
        type: Boolean,
    },
    convertedToCOD: {
        type: String,
    },
    status: {
        type: String,
        enum: ["new", "readyToSchedule", "scheduled", "inProgress", "completed"],
    },
    warrantyStatus: {
        type: String,
        enum: ["notCovered", "buyOut", "approved"],
    },
    makeUrgent: {
        type: Boolean,
    },
    requesterName: {
        type: String,
    },
    submitterName: {
        type: String,
    },
    paymentMethod: {
        type: String,
        enum: ["cash", "creditCard", "check", "bankTransfer"],
    },
    dateOfCreation: {
        type: Date,
    },
    laborDetailsType: { type: String },
    labourId: { type: String },
    labourHours: { type: String },
    helpCall: { type: Number },
    labourDiscount_1: { type: Number },
    labourDiscount_2: { type: Number },
    labourDiscount_3: { type: Number },
    ratePerHour: { type: Number },
    noOfHours: { type: Number },
    totalLabor: { type: Number },
    applianceType: { type: String },
    applianceBrand: { type: String },
    unitLocation: { type: String },
    applianceModel: { type: String },
    applianceSerial: { type: String },
    authReqId: { type: String },
    amountRequested: { type: String },
    approvedByWarranty: { type: String },
    totalAmount: { type: String },
    parts: [
        {
            type: {
                type: String,
                enum: ["inventory", "job"],
            },
            itemId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "inventory",
            },
            id: { type: String },
            partNumber: { type: String },
            name: { type: String },
            brand: { type: String },
            appliance: { type: String },
            partStatus: { type: String },
            location: { type: String }, // need to pull from all location for that item
            availableQuantity: { type: Number },
            requiredQuantity: { type: Number },
            listPrice: { type: Number },
            ourPrice: { type: Number },
            markUpPrice: { type: Number },
        },
    ],
};
const schema = new mongoose.Schema(workOrdersSchema, {
    timestamps: true,
});
module.exports = mongoose.model("workOrders", schema);