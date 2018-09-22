import { server } from "./../config/AxiosProvider";

const OpsService = (token => {
  function createBillet(body, token) {

    return server.post("/ops/billet", body, {
      headers: {
        Authorization: token
      }
    });
  }

  return {
    createBillet
  };
})();

export default OpsService;