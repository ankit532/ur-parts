const mongoose = require("mongoose");
const mongoosePaginate = require("mongoose-paginate-v2");

const partOrdersSchema = {
  id: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  customerName: {
    type: String,
  },
  warrantyCompanyName: {
    type: String,
  },
  vendor: {
    type: String,
  },
  partStatus: {
    type: String,
  },
  workOrderId: {
    // unique number auto generated.
    type: String,
  },
  orderId: {
    type: String,
  },
  partName: { type: String },
  appliance: { type: String }, // need to pull from all location for that item
  partQuantity: { type: Number, default: 1 },
  orderDate: { type: Date, default: Date.now },
  authorizationAmount: { type: Number },
  listPrice: { type: Number },
  ourPrice: { type: Number },
  warrantyPrice: { type: Number },
  payment: {
    type: String,
    enum: ["pending", "submitted"],
  },
  tracking: {
    type: Boolean,
  },
  orderBy: {
    type: String,
  },
};
const schema = new mongoose.Schema(partOrdersSchema, {
  timestamps: true,
});
schema.plugin(mongoosePaginate);
schema.pre("validate", async function (next) {
  var rec = this;
  var pad = "00000000";
  let item = await this.model("partOrders").findOne().sort({ _id: -1 });
  var newId = "" + (item ? parseInt(item.id.split("PART")[1]) + 1 : 1);
  rec.id = "PART" + pad.substring(0, pad.length - newId.length) + newId;
  next();
});
const PartOrdersModel = mongoose.model("partOrders", schema);
const partOrdersFields = Object.keys(partOrdersSchema);

module.exports = {
  PartOrdersModel,
  partOrdersFields,
  partOrdersSchema,
};
