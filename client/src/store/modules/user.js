import { login, logout, getInfo } from '@/api/user'
import { MessageBox } from 'element-ui'
import { getToken, setToken, removeToken } from '@/utils/auth'
import moment from 'moment'
import router, { resetRouter } from '@/router'
import axios from 'axios'
axios.defaults.headers = {
  'Content-Type': 'application/json'
}
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
    // return  new Promise((resolve, reject)=>{
    //   axios.post(SERV_API+'user/login', userInfo)
    //   .then((response)=>{
    //     if(response.data.status === 200){
    //       commit('SET_TOKEN', 'admin_token')
    //       setToken('admin-token')
    //       resolve()
    //     }else{
    //       MessageBox('ชื่อผู้ใช้งานหรือรหัสผ่านผิดพลาด', 'แจ้งเตือน', 'warning')
    //       reject()
    //     }
    //   })
    // })
    const { username, password } = userInfo
    return new Promise((resolve, reject) => {
      login({ username: username.trim(), password: password }).then(response => {
        const { data } = response
        commit('SET_TOKEN', data.token)
        setToken(data.token)
        resolve()
      }).catch(error => {
        reject(error)
      })
    })
  },

  // get user info
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getInfo(state.token).then(response => {
        const { data } = response

        if (!data) {
          reject('Verification failed, please Login again.')
        }

        const { roles, name, avatar, introduction } = data

        // roles must be a non-empty array
        if (!roles || roles.length <= 0) {
          reject('getInfo: roles must be a non-null array!')
        }

        commit('SET_ROLES', roles)
        commit('SET_NAME', name)
        commit('SET_AVATAR', avatar)
        commit('SET_INTRODUCTION', introduction)
        resolve(data)
      }).catch(error => {
        reject(error)
      })
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

  getUserMemberList({ commit }) {
    return new Promise(async resolve => {
      axios.post(SERV_API + 'user/getUserMemberList')
        .then((res) => {
          if (res.data.status === 200) {
            console.log(res.data.data)
            commit('SET_DATA_TABLE', res.data.data)
            resolve()
          } else {
            MessageBox('ไม่พบรายชื่อผู้ใช้งาน', 'แจ้งเตือน', 'warning')
            reject()
          }
        })
    })
  },

  getUserType({ commit }) {
    return new Promise(async resolve => {
      axios.get(SERV_API + 'user/getUserTypeList')
        .then((res) => {
          if (res.data.status === 200) {
            commit('SET_USER_TYPE_OPTIONS', res.data.data)
            resolve()
          } else {
            MessageBox('เกิดข้อผิดพลาด [GET USER TYPE]', 'แจ้งเตือน', 'warning')
            reject()
          }
        })
    })
  },

  getTitleNameList({ commit }) {
    return new Promise(async resolve => {
      axios.get(SERV_API + 'user/getTitleNameList')
        .then((res) => {
          if (res.data.status === 200) {
            commit('SET_TITLE_NAME_OPTIONS', res.data.data)
            resolve()
          } else {
            MessageBox('เกิดข้อผิดพลาด [GET TITLE NAME]', 'แจ้งเตือน', 'warning')
            reject()
          }
        })
    })
  },

  createUser({ commit }, formdata) {
    axios.post(SERV_API + 'user/register', formdata)
      .then(res => {
        if (res.data.status === 200) {
          formdata.created_at = moment().format('DD/MM/YYYY')
          commit('ADD_USER_TO_TABLE', formdata)
          MessageBox('เพิ่มข้อมูลสำเร็จ', 'แจ้งเตือน', 'success')
        } else {
          MessageBox('เกิดข้อผิดพลาด', 'แจ้งเตือน', 'warning')
        }
      })
  },

  removeUser({ commit }, row_data) {
    axios.post(SERV_API + 'user/deleteUserMember', row_data)
      .then(res => {
        if (res.data.status === 200) {
          commit('REMOVE_ROW', row_data.index)
          MessageBox('ลบข้อมูลสำเร็จ', 'แจ้งเตือน', 'success')
        } else {
          MessageBox('เกิดข้อผิดพลาด', 'แจ้งเตือน', 'warning')
        }
      })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
