/**
 * 导入
 * @requires randomBytes    获取随机字节数
 * @requires cryptoCipheriv 使用 crypto 的 createCipheriv 加密方法
 * @requires encrypt_key 加密 key
 */
import { cryptoCipheriv } from './crypto';
const encryptKey = '132f1537f85scxpcm59f7e318b9epa51';

/**
 * 根据 url 地址，获取地址栏指定参数的值
 * @param url  地址
 * @param name query参数key值
 */
export const GetUrlQuery = (url: string, name: any) => {
  const splitUrl = url.split('?');
  if (url.includes(name) && splitUrl.length >= 2) {
    const splitQuery = splitUrl[1].split('&');
    if (splitQuery.length >= 1) {
      splitQuery.forEach((element) => {
        const before = element.split('=')[0];
        const after = element.split('=')[1];
        if (before === name) {
          return after;
        }
        return '';
      });
    }
  }
  return '';
};

/**
 * 选择视频
 * 根据视频地址和时间获取视频截图
 * @param {string} url               视频地址
 * @param {number} time              视频时长（单位为秒）
 * @param {tag}    video             创建 video 标签
 * @param {string} video.crossOrigin 视频客户端允许跨域（允许服务端跨域）
 * @param {tag}    source            创建 source 标签
 * @param {string} source.src        视频播放地址
 * @param {string} source.type       视频类型
 * @param {number} video.currentTime 视频开始时间（单位秒）【视频截取的指定时间】{这很重要}
 * @function loadeddata 当前帧的数据已经加载成功
 * @returns cb
 * @returns cb.duration 时长
 * @returns cb.src      指定时间的封面
 */
export const setVideoImg = (url: any, time: number) => {
  return new Promise(resolve => {
    const video = document.createElement('video');
    video.crossOrigin = 'anonymous';
    const source = document.createElement('source');
    source.src = url;
    source.type = 'video/mp4';
    video.appendChild(source);
    video.currentTime = time;
    video.addEventListener('loadeddata', () => {
      const canvas: any = document.createElement('canvas');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas
        .getContext('2d')
        .drawImage(video, 0, 0, canvas.width, canvas.height);
      const src = canvas.toDataURL('image/png');
      const cb = {
        duration: video.duration || 0,
        src: src || ''
      }
      resolve(cb);
    });
  }).catch(() => {
    return {
      duration: 0,
      src: ''
    };
  });
};

/**
 * 把秒转换成时分秒
 * @param {number} minutes 单位为秒的数字
 * @description 用当前数值除以 3600 获取时间小时的值 
 * @description 用当前时间除以 3600 之后取余，再除以 60 获取分钟的值
 * @description 用当前时间除以 3600 之后取余，再除以 60 之后取余获取秒的值
 */
export const minutesFormat = (minutes: number) => {
  const hour = parseInt((minutes / 3600).toString(), 10);
  const minute = parseInt(((minutes % 3600) / 60).toString(), 10);
  const second = parseInt(((minutes % 3600) % 60).toString(), 10);
  const hourStr = hour ? `${hour}小时` : '';
  const minuteStr = minute ? `${minute}分` : '';
  const secondStr = second ? `${second}秒` : '0秒';
  return `${hourStr}${minuteStr}${secondStr}`;
}

/**
 * 加密请求参数
 * @param data      前端参数
 * @param newData   把对象转换成字符串
 * @param key       加密的 key （把字符串转换成 buffer ）
 * @param iv        通过 nodejs 自带的 crypto 模块获取一个长度为 16 的 bytes
 * @param cipheriv  使用 aes-256-cfb 加密数据
 * @param encrypted 加密之后的字符串
 * @param unixTime  获取当前时间的时间戳（秒）
 */
export const encryptionParam = (data: any) => {
  const newData: string = JSON.stringify(data);
  const key = new Buffer(encryptKey);
  const iv = randomString(16, encryptKey);
  const cipheriv = cryptoCipheriv('aes-256-cfb', key, iv, newData);
  const encrypted = iv.toString() + cipheriv;
  const unixTime = parseInt((new Date().getTime() / 1000).toString());
  console.log('cipheriv', cipheriv);
  console.log('encrypted', encrypted);
  console.log('unixTime', unixTime);
  return '';
}

/**
 * 获取指定长度的随机字符串
 * @param length 生成的数据长度
 * @param chars 随机字符串
 * @returns 
 */
export const randomString = (
  length: number,
  chars: string,
) => {
  var result = '';
  for (var i = length; i > 0; --i) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}
