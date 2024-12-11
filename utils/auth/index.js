const passport = require('passport');
const LocalStrategy = require('./startegies/local.strategy');
const JwtStrategy = require('./startegies/jwt.strategy');

// Registra la estrategia con un nombre
passport.use('local', LocalStrategy);
passport.use(JwtStrategy);
