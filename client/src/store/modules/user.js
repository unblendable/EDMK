import { login, logout, getInfo } from '@/api/user'
import { MessageBox } from 'element-ui'
import { getToken, setToken, removeToken } from '@/utils/auth'
import * as toolbox from '@/utils/toolbox'
import moment from 'moment'
import router, { resetRouter } from '@/router'

const state = {
  token: getToken(),
  name: '',
  avatar: '',
  introduction: '',
  roles: [],
  user_type_options: [],
  title_name_options: [],
  data_table: []
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_INTRODUCTION: (state, introduction) => {
    state.introduction = introduction
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USER_TYPE_OPTIONS: (state, items) => {
    state.user_type_options = items
  },
  SET_TITLE_NAME_OPTIONS: (state, items) => {
    state.title_name_options = items
  },
  SET_DATA_TABLE(state, items) {
    state.data_table = items
  },
  REMOVE_ROW(state, index) {
    state.data_table.splice(index, 1)
  },
  ADD_USER_TO_TABLE(state, item) {
    state.data_table.unshift(item)
  }
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    if (!(userInfo.username && userInfo.password)) {
      return MessageBox('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง', 'แจ้งเตือน', 'warning')
    }
    return new Promise(async(resolve, reject) => {
      const result = await toolbox.post_api('user/login', userInfo)
      if (result.status === 200) {
        commit('SET_TOKEN', 'admin-token')
        setToken('admin-token')
        resolve()
      } else {
        MessageBox('ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง', 'แจ้งเตือน', 'warning')
        reject()
      }
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = {
        roles: ['admin'],
        name: 'Super Admin',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        introduction: 'May the force be with you'
      }
      const { roles, name, avatar, introduction } = data
      commit('SET_ROLES', roles)
      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      commit('SET_INTRODUCTION', introduction)
      resolve(data)
      // getInfo(state.token).then(response => {
      //   const { data } = response
      //   if (!data) {
      //     reject('Verification failed, please Login again.')
      //   }

      //   const { roles, name, avatar, introduction } = data

      //   // roles must be a non-empty array
      //   if (!roles || roles.length <= 0) {
      //     reject('getInfo: roles must be a non-null array!')
      //   }
      //   commit('SET_ROLES', roles)
      //   commit('SET_NAME', name)
      //   commit('SET_AVATAR', avatar)
      //   commit('SET_INTRODUCTION', introduction)
      // }).catch(error => {
      //   reject(error)
      // })
    })
  },

  // user logout
  logout({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      logout(state.token).then(() => {
        commit('SET_TOKEN', '')
        commit('SET_ROLES', [])
        removeToken()
        resetRouter()

        // reset visited views and cached views
        // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
        dispatch('tagsView/delAllViews', null, { root: true })

        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // remove token
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  },

  // dynamically modify permissions
  changeRoles({ commit, dispatch }, role) {
    return new Promise(async resolve => {
      const token = role + '-token'

      commit('SET_TOKEN', token)
      setToken(token)

      const { roles } = await dispatch('getInfo')

      resetRouter()

      // generate accessible routes map based on roles
      const accessRoutes = await dispatch('permission/generateRoutes', roles, { root: true })

      // dynamically add accessible routes
      router.addRoutes(accessRoutes)

      // reset visited views and cached views
      dispatch('tagsView/delAllViews', null, { root: true })

      resolve()
    })
  },

  async getUserMemberList({ commit }) {
    const result = await toolbox.post_api('user/getUserMemberList')
    if (result.status === 200) {
      commit('SET_DATA_TABLE', result.data)
    } else {
      MessageBox('เกิดข้อผิดพลาด [GET USER MEMBER]', 'แจ้งเตือน', 'warning')
    }
  },

  async getUserType({ commit }) {
    const result = await toolbox.post_api('user/getUserTypeList')
    if (result.status === 200) {
      commit('SET_USER_TYPE_OPTIONS', result.data)
    } else {
      MessageBox('เกิดข้อผิดพลาด [GET USER TYPE]', 'แจ้งเตือน', 'warning')
    }
  },

  async getTitleNameList({ commit }) {
    const result = await toolbox.post_api('user/getTitleNameList')
    if (result.status === 200) {
      commit('SET_TITLE_NAME_OPTIONS', result.data)
    } else {
      MessageBox('เกิดข้อผิดพลาด [GET TITLE NAME]', 'แจ้งเตือน', 'warning')
    }
  },

  async createUser({ commit }, formdata) {
    const result = await toolbox.post_api('user/register', formdata)
    if (result.status === 200) {
      formdata.created_at = moment().format('DD/MM/YYYY')
      commit('ADD_USER_TO_TABLE', formdata)
      MessageBox('เพิ่มข้อมูลสำเร็จ', 'แจ้งเตือน', 'success')
    } else {
      MessageBox('เกิดข้อผิดพลาด', 'แจ้งเตือน', 'warning')
    }
  },

  async removeUser({ commit }, row_data) {
    const result = await toolbox.post_api('user/deleteUserMember', row_data)
    if (result.status === 200) {
      commit('REMOVE_ROW', row_data.index)
      MessageBox('ลบข้อมูลสำเร็จ', 'แจ้งเตือน', 'success')
    } else {
      MessageBox('เกิดข้อผิดพลาด', 'แจ้งเตือน', 'warning')
    }
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
