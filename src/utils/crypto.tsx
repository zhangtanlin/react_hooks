/**
 * 导入
 * @requires HexBase64Latin1Encoding hash 加密返回值的数据类型
 * @requires createHash     crypto 的 hash 加密方法
 * @requires createHmac     crypto 的 Hmac 加密方法
 * @requires createCipheriv crypto 的 createCipheriv 加密方法
 */
import {
  enc,
  MD5,
  SHA1,
  SHA256,
  SHA512,
  HmacMD5,
  HmacSHA1,
  HmacSHA256,
  HmacSHA512,
  AES,
} from 'crypto-js'

/**
 * crypto 的 md5/hash 加密方法
 * @param type 加密方法，值可以为 md5/sha1/sha256/sha512
 * @param str  需要加密的字符串
 */
export const cryptoHashEncrypt = (
  type: string,
  str: string,
  callbackType?: string,
) => {
  let tempResult = null;
  switch (type) {
    case 'md5':
      tempResult = MD5(str).toString(enc.Hex);
      break;
    case 'sha1':
      tempResult = SHA1(str).toString(enc.Hex);
      break;
    case 'sha256':
      tempResult = SHA256(str).toString(enc.Hex);
      break;
    case 'sha512':
      tempResult = SHA512(str).toString(enc.Hex);
      break;
    default:
      tempResult = "";
      break;
  }
  return tempResult;
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
  callbackType?: string
) => {
  let tempData: any = '';
  let tempResult = null;
  switch (type) {
    case 'md5':
      // const tempData = HmacMD5(str, key,).toString(enc.Hex);
      tempData = HmacMD5(str, key,);
      tempResult = enc.Hex.stringify(tempData);
      break;
    case 'sha1':
      tempData = HmacSHA1(str, key,);
      tempResult = enc.Hex.stringify(tempData);
      break;
    case 'sha256':
      tempData = HmacSHA256(str, key,);
      tempResult = enc.Hex.stringify(tempData);
      break;
    case 'sha512':
      tempData = HmacSHA512(str, key,);
      tempResult = enc.Hex.stringify(tempData);
      break;
    default:
      tempResult = "";
      break;
  }
  return tempResult;
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
  callbackType?: string,
) => {
  let tempType = null;
  switch (type) {
    case 'md5':
      tempType = 'md5';
      break;
    case 'sha1':
      tempType = 'sha1';
      break;
    case 'sha256':
      tempType = 'sha256';
      break;
    case 'sha512':
      tempType = 'sha512';
      break;
    default:
      tempType = '';
      break;
  }
  if (!tempType) return '';
  let tempResult = AES.encrypt(
    tempType,
    key,
    iv,
  ).toString();
  return tempResult;
}
