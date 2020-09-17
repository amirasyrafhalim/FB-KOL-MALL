export default ({route, app}, inject) => {
  const navigation = {
    index: {
      title: 'Dashboard'
    },
    merchantPage: {
      title: 'Pages',
      breadcrumb: [{title: 'Page', url: '/merchantPage'}, {title: 'List', active: true}]
    },
    products: {
      title: 'Products',
      breadcrumb: [{title: 'Products', url: '/products'}, {title: 'List', active: true}]
    },
    campaigns: {
      title: 'Campaigns',
      breadcrumb: [{title: 'Campaigns', url: '/campaigns'}, {title: 'List', active: true}]
    },
    campaignsId: {
      title: 'Packages',
      breadcrumb: [{title: 'Campaigns', url: '/campaigns'}, {title: 'Packages'}, {title: 'List', active: true}]
    },
    orders: {
      title: 'Orders',
      breadcrumb: [{title: 'Orders', url: '/orders'}, {title: 'List', active: true}]
    },
    userprofile: {
      title: 'User Profile',
      breadcrumb: [{title: ' Profile', url: '/userprofile'}, {title: 'Information', active: true}]
    },
    userprofileIdEdit: {
      title: 'Edit',
      breadcrumb: [{title: 'Profile', url: '/userprofile'}, {title: 'Edit Information', active: true}]
    },
    merchantPageIdLiveVideo: {
      title: 'Live Videos',
      breadcrumb: [
        {title: 'Page', url: '/merchantPage'},
        {title: 'Live Videos'},
        {title: 'List', active: true}
      ]
    },
    videos: {
      title: 'Videos',
      breadcrumb: [{title: 'Videos', url: '/videos'}, {title: 'List', active: true}]
    },
    videosId: {
      title: 'Video Console',
      breadcrumb: [{title: 'Videos', url: '/videos'}, {title: 'Console', active: true}]
    },
    settings: {
      title: 'Settings',
      breadcrumb: [{title: 'Settings', url: '/settings'}, {title: 'List', active: true}]
    },
    settingsShippings: {
      title: 'Shippings',
      breadcrumb: [{title: 'Settings', url: '/settings'}, {
        title: 'Shippings',
        url: '/settings/shippings'
      }, {title: 'List', active: true}]
    }
  };

  inject('navigation', navigation);
};
