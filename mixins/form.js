export default {
  data() {
    return {
      loading: false,
      formErrors: [],
      errorMessage: null,
    };
  },
  methods: {
    clearPreviousError() {
      this.formErrors = [];
      this.errorMessage = null;
      this.loading = false;
    },
    handleApiSuccess(res, redirectRoute) {
      this.clearPreviousError();
      this.$store.dispatch("showSnackbar", {
        text: res.message || this.$t("message.successSubmit"),
        color: "success",
      });
      if (redirectRoute) {
        this.$router.push({ path: this.localePath(redirectRoute) });
      }
    },
    handleApiErrors(err) {
      console.log(err)
      this.clearPreviousError();
      let resBody = err.response;
      let code = resBody.status;
      let errMessage =
        resBody && resBody.message
          ? resBody.message
          : null;

      if (code == 422) {
        let errors = resBody.errors;
        this.errorMessage = this.$t("message.invalidInput");
        this.formErrors = errors;
      } else if (code == 400) {
        this.$store.dispatch("showSnackbar", {
          text: errMessage || this.$t("message.errorSubmit"),
          color: "error",
        });
      } else {
        this.$store.dispatch("showSnackbar", {
          text: errMessage || this.$t("message.unknownError"),
          color: "error",
        });
      }
    },
    async handleFileSelect(files, field) {
      let data = null;
      let isMultiple = Array.isArray(files);

      try {
        if (isMultiple) {
          data = [];
          files.forEach(async (file) => {
            data.push(await this.$helper.getBase64(file));
          });
        } else {
          data = await this.$helper.getBase64(files);
        }
        this.formModel[field] = data;
      } catch (err) {
        this.$store.dispatch("showSnackbar", {
          text: this.$t("message.fileConvertError"),
          color: "error",
        });
      }
    },
  },
};
