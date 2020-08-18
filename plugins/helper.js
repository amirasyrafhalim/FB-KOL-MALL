import queryString from "query-string";

export default ({ app }, inject) => {
  const helper = {
    stringifyParams(params) {
      return queryString
        .stringify(params)
        .replace(/[^?=&]+=(&|$)/g, "")
        .replace(/&$/, "");
    },
    getBase64(file) {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
          let encoded = reader.result.replace(/^data:(.*;base64,)?/, "");
          if (encoded.length % 4 > 0) {
            encoded += "=".repeat(4 - (encoded.length % 4));
          }
          resolve(encoded);
        };
        reader.onerror = (error) => reject(error);
      });
    },
    prepareUrl(baseUrl, params) {
      let url = baseUrl;

      for (let key in params) {
        url = url.replace("{" + key + "}", params[key]);
      }

      return url;
    },
    jsonReparse(data) {
      return JSON.parse(JSON.stringify(data));
    },
    clearSearchForm(formModel) {
      return Object.keys(formModel).forEach(key => {
        formModel[key] = "";
      });
    },
  };

  inject("helper", helper);
};
