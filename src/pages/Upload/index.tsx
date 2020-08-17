import React, { useEffect, useState } from 'react';
import './index.scss';
import { setVideoImg, minutesFormat } from '../../utils/tools';
import { cutVideoTime } from '../../config';
// toast
import emitter from '../../utils/events';
// 上传选择页
function Upload() {
  /**
   * 定义
   * @param {array}  posterList 封面列表
   * @param {string} poster     选择的封面
   * @param {string} duration   视频时长
   */
  const [posterList, setPosterList] = useState<any[]>([]);
  const [poster, setPoster] = useState<string>();
  const [duration, setDuration] = useState<number>();
  /**
   * 操作数据
   */
  useEffect(() => {
  }, []);
  /**
   * 选择文件事件
   * @param {event}  event   选择文件之后返回的数据
   * @param {object} file    文件信息
   * @function readAsDataURL 读取指定的 Blob 或 File 对象
   * @param e                读取 Blob 或 File 对象成功后获取的返回值， result 属性将包含一个data:URL格式的字符串（base64编码）以表示所读取文件的内容
   * @function setVideoImg              根据视频 data 信息，获取视频详情方法
   * @param {object} base64Img          视频封面+时长信息
   * @param {object} base64Img.src      视频指定时间（秒）处的截图（base64代码）
   * @param {object} base64Img.duration 当前视频时长（秒）
   */
  const onFileChange = async (event: any) => {
    setPosterList([]);
    const file = event.target.files[0];
    if (Number(file.size) / 1024 / 1024 > 100) {
      emitter.emit('toast', {
        message: '超过100M了',
        type: 'danger',
      });
      return;
    }
    if (file.type === 'video/mp4') {
      const videoFile = new FileReader();
      videoFile.readAsDataURL(file);
      videoFile.onload = async (e: any) => {
        try {
          for (const iterator of cutVideoTime) {
            const base64Img: any = await setVideoImg(e.target.result, iterator);
            setPosterList((posterList) => { return [...posterList, base64Img.src] });
            setDuration(base64Img.duration)
          }
        } catch (error) {
          emitter.emit('toast', {
            message: '读取文件错误',
            type: 'danger',
          });
        }
      }
    }
  }
  /**
   * 点击选择封面图片
   * @param {string} base64 图片的 base64 字符串
   */
  const choosePoster = (base64: string) => {
    setPoster(base64);
  }
  /**
   * 点击上传
   */
  const submit = () => {
    console.log('点击上传')
  }
  // 返回
  return (
    <div className="chooseVideo">
      <div className="chooseVideoBox">
        <div className="chooseBox">
          <div className="content">
            <i className="icon-computer"></i>
            <p className="title">上传精选视频</p>
            <p>请不要带有广告、黑边、水印</p>
          </div>
          <div className="description">
            <div className="list">
              <i className="icon-picture"></i>
              <div className="info">
                <p>推荐尺寸</p>
                <p className="subTitle">16:9/18:9</p>
              </div>
            </div>
            <div className="list">
              <i className="icon-computer"></i>
              <div className="info">
                <p>推荐分辨率</p>
                <p className="subTitle">≥720p</p>
              </div>
            </div>
            <div className="list">
              <i className="icon-camera"></i>
              <div className="info">
                <p>推荐视频大小</p>
                <p className="subTitle">≤100M</p>
              </div>
            </div>
          </div>
          <input
            type="file"
            accept="video/*"
            className="coverFile"
            onChange={(event) => {
              onFileChange(event);
            }}
          />
        </div>
        <div className="chooseBox">
          <p>视频时长：{minutesFormat(Number(duration))}</p>
        </div>
      </div>
      <div className="previewBox">
        <div className="list coverImg">
          {
            poster ?
              <img src={poster} alt="请选择封面" />
              :
              <>
                <i className="icon-picture"></i>
                <p>上传封面</p>
              </>
          }
        </div>
        {
          posterList.length ?
            (
              posterList.map((element: any, index: number) => (
                <div
                  className="list"
                  key={'posterList' + index}
                  onClick={() => choosePoster(element)}
                >
                  <img src={element} alt="" />
                </div>
              ))
            ) : (<div className="list baseList">暂无预览图片</div>)
        }
      </div>
      <button onClick={submit}>点击上传</button>
    </div>
  );
}

export default Upload;
