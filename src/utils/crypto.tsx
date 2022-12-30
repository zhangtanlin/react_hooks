/**
 * 导入
 * @requires HexBase64Latin1Encoding hash 加密返回值的数据类型
 * @requires createHash     crypto 的 hash 加密方法
 * @requires createHmac     crypto 的 Hmac 加密方法
 * @requires createCipheriv crypto 的 createCipheriv 加密方法
 */
import {
  BinaryToTextEncoding,
  createHash,
  createHmac,
  createCipheriv,
} from 'crypto'

/**
 * crypto 的 md5/hash 加密方法
 * @param type 加密方法，值可以为 md5/sha1/sha256/sha512
 * @param str  需要加密的字符串
 */
export const cryptoHashEncrypt = (
  type: string,
  str: string,
  callbackType: BinaryToTextEncoding = 'hex',
) => {
  const hash = createHash(type);
  hash.update(str);
  hash.digest(callbackType)
  return hash;
};

/**
 * crypto 的 hmac 加密方法
 * @param type 加密方法，值可以为 md5/sha1/sha256/sha512
 * @param str  需要加密的字符串
 * @param key  加密的密钥
 */
export const cryptoHmacEncrypt = (
  type: string,
  str: string,
  key: string,
  callbackType: BinaryToTextEncoding = 'hex',
) => {
  const hmac = createHmac(type, key);
  hmac.update(str);
  hmac.digest(callbackType);
  return hmac;
}

/**
 * crypto 的 cipheriv 加密方法
 * @param type 加密方法，值可以为 md5/sha1/sha256/sha512
 * @param str  需要加密的字符串
 * @param key  加密的密钥
 */
export const cryptoCipheriv = (
  type: string,
  key: any,
  iv: any,
  str: string,
  callbackType: BinaryToTextEncoding = 'hex',
) => {
  let cipher = createCipheriv(
    type,
    Buffer.from(key),
    iv
  );
  let encrypted = cipher.update(str);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return encrypted.toString(callbackType);
}
