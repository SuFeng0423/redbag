import { getQueryString } from "../utils/tools.js";

const BASE_HOST = /localhost|127\.0.0.1/i.test(location.hostname)
? ""
: "";


export default {
  TASK_LIST: BASE_HOST + '', //红包任务列表
};