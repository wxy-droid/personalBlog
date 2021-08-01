// 这个文件统一的执行假数据
import Mock from "mockjs";
import "./blog";
import "./banner";
import "./overall";
import "./about";
import "./project";
import "./message";

Mock.setup({
    timeout: "1000-2000",
  });
  