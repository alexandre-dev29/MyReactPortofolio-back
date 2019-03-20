//this file is create to provide verification of the header authorisation

const API_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ3ZWJzaXRlIjoiYXhlbG13ZW56ZS5jb20iLCJvd25lciI6ImF4ZWwgbXdlbnplIiwia2V5IjoiZG9uJ3QgZW50ZXIgdGhpcyBpcyBteSBwb3J0b2ZvbGlvIn0.HCAOtzWwVBWW7x3kq2dSQY9o_plolhAT0nFVawMyxNM";

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
