// CORS 跨域 （ajax）不兼容 IE 6 7 8 9
// const xhr = new XMLHttpRequest()
// xhr.open('GET','http://localhost:9999/friends.json')
// xhr.onreadystatechange = () => {
//   if(xhr.readyState === 4 && xhr.status >= 200){
//     console.log(xhr.response);
//   }
// }
// xhr.send()

// 封装AJAX
function ajax(method, url) {
  return new Promise((resolve, reject) => {
    const request = new XMLHttpRequest();
    request.open(method, url);
    request.onreadystatechange = () => {
      if (request.readyState === 4) {
        if (request.status === 200) {
          resolve(request.response);
        } else {
          reject(request);
        }
      }
    };
    request.send();
  });
}
ajax("get", "http://localhost:9999/friends.json").then(response => {
  console.log(response);
});

// JSONP （请求一个 js 文件，js 文件会执行一个回调，回调里面有请求的数据） 
// 优点：兼容 IE 支持跨域， 缺点：是script标签：不支持 POST 不能知道状态码和响应头 
// 利用随机数 避免全局污染
// const random = 'callbackName' + Math.random()
// window[random] = (data) => {
//   console.log(data);
// }
// const script = document.createElement('script')
// script.src = `http://localhost:9999/friends.js?callback=${random}`
// document.body.appendChild(script)
// script.onload = () => {
//   script.remove()
// }

// 封装JSONP
function jsonp(url) {
  return new Promise((resolve, reject) => {
    const random = "callbackName" + Math.random();
    window[random] = data => {
      resolve(data);
    };
    const script = document.createElement("script");
    script.src = `${url}?callback=${random}`;
    script.onload = () => {
      script.remove();
    };
    script.onerror = () => {
      reject();
    };
    document.body.appendChild(script);
  });
}

jsonp("http://localhost:9999/friends.js").then(data => {
  console.log(data);
});

