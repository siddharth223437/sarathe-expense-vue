class AuthUtil {

  isUserLoggedIn(){
    return this.getUser() !== null;
  }

  getUser(){
    return sessionStorage.getItem('_user');
  }

  getAuthToken(){
    return sessionStorage.getItem('_token');
  }

  removeUser(){
    sessionStorage.removeItem('_user');
  }

  removeAuthToken(){
    sessionStorage.removeItem('_token');
  }

}

export default new AuthUtil();
