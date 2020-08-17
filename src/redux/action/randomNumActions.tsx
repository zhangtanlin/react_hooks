// 更新随机小数
const setRandomNum = (num: number) => ({
  type: 'SET_RANDOMNUM',
  payload: num,
});

export default {
  setRandomNum,
};
