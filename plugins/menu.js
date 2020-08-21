export default ({ app }, inject) => {
  const menu = {
    admin: [
      {
        text: app.i18n.t("menuTitle.dashboard"),
        path: "/"
      },
      {
        text: app.i18n.t("menuTitle.page"),
        path: "facebook_page"
      },
      {
        text: app.i18n.t("menuTitle.product"),
        path: "products"
      },
      {
        text: app.i18n.t("menuTitle.campaign"),
        path: "campaigns" 
      },
      {
        text: app.i18n.t("menuTitle.order"),
        path: "orders"
      },
      
      
      {
        text: app.i18n.t("menuTitle.analytic"),
        path: "buyers"
      },
      {
        text: app.i18n.t("menuTitle.customer"),
        path: "users"
      }
    ],
    verifiedMerchant: [
      {
        icon: "mdi-home",
        text: app.i18n.t("menuTitle.dashboard"),
        path: "/"
      }, {
        icon: "mdi-briefcase-account",
        text: app.i18n.t("menuTitle.facebookPage"),
        path: "facebook_page"
      },
      {
        icon: "mdi-hexagon-multiple",
        text: app.i18n.t("menuTitle.product"),
        path: "products"
      },
      // {
      //   icon: "mdi-van-utility",
      //   text: app.i18n.t("menuTitle.merchantShippings"),
      //   children: [
      //     {
      //       text: app.i18n.t("label.add"),
      //       name: "merchantShippings-create",
      //       path: "merchantShippings-create"
      //     },
      //     {
      //       text: app.i18n.t("label.manage"),
      //       name: "merchantShippings-index",
      //       path: "merchantShippings"
      //     }
      //   ]
      // },
      {
        icon: "mdi-calendar-star",
        text: app.i18n.t("menuTitle.campaign"),
        path: "campaigns"
      },
      {
        icon: "mdi-order-bool-ascending",
        text: app.i18n.t("menuTitle.order"),
        path: "orders"
      }
    ],
    merchant: [
      {
        icon: "mdi-view-dashboard",
        text: app.i18n.t("menuTitle.dashboard"),
        path: "/"
      },
      {
        icon: "mdi-briefcase-account",
        text: app.i18n.t('pageTitle.company.detail'),
        path: 'companyDetails' ,
      },
    ],
  };

  inject("menu", menu);
};
