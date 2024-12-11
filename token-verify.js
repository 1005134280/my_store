const jwt = require('jsonwebtoken');

const secret = 'myCat';

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTczMzY0MzI0OX0.AWeJsPSZrhx4F6Bg8rlGMe1Iwgs77iKBxX27yvokhB0';


function verifyToken(token, secret) {
    return jwt.verify(token, secret);
}

const payload = verifyToken(token, secret);
console.log(payload);