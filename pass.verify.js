const bcrypt = require('bcrypt');

async function hashPassword() {
  const myPassword = 'admin1.2.3'
  const hash = '$2b$10$BwzgKx4X0mY8g8y9j1k1j1k1j1k1j1k1j1k1j1k1j1k1j1k1j1k1j1k1j1k1j1k1';
  const isMatch = await bcrypt.compare(myPassword, hash);
  console.log(isMatch);
}

hashPassword(); 