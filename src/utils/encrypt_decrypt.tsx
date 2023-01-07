// CryptoJS学习文档1:https://cryptojs.gitbook.io/docs/
// CryptoJS学习文档2:https://code.google.com/archive/p/crypto-js/

/**
 * 导入
 * @requires HexBase64Latin1Encoding hash 加密返回值的数据类型
 * @requires createHash     crypto 的 hash 加密方法
 * @requires createHmac     crypto 的 Hmac 加密方法
 * @requires createCipheriv crypto 的 createCipheriv 加密方法
 */
import {
  AES,
  enc,
  mode,
  pad,
  algo,
  lib,
} from 'crypto-js'

// 把密钥转换成utf8编码
const cryptKey = enc.Hex.parse("1234123412ABCDEF");
// 把密钥偏移量转换成utf8编码
const cryptIv = enc.Hex.parse("ABCDEF1234123412");

/**
 * crypto 的 md5/hash 加密方法
 * @param type 加密方法，值可以为 algo.MD5/...
 * @param str 需要加密的字符串
 * @param callbackType 自己写的hash加密方法返回的数据类型
 */
export const cryptoHashEncrypt = (
  type: any = algo.MD5,
  str: string,
  callbackType: any = enc.Hex,
) => {
  const tempHash = type.create();
  tempHash.update(str);
  const hash: any =  tempHash.finalize().toString(callbackType);
  return hash;
};

/**
 * crypto 的 hmac 加密方法
 * @param type 加密方法，值可以为 algo.MD5/...
 * @param str  需要加密的字符串
 * @param key  加密的密钥
 */
export const cryptoHmacEncrypt = (
  type: any = algo.MD5,
  str: string,
  key: string,
  callbackType: any = enc.Hex,
) => {
  const hmac: algo.HMAC = algo.HMAC.create(
    type,
    key,
  );
  hmac.update(str);
  const hash = hmac.finalize().toString(callbackType);
  return hash;
}

/**
 * crypto的aes加密方法
 * @param str 需要加密的字符串
 */
export const cryptoAesEncrypt = ( str: string ): string => {
  let encryptStr: string = '';
  try {
    // 把需要加密的字符串转utf8编码
    const tempStr = enc.Utf8.parse(str);
    const tempKey = cryptKey;
    const tempCfg = {
      iv: cryptIv,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    };
    // aes加密
    const encrypted = AES.encrypt(
      tempStr,
      tempKey,
      tempCfg
    );
    // 把密文字符串化+转换为大写
    encryptStr = encrypted.ciphertext.toString().toUpperCase();
  } catch (error) {
    encryptStr = '';
  }
  return encryptStr;
}

/**
 * crypto的aes解密方法
 * @param str 需要加密的字符串
 */
export const cryptoAesDecrypt = (str: string,): string => {
  let decryptStr: string = '';
  try {
    // 把加密数据转换成十六位十六进制字符串
    const tempHex = enc.Hex.parse(str);
    // 把字符串转换成base64格式
    const tempStr = enc.Base64.stringify(tempHex);
    const tempKey = cryptKey;
    const tempCfg = {
      iv: cryptIv,
      mode: mode.CBC,
      padding: pad.Pkcs7,
    };
    const encrypted: lib.WordArray = AES.decrypt(
      tempStr,
      tempKey,
      tempCfg,
    );
    // 把解密数据转换成utf8字符串
    decryptStr = encrypted.toString(
      enc.Utf8,
    ).toString();
  } catch (error) {
    decryptStr = '';
  }
  return decryptStr;
}
