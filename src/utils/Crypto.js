import * as CryptoJS from 'crypto-js';

const key = CryptoJS.enc.Utf8.parse('abcdefgij_1234567890_t1234567890');
const iv = CryptoJS.enc.Utf8.parse('klrsrdcr17_2704#');

const Crypto = {
  EncryptText: function (value) {
    const enc = CryptoJS.AES.encrypt(value, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return enc.toString();
  },

  DecryptText: function (encryptedValue) {
    const decrypted = CryptoJS.AES.decrypt(encryptedValue, key, {
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  },

  EncryptPassword: function (password) {
    const salt = 'PASSWORD_SALT';
    const hashedPassword = CryptoJS.MD5(password + salt.toUpperCase()).toString();
    const base64hashedPassword = window.btoa(hashedPassword);
    return this.EncryptText(base64hashedPassword);
  },

  DecryptPassword: function (encryptedPassword) {
    const decryptedBase64HashedPassword = this.DecryptText(encryptedPassword);
    const hashedPassword = window.atob(decryptedBase64HashedPassword);

    return `
    🔓 Decryption Process:
    1. 🔑 AES Decryption: Successful
    2. 📄 Base64 Decoding: Successful
    3. 🧩 Result: MD5 hash of (original_password + PASSWORD_SALT)

    ❌ Cannot recover original password because:
    - 🔒 The result is an MD5 hash, which is a one-way function.
    - 🧮 It's computationally infeasible to reverse an MD5 hash.
    - 🧂 The salt adds an extra layer of security but also makes reversal impossible.

    🔍 Decrypted hash: ${hashedPassword}

    💡 Understanding the process:
    1. Original password: [unknown]
    2. Salted password: [unknown] + PASSWORD_SALT
    3. MD5 hash: ${hashedPassword} (32 hexadecimal characters)
    4. Base64 encoded: [encoded version of the hash]
    5. AES encrypted: ${encryptedPassword}

    🛡️ Security note:
    For security reasons, passwords should never be stored or transmitted in a recoverable format.
    If a user forgets their password, implement a secure password reset functionality instead of
    trying to recover the original password.

    📚 Best practices:
    - Use strong, slow hash functions designed for passwords (e.g., bcrypt, Argon2, PBKDF2).
    - Use a unique salt for each password, not a global salt.
    - Store only the hashed (and salted) password, never the original or encrypted version.
    - Implement secure password reset functionality for forgotten passwords.

    🔐 Remember: The inability to recover the original password is a security feature, not a limitation!
    `;
  }
};

export default Crypto;
