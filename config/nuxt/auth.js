require("dotenv").config();

import apiRoutes from "../apiRoutes";

const appUrl = process.env.APP_URL;
const facebookAppId = process.env.FACEBOOK_APP_ID;
const facebookGraphVersion = process.env.FACEBOOK_GRAPH_VERSION;
const apiUrlRedirect = process.env.API_URL_REDIRECT;

export default {
  resetOnError: true,
  strategies: {
    local: { 
      endpoints: {
        login: {
          url: apiRoutes.auth.login,
          method: "post",
          propertyName: "access_token"
        },
        logout: { url: apiRoutes.auth.logout, method: "post" },
        user: { url: apiRoutes.auth.user, method: "get", propertyName: "data" }
        
      }
    },
    facebook: {
      client_id: facebookAppId,
      authorization_endpoint: apiUrlRedirect+'/v1/auth/fb-redirect',
      userinfo_endpoint: false,
      scope: ["email","pages_show_list"],
      redirect_uri: `${appUrl}/login`
    }
  },
  redirect: {
    login: "/login",
    logout: "/login",
    home: "/"
  },
  plugins: ["@/plugins/auth"]
};
