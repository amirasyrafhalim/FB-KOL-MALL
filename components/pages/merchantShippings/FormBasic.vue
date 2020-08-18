<template>
   <div class="components__merchant-shipping--form-basic">

      <v-autocomplete
         :items="dropdownPostcode"
         :label="$t('label.postcode')"
         :error-messages="formErrors ? formErrors.postcode_id: ''"
         item-text="code"
         item-value="id"
         v-model="formModel.postcode_id"
         @input.native="fetchPostcode($event.target.value)"
      ></v-autocomplete>

      <!--<v-subheader class="pa-0">{{ $t('Charge By Weight') }}</v-subheader>-->
      <v-switch
         v-model="formModel.charge_by_weight"
         :label="`Charge By Weight: ${formModel.charge_by_weight === '0' ? $t('label.no') : $t('label.yes')}`"
         true-value="1"
         false-value="0"
         :error-messages="formErrors ? formErrors.charge_by_weight : ''"
      ></v-switch>

      <v-subheader class="pa-0">{{ $t('label.rules') }}</v-subheader>

      <!--charge by weight-->
      <div v-if="this.formModel.charge_by_weight === '1'">
         <v-btn @click="addRule">{{ $t('label.addRule')}}</v-btn>
         <v-spacer></v-spacer>
         <v-row wrap v-for="(input, key) in chargeByWeightRules" :key="key">
            <v-col cols="3">
               <v-text-field
                  :label="$t('label.min')"
                  :error-messages="formErrors ? formErrors['rules.' + key + '.min'] : ''"
                  :hint="$t('label.weight')"
                  suffix="g"
                  v-model="input.min"
               ></v-text-field>
            </v-col>
            <v-col cols="3">
               <v-text-field
                  :label="$t('label.max')"
                  :error-messages="formErrors ? formErrors['rules.' + key + '.max'] : ''"
                  :hint="$t('label.weight')"
                  suffix="g"
                  v-model="input.max"
               ></v-text-field>
            </v-col>
            <v-col cols="3">
               <v-text-field
                  :label="$t('label.price')"
                  :error-messages="formErrors ? formErrors['rules.' + key + '.price'] : ''"
                  prefix="RM"
                  v-model="input.price"
               ></v-text-field>
            </v-col>
            <v-col>
               <v-btn color="error" fab small @click="removeRule(key)">
                  <v-icon>mdi-close</v-icon>
               </v-btn>
            </v-col>
         </v-row>
      </div>

      <!--not charge by weight-->
      <div v-if="this.formModel.charge_by_weight === '0'">
         <v-row wrap>
            <v-col class="py-0">
               <v-text-field
                  class="mt-0 pt-0"
                  :label="$t('label.price')"
                  :error-messages="formErrors ? formErrors.price : ''"
                  prefix="RM"
                  v-model="price"
               ></v-text-field>
            </v-col>
         </v-row>
      </div>

      <crud-form-action
         backPath="merchantShippings"
         :loading="loading"
         @submit="submit">
      </crud-form-action>
   </div>
</template>

<script>
  import AlertFormError from "@/components/widgets/alerts/AlertFormError";
  import CrudFormAction from "@/components/widgets/forms/CrudFormAction";

  import formMixin from "@/mixins/form";

  export default {
    name: "FormBasic",
    mixins: [formMixin],
    props: ["record"],
    components: {
      AlertFormError,
      CrudFormAction
    },
    data() {
      return {
        moduleName: "merchantShippings",
        isCreate: true,
        price: null,
        chargeByWeightRules:[],
        formModel: {
          postcode_id: null,
          charge_by_weight: "0"
        }
      };
    },
    computed: {
      dropdownPostcode() {
        return this.$store.state[this.moduleName].dropdownPostcode;
      },
    },
    watch: {
      record(value) {
        if (value !== "undefined") {
          this.isCreate = false;
          this.formModel = this.$helper.jsonReparse(value);
          this.formModel.charge_by_weight = JSON.stringify(value.charge_by_weight);
          if (value.rules.length > 0){
            value.rules.forEach((data, key) => {
              this.chargeByWeightRules.push(data);
            });
          } else {
            this.price = value.rules.price;
          }
        }
      }
    },
    created() {
      this.fetchPostcode();
    },
    methods: {
      addRule() {
        this.chargeByWeightRules.push({
          min: null,
          max: null,
          price: null
        });
      },
      removeRule(key) {
        this.chargeByWeightRules.splice(key, 1);
      },
      fetchPostcode(value) {
        this.$store.dispatch(`${this.moduleName}/fetchPostcode`, {
          routeName: "getAllPostcode",
          stateKey: "dropdownPostcode",
          code:value
        });
      },
      async submit() {
        this.loading = true;

        try {
          if (this.formModel.charge_by_weight === '1'){
            this.formModel.rules = this.chargeByWeightRules;
          } else {
            this.formModel.rules = {price:this.price};
          }

          let res = this.isCreate
            ? await this.$api.merchantShippings.create(this.formModel)
            : await this.$api.merchantShippings.update(this.formModel, this.record.id);

          this.handleApiSuccess(res, "merchantShippings");
        } catch (err) {
          this.handleApiErrors(err);
        }
      }
    }
  };
</script>

<style scoped>

</style>
