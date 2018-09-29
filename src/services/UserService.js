import { server } from "./../config/AxiosProvider";

const UserService = (token => {
  function getUser(token) {
    return server.get("/user", {
      headers: {
        Authorization: token
      }
    });
  }

  function getHistory(token, from = 30, take = 0) {
    return server.get("/user/history", {
      params: {
        from,
        take
      },
      headers: {
        Authorization: token
      }
    });
  }

  function getUserBankAccounts(token) {
    return server.get("/bank_account", {
      headers: {
        Authorization: token
      }
    });
  }


  return {
    getUser,
    getHistory,
    getUserBankAccounts
  };
})();

export default UserService;