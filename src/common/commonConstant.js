// 门户端
export const PORTAL_MENUS = [{
  label: '平台首页',
  path: '/homePage',
  name: 'homePage'
},
{
  label: '政策资讯',
  path: '',
  name: '',
  children: [
    {
      label: '资讯动态',
      path: '/dynamics',
      name: 'dynamics',
      oneLevelName: '政策资讯'
    },
    {
      label: '惠企政策',
      path: '/entPolicy',
      name: 'entPolicy',
      oneLevelName: '政策资讯'
    }
  ]
},
/* {
  label: '惠企政策',
  path: '/entPolicy',
  name: 'entPolicy'
}, */
{
  label: '申报导航',
  path: '/navigation',
  name: 'navigation'
},
{
  label: '企业服务',
  path: '',
  name: '',
  children: [
    {
      label: '服务超市',
      path: '/marketServiceDetail',
      name: 'marketServiceDetail',
      oneLevelName: '企业服务'
    },
    {
      label: '活动中心',
      path: '/entCultivation',
      name: 'entCultivation',
      oneLevelName: '企业服务'
    },
    {
      label: '需求广场',
      path: '/entNeeds',
      name: 'entNeeds',
      oneLevelName: '企业服务'
    }
  ]
},
// {
//   label: '活动中心',
//   path: '/entCultivation',
//   name: 'entCultivation'
// },
// {
//   label: '部门之窗',
//   path: '/department',
//   name: 'department'
// },
{
  label: '政务服务',
  path: '',
  name: '',
  children: [
    {
      label: '部门之窗',
      path: '/department',
      name: 'department',
      oneLevelName: '政务服务'
    },
    {
      label: '镇街服务',
      path: '/streetService',
      name: 'streetService',
      oneLevelName: '政务服务'
    },
    {
      label: '园区风采',
      path: '/parkStyle',
      name: 'parkStyle',
      oneLevelName: '政务服务'
    }
  ]
},
/* {
  label: '企业诉求',
  path: '/entDemands',
  name: 'entDemands'
}, */
// {
//   label: '园区风采',
//   path: '/parkStyle',
//   name: 'parkStyle'
// },
// {
//   label: '需求广场',
//   path: '/entNeeds',
//   name: 'entNeeds'
// },

{
  label: '厂房租赁',
  path: '/plantRental',
  name: 'plantRental'
},
{
  label: '企业问卷',
  path: '/business',
  name: 'business'
},
{
  label: '企业诊断',
  path: '/entDiagnosis',
  name: 'entDiagnosis'
}];

// 门户底部菜单栏跳转
export const FOOTER_MENUS = [
  {
    label: '平台首页',
    path: '/home',
    name: 'home'
  },
  {
    label: '资讯动态',
    path: '/dynamics',
    name: 'dynamics'
  },
  {
    label: '惠企政策',
    path: '/entPolicy',
    name: 'entPolicy'
  },
  {
    label: '申报导航',
    path: '/navigation',
    name: 'navigation'
  },
  {
    label: '服务超市',
    path: '/marketServiceDetail',
    name: 'marketServiceDetail'
  },
  {
    label: '活动中心',
    path: '/entCultivation',
    name: 'entCultivation'
  },
  {
    label: '部门之窗',
    path: '/department',
    name: 'department'
  },
  {
    label: '镇街服务',
    path: '/streetService',
    name: 'streetService'
  },
  {
    label: '园区风采',
    path: '/parkStyle',
    name: 'parkStyle'
  },
  {
    label: '需求广场',
    path: '/entNeeds',
    name: 'entNeeds'
  },

  {
    label: '厂房租赁',
    path: '/plantRental',
    name: 'plantRental'
  },
  {
    label: '企业问卷',
    path: '/business',
    name: 'business'
  }
];

// 门户侧边导航
export const leftNavTree = [
  {
    id: 'xqk',
    label: '政策资讯',
    name: 'xqk',
    icon: '',
    active: false
  },
  {
    id: 'xqb',
    label: '项目活动',
    name: 'xqb',
    icon: '',
    active: false
  },
  {
    id: 'xqf',
    label: '服务超市',
    name: 'xqf',
    icon: '',
    active: false
  },
  {
    id: 'xqt',
    label: '联系政府',
    name: 'xqt',
    icon: '',
    active: false
  }
];

// 门户模块跳转
export const IndexModuleSkipList = [
  { id: 1, name: '惠企政策', detailUrl: 'policyDetail', listUrl: 'entPolicy' },
  { id: 2, name: '申报导航', detailUrl: 'detail', listUrl: 'navigation' },
  { id: 3, name: '服务超市', detailUrl: 'marketDetail', listUrl: 'marketServiceDetail' },
  { id: 4, name: '资讯动态', detailUrl: 'dynamicsDetail', listUrl: 'dynamics' },
  { id: 5, name: '企业风采', detailUrl: 'entStyleDetail', listUrl: 'entStyle' },
  { id: 6, name: '活动中心', detailUrl: 'entCultivationDetail', listUrl: 'entCultivation' }
];
