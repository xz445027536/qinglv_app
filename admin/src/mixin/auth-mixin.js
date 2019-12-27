import { getCurrentUserRole } from '../api/auth'

export let currentUserRole$ = ''
export let currentRoleName$ = ''

const roleNameList = ['全局管理员', 'App 管理员', '接口人', '工程师', '游客']

export const getCurrentUserRole$ = (userCode) => {
  return getCurrentUserRole(userCode).then(res => {
    currentUserRole$ = res.data
    currentRoleName$ = roleNameList[res.data]
    // console.info('auth-mixin currentUserRole$: ', currentUserRole$)
  }).catch(err => {
    console.log('getCurrentUserRole: ', err)
  })
}

// export const isGlobalAdmin$ = () => {
//   return currentUserRole$ === '0'
// }
//
// export const isAppAdmin$ = () => {
//   return currentUserRole$ === '1'
// }
//
// export const isInterfacePerson$ = () => {
//   return currentUserRole$ === '2'
// }
//
// export const isEngineer$ = () => {
//   return currentUserRole$ === '3'
// }
//
// export const isTourist$ = () => {
//   return currentUserRole$ === '4'
// }

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
