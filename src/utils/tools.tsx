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
export const SetVideoImg = (url: any, time: number) => {
  try {
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
        };
        resolve(cb);
      });
    });
  } catch {
    return {
      duration: 0,
      src: ''
    };
  }
};

/**
 * 把秒转换成时分秒
 * @param {number} minutes 单位为秒的数字
 * @description 用当前数值除以 3600 获取时间小时的值 
 * @description 用当前时间除以 3600 之后取余，再除以 60 获取分钟的值
 * @description 用当前时间除以 3600 之后取余，再除以 60 之后取余获取秒的值
 */
export const MinutesFormat = (minutes: number) => {
  const hour = parseInt((minutes / 3600).toString(), 10);
  const minute = parseInt(((minutes % 3600) / 60).toString(), 10);
  const second = parseInt(((minutes % 3600) % 60).toString(), 10);
  const hourStr = hour ? `${hour}小时` : '';
  const minuteStr = minute ? `${minute}分` : '';
  const secondStr = second ? `${second}秒` : '0秒';
  return `${hourStr}${minuteStr}${secondStr}`;
}

/**
 * 生成唯一值字符串(根据数字和大小写字母)
 * @param randomFlag 长度是否在最小长度和最大长度之间取一个随机值
 * @param min        最小长度
 * @param randomFlag 最大长度
 */
export const RandomId = (
  randomFlag: boolean = true,
  min: number = 15,
  max: number = 30,
): string => {
  // 唯一字符串(需要返回的值)
  let _str = "";
  // 唯一值字符串的长度(默认长度为最小值,如果randomFlag为真,则随机获取最小值到最大值之间取随机值).
  let range = min;
  // 随机值列表
  const arr = [
    "0", "1", "2", "3", "4", "5", "6", "7", "8", "9",
    "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
    "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
    "u", "v", "w", "x", "y", "z",
    "A", "B", "C", "D", "E", "F", "G", "H", "I", "J",
    "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T",
    "U", "V", "W", "X", "Y", "Z",
  ];
  // 如果为真,则获取最小长度到最大长度之间的随机值为唯一值字符串的长度.
  if (randomFlag) {
    const _random = Math.random();
    range = Math.round(_random * (max - min)) + min;
  }
  // 拼接随机值
  for (let i = 0; i < range; i++) {
    const _random = Math.random();
    // 获取随机值列表内的某个系列号
    const _pos = Math.round(_random * (arr.length - 1));
    _str += arr[_pos];
  }
  return _str;
};
