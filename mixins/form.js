export default {
	data() {
		return {
			loading: false,
			formErrors: [],
			errorMessage: null
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
			this.$vs.notify({
				color: 'success',
				title: 'Success',
				position: "bottom-left",
				text: res.message || this.$t('message.successSubmit')
			});
			if (redirectRoute) {
				this.$router.push({ path: this.localePath(redirectRoute) });
			}
		},
		handleApiErrors(err) {
			this.clearPreviousError();
			let resBody = err.response;
			let code = resBody.data.http_code;
			let errMessage = resBody.data.errors ? resBody.data.errors.message : null;
			if (code == 422) {
				let errors = resBody.data.errors;
				this.errorMessage = errMessage || this.$t('message.invalidInput');
				this.formErrors = errors;
			} else if (code == 400) {
				this.$vs.notify({
					color: 'danger',
					title: 'Error',
					position: "bottom-left",
					text: errMessage || this.$t('message.errorSubmit')
				});
			} else {
				this.$vs.notify({
					color: 'danger',
					title: 'Error',
					position: "bottom-left",
					text: errMessage || this.$t('message.unknownError')
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
				this.$store.dispatch('showSnackbar', {
					text: this.$t('message.fileConvertError'),
					color: 'error'
				});
			}
		}
	}
};
