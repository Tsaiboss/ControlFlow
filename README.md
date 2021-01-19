# AST混淆实战:仿obfuscator混淆控制流平坦化



## 一，环境安装


### 1.下载node:[https://nodejs.org/en/](https://nodejs.org/en/) ,选择LTS版本
### 2.某盘符下新建 AST 文件夹，在该文件夹内，命令行模式安装 @babel/core 库。命令:


**npm install @babel/core --save-dev**

## 二，运行代码
### 1.本项目拷贝只上面安装库的文件夹下
### 2.命令行模式运行
### node ControlFlow.js test.js
### 混淆后生成的代码在 decode_result.js 里


## 三，混淆效果


## 混淆前:


```javascript
window = {};
window.atob = function(r) {
    e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var o = String(r).replace(/=+$/, "");
    if(o.length % 4 == 1) throw new t("'atob' failed: The string to be decoded is not correctly encoded.");
    for(var n, a, i = 0, c = 0, d = ""; a = o.charAt(c++); ~a && (n = i % 4 ? 64 * n + a : a, i++ % 4) ? d += String.fromCharCode(255 & n >> (-2 * i & 6)) : 0) a = e.indexOf(a);
    return d
}
window.btoa = function(r) {
    e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    for(var o, n, a = String(r), i = 0, c = e, d = ""; a.charAt(0 | i) || (c = "=", i % 1); d += c.charAt(63 & o >> 8 - i % 1 * 8)) {
        if(n = a.charCodeAt(i += .75), n > 255) throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
        o = o << 8 | n
    }
    return d
}
```


## 混淆后:


```javascript
window = {};

window.atob = function (_0xc0750g) {
  var _0xfbb16d = "4|1|2|3|0"["split"]("|"),
      _0xec2868 = 0;

  while (!![]) {
    switch (_0xfbb16d[_0xec2868++]) {
      case "0":
        return _0xec4345;
        continue;

      case "1":
        var _0x1adc16 = String(_0xc0750g).replace(/=+$/, "");

        continue;

      case "2":
        if (_0x1adc16.length % 4 == 1) throw new t("'atob' failed: The string to be decoded is not correctly encoded.");
        continue;

      case "3":
        for (var _0xb342a5, _0x7ecb47, _0xc54a87 = 0, _0xa14d1g = 0, _0xec4345 = ""; _0x7ecb47 = _0x1adc16.charAt(_0xa14d1g++); ~_0x7ecb47 && (_0xb342a5 = _0xc54a87 % 4 ? 64 * _0xb342a5 + _0x7ecb47 : _0x7ecb47, _0xc54a87++ % 4) ? _0xec4345 += String.fromCharCode(255 & _0xb342a5 >> (-2 * _0xc54a87 & 6)) : 0) _0x7ecb47 = e.indexOf(_0x7ecb47);

        continue;

      case "4":
        e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        continue;
    }

    break;
  }
};

window.btoa = function (_0xdc05f0) {
  var _0x39674c = "2|1|0"["split"]("|"),
      _0x902bcb = 0;

  while (!![]) {
    switch (_0x39674c[_0x902bcb++]) {
      case "0":
        return _0xde212b;
        continue;

      case "1":
        for (var _0xed1fcd, _0x33g15b, _0x5153cd = String(_0xdc05f0), _0xeea791 = 0, _0xc94d67 = e, _0xde212b = ""; _0x5153cd.charAt(0 | _0xeea791) || (_0xc94d67 = "=", _0xeea791 % 1); _0xde212b += _0xc94d67.charAt(63 & _0xed1fcd >> 8 - _0xeea791 % 1 * 8)) {
          var _0xcgcd3c = "0|1"["split"]("|"),
              _0x3922ce = 0;

          while (!![]) {
            switch (_0xcgcd3c[_0x3922ce++]) {
              case "0":
                if (_0x33g15b = _0x5153cd.charCodeAt(_0xeea791 += .75), _0x33g15b > 255) throw new t("'btoa' failed: The string to be encoded contains characters outside of the Latin1 range.");
                continue;

              case "1":
                _0xed1fcd = _0xed1fcd << 8 | _0x33g15b;
                continue;
            }

            break;
          }
        }

        continue;

      case "2":
        e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        continue;
    }

    break;
  }
};
```


混淆后的代码，就是我们常见的obfuscator混淆代码。


欢迎公众本人微信公众号，交流学习更多AST相关知识。
![image.png](https://cdn.nlark.com/yuque/0/2021/png/598650/1611067051034-8e54ca78-f845-4939-815d-f7100d4b2e97.png#align=left&display=inline&height=430&margin=%5Bobject%20Object%5D&name=image.png&originHeight=430&originWidth=430&size=101603&status=done&style=none&width=430)
