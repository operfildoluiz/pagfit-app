import { server } from "../config/AxiosProvider";

const PaylinkService = (token => {
  function createPaylink(body, token) {

    return server.post("/paylink", body, {
      headers: {
        Authorization: token
      }
    });
  }

  function getPaylink(code, token) {

    return server.get("/paylink/" + code, {
      headers: {
        Authorization: token
      }
    });
  }

  return {
    createPaylink,
    getPaylink
  };
})();

export default PaylinkService;