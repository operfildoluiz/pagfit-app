import { server } from "./../config/AxiosProvider";

const OpsService = (token => {
  function createBillet(body, token) {
    return server.post("/ops/billet", body, {
      headers: {
        Authorization: token
      }
    });
  }

  function scheduleWithdrawal(body, token) {
    return server.post("/ops/withdrawal", body, {
      headers: {
        Authorization: token
      }
    });
  }


  function getPayauthToken(body, token) {
    return server.post("/ops/auth", body, {
      headers: {
        Authorization: token
      }
    });
  } 
  
  function pay(body, token) {
    return server.post("/ops/pay", body, {
      headers: {
        Authorization: token
      }
    });
  }  

  return {
    createBillet,
    getPayauthToken,
    scheduleWithdrawal,
    pay
  };
})();

export default OpsService;