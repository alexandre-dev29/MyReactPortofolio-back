//this file is create to provide verification of the header authorisation

const API_KEY = process.env.API_KEY;
//this method check the header and see if the request is valid for security issues
const isAuthorize = (req, res, next) => {
  if (req.get('Authorization') &&  `Bearer ${API_KEY}` === req.get('Authorization')) {
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
