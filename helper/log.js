const { LOGGING_FUNCTION } = process.env;
var AWS = require("aws-sdk");
var lambda = new AWS.Lambda({ region: "us-east-2" });

const log = async (event, result, status) => {
  const request = JSON.parse(event.body);
  const path = event.path;
  const Authorization = event.headers.Authorization;
  const method = event.httpMethod;
  const pathArray = path.split("/");
  const moduleName = pathArray.filter((a, i) => i % 2 === 1).join("-");
  let description = "";
  if (method == "GET" && pathArray.includes("import")) {
    description = `Requested import ${status}`;
  } else if (method == "POST") {
    description = `Create ${result.id} ${status}`;
  } else if (method == "PUT") {
    description = `Update ${result.id} ${status}`;
  } else if (method == "DELETE") {
    description = `Delete ${result.id} ${status}`;
  }
  console.log(description);
  let logtext = {
    body: { module: moduleName, description, meta: result },
    headers: { Authorization },
  };
  var params = {
    FunctionName: LOGGING_FUNCTION, // the lambda function we are going to invoke
    InvocationType: "RequestResponse",
    LogType: "Tail",
    Payload: JSON.stringify(logtext),
  };

  const invokeResult = await lambda.invoke(params).promise();
};

module.exports = { log };
