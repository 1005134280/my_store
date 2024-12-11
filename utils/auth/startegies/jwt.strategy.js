const { Strategy, ExtractJwt } = require('passport-jwt');


const { config } = require('../../../config/config');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret,
  };
  
  const JwtStrategy = new Strategy(options, (jwt_payload, done) => {
    
    return done(null, jwt_payload);
  });
  
  module.exports = JwtStrategy;