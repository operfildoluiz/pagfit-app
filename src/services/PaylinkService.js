import { server } from "../config/AxiosProvider";

const PaylinkService = (token => {
  function createPaylink(body, token) {

    return server.post("/paylink", body, {
      headers: {
        Authorization: token
      }
    });
  }

  return {
    createPaylink
  };
})();

export default PaylinkService;