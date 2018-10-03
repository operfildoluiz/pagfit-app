import { server } from "./../config/AxiosProvider";

const AuthService = (() => {
  function login(credentials) {
    return server.post("/login", credentials);
  }

  function register(obj) {
    return server.post("/register", obj);
  }

  return {
    login,
    register
  };
})();

export default AuthService;