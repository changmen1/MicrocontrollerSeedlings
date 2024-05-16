const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("electron", {
  ipcRenderer: ipcRenderer,
});
contextBridge.exposeInMainWorld("electronAPI", {
  //预加载暴漏脚本
  // 窗口最小化
  zoomOut: () => ipcRenderer.invoke("dialog:zoomOut"),
  // 窗口最小化
  maximize: () => ipcRenderer.invoke("dialog:maximize"),
  // 关闭窗口
  closeWindow: () => ipcRenderer.invoke("dialog:closeWindow"),
  // 窗口置顶
  PinToTop: (ups) => ipcRenderer.invoke("dialog:PinToTop", ups),
  // 最小化到系统托盘
  createTray: () => ipcRenderer.invoke("dialog:createTray"),
  // 获取串口列表
  openSerialPort: () => ipcRenderer.invoke("dialog:openSerialPort"),
  // 连接串口
  setTitle: (path, baudRate) => ipcRenderer.invoke("set-title", path, baudRate),
  // 关闭串口
  disSerialPort: () => ipcRenderer.invoke("dialog:disSerialPort"),
  // 调试串口
  debugSerialPort: (Order) =>
    ipcRenderer.invoke("dialog:debugSerialPort", Order),
  // 串口数据
  readSerialPor: () => ipcRenderer.invoke("dialog:readSerialPor"),
  // 持续获取获取
  getSerialPorData: (data1, data2) =>
    ipcRenderer.invoke("dialog:getSerialPorData", data1, data2),
});

window.addEventListener("DOMContentLoaded", () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector);
    if (element) element.innerText = text;
  };

  for (const dependency of ["chrome", "node", "electron"]) {
    replaceText(`${dependency}-version`, process.versions[dependency]);
  }
});

const NOTIFICATION_TITLE = "❤通知❤";
const NOTIFICATION_BODY = "❤答辩顺利❤";
const CLICK_MESSAGE = "zxl";
new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY }).oncilck =
  () => {
    CLICK_MESSAGE;
  };
