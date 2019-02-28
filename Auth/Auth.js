//this file is create to provide verification of the header authorisation

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiJhcGlfY2FsbCJ9.kbFBlWtg4UBlwA9IOhazIMqxiGPziu0XXbFjS5oc4PA";

//this method check the header and see if the request is valid for security issues
const isAuthorize = (req, res, next) => {
  if (req.headers.key_auth && req.headers.key_auth === API_KEY) {
    next();
  } else {
    res.send(
      JSON.stringify({
        response: "error",
        message: "cle d'autorisation inexistante ou incorrect"
      })
    );
  }
};

module.exports = isAuthorize;
