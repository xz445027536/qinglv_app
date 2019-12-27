import { getCurrentUserRole } from '../api/auth'

export let currentUserRole$ = ''
export let currentRoleName$ = ''

// 游客角色已不存在
const roleNameList = ['全局管理员', 'App 管理员', '接口人', '工程师', '游客', '普通用户']

export const getCurrentUserRole$ = () => {
  return getCurrentUserRole().then(res => {
    currentUserRole$ = res.data
    currentRoleName$ = roleNameList[res.data]
    console.info('auth-mixin currentUserRole$: ', currentUserRole$)
  }).catch(err => {
    console.log('getCurrentUserRole: ', err)
  })
}

export default {
  data: () => ({
    currentUserRole$,
    currentRoleName$
  }),
  computed: {
    // isGlobalAdmin$,
    // isAppAdmin$,
    // isInterfacePerson$,
    // isEngineer$,
    // isTourist$
  }
}
