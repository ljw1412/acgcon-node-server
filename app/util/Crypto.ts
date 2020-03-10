import * as crypto from 'crypto';

export default class Crypto {
  // 根据长度随机生成字符串
  static genRandomString(length) {
    return crypto
      .randomBytes(Math.ceil(length / 2))
      .toString('hex')
      .slice(0, length);
  }
  /**
   *  使用sha512算法加盐进行hash
   */
  static hash512(str, salt = this.genRandomString(16)) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(str);
    var value = hash.digest('hex');
    return { result: value, salt };
  }
  /**
   *  AES对称加密
   */
  static aesEncrypt(data, key = this.genRandomString(16)) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf8', 'hex');
    crypted += cipher.final('hex');
    return { result: crypted, salt: key };
  }
  /**
   *  AES对称解密
   */
  static aesDecrypt(encrypted, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(encrypted, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }
}
