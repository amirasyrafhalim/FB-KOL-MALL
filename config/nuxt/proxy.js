require("dotenv").config();

export default {
  "/v1": {
    target: process.env.API_URL,
    pathRewrite: {
      "^/v1": "/v1"
    }
  }
};

// export default ["http://kolstore-api.test/v1"];
