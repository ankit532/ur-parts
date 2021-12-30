const getSuccessResponse = (info) => {
  if (info.type == "download") {
    return {
      headers: {
        "Content-Type": "text/csv",
        "Content-disposition": "attachment; filename=testing.csv",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        "Access-Control-Allow-Methods": "*",
      },
      body: info.data,
      statusCode: 200,
    };
  }
  return {
    statusCode: 200,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
      "Access-Control-Allow-Methods": "*",
    },
    body: JSON.stringify({
      message: "Request approved for performing operation",
      data: info,
      success: true,
    }),
  };
};

module.exports = { getSuccessResponse };
