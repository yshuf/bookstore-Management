/**
 * 前端字符串解密
 * @param str
 * @returns {string}
 */
export const fhwfroms = (str) => {
  str = str.toString();
  if (!str) return '';
  let s = '';
  while (str.length > 0) {
    // 将 fromCharCode Unicode 编码转为一个字符:
    s += String.fromCharCode(str.substr(1, str[0])); // 拿到每个字符串对应的数字组合 ，然后转为对应字符串 a —— 2971 拿到 97 然后转为 a
    str = str.substr(str[0] - 0 + 2).toString(); // 从当前字符串中去掉已经转换为 字符的数字组合，拿到最新的 从一串数字中 去掉 2971 , str.substr(str[0] - 0 + 2) 加 2 是因为一头一尾的长度和随机数
    console.log(s, str.substr(str[0] - 0 + 2), str);
  }
  return s;
};

/**
 * 前端字符串加密
 * @param str
 * @returns {string}
 */
export const fhwton = (str) => {
  str = str.toString();
  let s = '';
  for (let i = 0; i < str.length; i++) {
    let _s = str[i].charCodeAt() + ''; // 返回字符串第一个字符的 Unicode 编码 ———— 这里将对应的每个字符转为数字
    // 最终每个字符会转为 由 Unicode 编码生成的数字长度 + 当前数字 + 一个个位数的随机数
    // a —— 2971 : a 对应的 Unicode 编码 97，以及 97 的长度 2 ，1 为生成的随机数
    _s = _s.length + '' + _s + '' + Math.floor(Math.random() * 10); // 键盘上的，常见字符和数字都是有对应的数字 1~127 之间
    s += _s;
  }
  return s;
};
