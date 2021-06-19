import Axios from "axios";
import Cookies from 'js-cookie';
import jwt_decode from "jwt-decode";
Axios.defaults.withCredentials = true;

class Auth {
  header(){
    const accessToken = Cookies.get("access")
    console.log("getting header")
    if(accessToken){
      console.log("true")
      return { 'x-access-token': accessToken } 
      // return accessToken
    }
    else{
      console.log("false")
      return {}
    }
  }

  async login(username, password) {
    return await Axios.post("http://localhost:3005/user-login", {username,password})
      .then(response => {
        if(response.data.message){
          console.log(response.data.message)
          let error = {msg: response.data.message}
          return error;
        }
        Cookies.set("access",response.data.accessToken)
        Cookies.set("refresh",response.data.refreshToken)
        
        return;
      });
  }

  logout(){
    Cookies.remove("access")
    Cookies.remove("refresh")
    return true;
  }

  async registerStore(userId, store_name, manager_name, location, logo) {
    await Axios.post(`http://localhost:3005/store-registration/${userId}`, {store_name, manager_name, location, logo})
            .then((response) => {
              if(response.data.message){
                let error = {msg: response.data.message}
                return error;
              }
              else{
                console.log(response);
                return;
              }
            })
            .catch(error => {
              console.log(error.response)
            })
  }
  
  async hasAccess(){
    console.log("checking access");
    let accessToken = Cookies.get("access")
    let refreshToken = Cookies.get("refresh")
    console.log(accessToken)
    // no tokens
    if(!refreshToken){
      console.log("no refresh token")
      return false;
    }
    // check if access token is expired
    let decodedToken = jwt_decode(accessToken)
    let current_time = new Date().getTime() / 1000;

    // if expired, create new token
    if(decodedToken.exp < current_time){
      console.log("expired")
      console.log(`refreshtoken: ${refreshToken}`)
      await Axios.post("http://localhost:3005/renewToken", {refreshToken: refreshToken})
      .then((response)=> {
        if(response.data.accessToken){
          console.log("new token")
          Cookies.set("access",response.data.accessToken)
          console.log(Cookies.get("access"))
          return true;
        }
        else{
          console.log(response.data.message)
          return false;
        }
      })
    }
    // access token is still valid
    else{
      console.log("valid")
      return true;
    }
  }
}

export default new Auth();