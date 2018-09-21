import { server } from "./../config/AxiosProvider";

const UserService = (token => {
  function getUser(token) {
    return server.get("/user", {
      headers: {
        Authorization: token
      }
    });
  }

  function getHistory(token, from = 30) {
    return server.get("/user/history", {
      params: {
        from
      },
      headers: {
        Authorization: token
      }
    });
  }


  return {
    getUser,
    getHistory
  };
})();

export default UserService;