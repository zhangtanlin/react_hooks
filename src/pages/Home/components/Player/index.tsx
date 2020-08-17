import React, { useEffect, useState } from 'react';
import './index.scss';
import DPlayer from 'dplayer';
import playerPoster from '../../../../assets/images/playe_poster.jpg'
const playerVideo = require('../../../../assets/videos/player_video.mp4');

/**
 * 接口
 * @param {object}   Option         下拉框每项数据的格式
 * @param {object}   Props          父组件参数
 * @param {array}    Props.options  父组件参数-下拉框列表
 * @param {array}    Props.position 父组件参数-下拉框位置{'top':'表示在文本框下面'，'bottom':'表示在文本框上面'}
 * @param {function} Props.onChange 父组件参数-获取子组件返回值的方法
 */
interface Props {
  readonly src?: string,
  readonly poster?: string,
}

// 播放页
function Player(props: Props) {
  /**
   * 定义
   * @param {string} src        视频播放器地址
   * @param {string} poster     视频播放器封面
   * @param {srray}  posterList 视频截图（5秒，10秒，15秒，20秒）
   */
  const [src] = useState<string>(props.src || playerVideo);
  const [poster] = useState<string>(props.poster || playerPoster);
  /**
   * 操作数据
   * @function initPlayer 初始化播放器方法
   * @param src    播放器视频地址
   * @param poster 播放器封面
   */
  useEffect(() => {
    const initPlayer = () => {
      return new DPlayer({
        container: document.getElementById('dplayer'),
        screenshot: true,
        video: {
          url: src,
          pic: poster,
          thumbnails: poster,
        },
        subtitle: {
          url: 'webvtt.vtt',
        }
      });
    }
    initPlayer()
    return (() => {
      initPlayer();
    })
  }, [src, poster]);
  // 返回
  return (
    <div className="playerBox">
      <div id="dplayer" className="dplayer">123</div>
    </div>
  );
}

export default Player;
