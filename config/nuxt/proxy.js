require("dotenv").config();

export default {
  "/api": {
    target: process.env.API_URL,
    pathRewrite: {
      "^/api": "/api"
    }
  }
};

// export default ["http://joyrewards-api.local.com/api/v1"];
