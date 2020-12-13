import AuthUtil from '~/util/AuthUtil'

export const state = () => ({
  username: null
})

export const getters =  {
  getUsername: state => {
    return state.username;
  }
}

export const mutations = {
  setUsername(state){
    state.username = AuthUtil.getUser();
  }
}
