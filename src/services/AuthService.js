import { server } from "./../config/AxiosProvider";

const AuthService = (() => {
  function login(credentials) {
    return server.post("/login", credentials);
  }

  return {
    login
  };
})();

export default AuthService;