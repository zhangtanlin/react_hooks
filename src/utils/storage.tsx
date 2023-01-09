// sessionStorage获取
export const sessionGet = (key: string) => {
  try {
    const _str = sessionStorage.getItem(key);
    return _str;
  } catch (error) {
    return false;
  }
};

// sessionStorage保存
export const sessionSet = (key: string, data: string) => {
  try {
    sessionStorage.setItem(key, data);
    return true;
  } catch (error) {
    return false;
  }
}

// sessionStorage删除
export const sessionRemove = (key: string,) => {
  try {
    sessionStorage.removeItem(key,);
    return true;
  } catch (error) {
    return false;
  }
}

// localStorage获取
export const localGet = (key: string) => {
  try {
    const _str = localStorage.getItem(key);
    return _str;
  } catch (error) {
    return false;
  }
};

// localStorage保存
export const localSet = (key: string, data: string) => {
  try {
    localStorage.setItem(key, data);
    return true;
  } catch (error) {
    return false;
  }
}

// localStorage删除
export const localRemove = (key: string,) => {
  try {
    localStorage.removeItem(key,);
    return true;
  } catch (error) {
    return false;
  }
}
