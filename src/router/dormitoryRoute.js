/**
 * dormitory 模块所需的子路由
 */

const dormitoryRoute = [
  // 宿舍缴费列表页面
  {
    path: 'dorPayment',
    name: 'dorPayment',
    component: () => import('@views/dormitoryModule/dorPayment'),
    meta: {
      title: '宿舍缴费'
    }
  },
  // 添加宿舍缴费页面
  {
    path: 'dorPaymentAdd',
    name: 'dorPaymentAdd',
    component: () => import('@views/dormitoryModule/dorPaymentAdd'),
    meta: {
      title: '新增宿舍缴费'
    }
  },
  //宿舍 缴费汇总页面
  {
    path: 'dorPaymentCalculate',
    name: 'dorPaymentCalculate',
    component: () => import('@views/dormitoryModule/dorPaymentCalculate'),
    meta: {
      title: '缴费汇总'
    }
  },
  // 宿舍报修页面
  {
    path: 'dorRepair',
    name: 'dorRepair',
    component: () => import('@views/dormitoryModule/dorRepair'),
    meta: {
      title: '宿舍报修'
    }
  },
  // 宿舍申请页面
  {
    path: 'dorApply',
    name: 'dorApply',
    component: () => import('@views/dormitoryModule/dorApply'),
    meta: {
      title: '宿舍申请'
    }
  },
  // 宿舍投诉与建议页面
  {
    path: 'dorSuggest',
    name: 'dorSuggest',
    component: () => import('@views/dormitoryModule/dorSuggest'),
    meta: {
      title: '投诉与建议'
    }
  }, 
  // 宿舍投诉与建议页面
  {
    path: 'dorSuggestEdit',
    name: 'dorSuggestEdit',
    component: () => import('@views/dormitoryModule/dorSuggestEdit'),
    meta: {
      title: '投诉与建议审核'
    }
  },
  // 宿舍检查页面
  {
    path: 'dorCheck',
    name: 'dorCheck',
    component: () => import('@views/dormitoryModule/dorCheck'),
    meta: {
      title: '宿舍检查'
    }
  },
  // 宿舍检查新增
  {
    path: 'dorCheckAdd',
    name: 'dorCheckAdd',
    component: () => import('@views/dormitoryModule/dorCheckAdd'),
    meta: {
      title: '新增宿舍检查'
    }
  },
  // 学生个人申请页面
  {
    path: 'stuApply',
    name: 'stuApply',
    component: () => import('@views/dormitoryModule/stuApply'),
    meta: {
      title: '学生个人申请'
    }
  },
  // 学生个人宿舍物品页面
  {
    path: 'stuBelongings',
    name: 'stuBelongings',
    component: () => import('@views/dormitoryModule/stuBelongings'),
    meta: {
      title: '学生宿舍个人物品'
    }
  },
  // 学生离返校登记页面
  {
    path: 'stuLeaveAndReturn',
    name: 'stuLeaveAndReturn',
    component: () => import('@views/dormitoryModule/stuLeaveAndReturn'),
    meta: {
      title: '离返校登记'
    }
  }
]

export default dormitoryRoute