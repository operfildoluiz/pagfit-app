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

  function getBankAccount(token, id) {
    return server.get("/bank_account/" + id, {
      headers: {
        Authorization: token
      }
    });
  }  

  function editOrCreateBankAccount(body, token) {

    if (body.id !== null) {
      return server.post("/bank_account/" + body.id, body, {
        headers: {
          Authorization: token
        }
      });
    }

    return server.post("/bank_account", body, {
      headers: {
        Authorization: token
      }
    });
  }

  function deleteBankAccount(token, id) {
    return server.delete("/bank_account/" + id, {
      headers: {
        Authorization: token
      }
    });
  }  

  return {
    getUser,
    getHistory,
    getUserBankAccounts,
    getBankAccount,
    editOrCreateBankAccount,
    deleteBankAccount
  };
})();

export default UserService;