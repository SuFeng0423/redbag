import axios from "axios";
import { Toast } from "vant";

export const request = obj => {
  return new Promise((resolve, reject) => {
    let query = {
      method: obj.method.toLowerCase(),
      url: obj.url
    };
    if (obj.method.toLowerCase() === "get") {
      query.params = obj.data;
    } else {
      query.data = obj.data;
    }
    axios(query)
      .then(res => {
        //请求成功操作
        resolve(res); //新Promise对象实例（成功）
      })
      .catch(err => {
        reject(err); //新Promise对象实例（失败）
      });
  });
};

//定义弹出层
function successState(res) {
  if (res.status == 200) {
    if (res.data.code == "200") {
      //请求成功状态码
      Toast.success(res.data.msg);
      return;
    } else if (res.data.code == "-1") {
      //请求失败状态码
      Toast.fail(res.data.data.msg);
      return;
    }
  }
}
