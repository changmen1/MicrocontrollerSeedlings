const { SerialPort } = require("serialport");

const path = require("path");
const {
  app,
  BrowserWindow,
  nativeImage,
  ipcMain,
  Tray,
  Menu,
} = require("electron");

const isDev = process.env.IS_DEV == "true" ? true : false;
let mainWindow2;
function createWindow() {
  const mainWindow = new BrowserWindow({
    minWidth: 800,
    minHeight: 800,
    //窗口默认隐藏
    // show: false,
    // 无边框设置
    frame: false,
    // 设置透明
    transparent: true,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      nodeIntegration: true,
      overlayScrollbars: false, // 隐藏滚动条
    },
  });
  // 忽略鼠标点击事件
  // mainWindow.setIgnoreMouseEvents(true);
  mainWindow2 = mainWindow;
  mainWindow.loadURL(
    isDev
      ? "http://localhost:3300"
      : `file://${path.join(__dirname, "../dist/index.html")}`
  );
  // 隐藏系统菜单
  // mainWindow.setMenu(null);
  // 程序最小宽高
  mainWindow.setMinimumSize(800, 800);
  // 监听窗口创建完成事件
  mainWindow.webContents.on("did-finish-load", () => {
    // 注入 CSS 样式 为了隐藏右边的滚动条
    mainWindow.webContents.executeJavaScript(`
        const css = document.createElement('style');
        css.innerHTML = '::-webkit-scrollbar { display: none; }';
        document.head.appendChild(css);
      `);
  });
  if (isDev) {
    // 自动打开调式工具
    // mainWindow.webContents.openDevTools();
  }
  // 自动打开调试工具
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  ipcMain.handle("dialog:openSerialPort", handleSerialPort);
  ipcMain.handle("set-title", handleConnect);
  ipcMain.handle("dialog:disSerialPort", handledisSerialPort);
  ipcMain.handle("dialog:debugSerialPort", handledebugSerialPort);
  ipcMain.handle("dialog:readSerialPor", handlederedSerialPort);
  ipcMain.handle("dialog:zoomOut", handleZoomOut);
  ipcMain.handle("dialog:maximize", handleMaximize);
  ipcMain.handle("dialog:closeWindow", handlecloseWindow);
  ipcMain.handle("dialog:createTray", handleCreateTray);
  ipcMain.handle("dialog:getSerialPorData", handleGetSerialPorData);
  ipcMain.handle("dialog:PinToTop", handlePinToTop);
  createWindow();
  app.on("activate", function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

// 监听原生关闭
// app.on("window-all-closed", () => {
//   if (process.platform !== "darwin") {
//     // console.log("执行了");
//     // app.quit();
//     dialog
//       .showMessageBox(mainWindow2, {
//         type: "error",
//         title: "退出",
//         defaultId: 0,
//         cancelId: 1,
//         message: "确定要退出甘肃某简牍博物馆环境监测与控制系统吗",
//         buttons: ["退出", "取消"],
//       })
//       .then((r) => {
//         if (r.response === 0) {
//           app.exit();
//         } else {
//           createWindow();
//           console.log(r.response);
//         }
//       });
//   }
// });

let SerialPortExample;
/** 获取串口列表*/
async function handleSerialPort() {
  const porps = await SerialPort.list();
  console.log(">>>>>>>>>>串口列表", porps);
  return porps;
}
/**连接串口 */
async function handleConnect(event, path, baudRate) {
  console.log(">>>准备打开<<<", path, baudRate);
  //实例化
  const serialPort = new SerialPort({
    //端口名
    path: path,
    //波特率
    baudRate: baudRate,
    //是否自动打开
    autoOpen: false,
  });
  SerialPortExample = serialPort;
  // 打开串口
  return new Promise((resolve, reject) => {
    // 打开串口
    serialPort.open((err) => {
      if (err) {
        console.error("无法打开串口:", err);
        reject(err);
      } else {
        console.log("串口已打开");
        resolve("串口已连接");
      }
    });
  });
}
/** 关闭串口*/
async function handledisSerialPort() {
  return new Promise((resolve, reject) => {
    SerialPortExample.close((err) => {
      if (err) {
        reject(err);
        console.error("无法关闭串口:", err);
      } else {
        resolve("串口已关闭");
        console.log("串口已关闭");
      }
    });
  });
}
/**串口调试 1开启报警 2关闭报警 */
async function handledebugSerialPort(event, Order) {
  console.log(">>>>>>", Buffer.from([Order]));
  return new Promise((resolve, reject) => {
    SerialPortExample.write(Buffer.from([Order]), (err) => {
      if (err) {
        reject(err);
        console.error("发送数据失败:", err);
      } else {
        resolve("成功发送数据");
        console.log("成功发送数据");
      }
    });
  });
}
let data1;
let data2;
/**串口通信传输数据 */
async function handlederedSerialPort() {
  return new Promise((resolve, reject) => {
    // setInterval(() => {
    //   data1 = 21;
    //   data2 = 56;
    //   resolve(21, 56);
    // }, 3);

    // 监听串口数据
    SerialPortExample.on("data", (data) => {
      console.log("收到数据:", data);
      const bufferDate = Buffer.from(data);
      const temperature = bufferDate.slice(0, 2);
      const humidity = bufferDate.slice(2, 4);
      // 将 Buffer 数据转换为字符串，然后解析为数字
      const firstNumber = parseInt(temperature.toString());
      const secondNumber = parseInt(humidity.toString());
      data1 = firstNumber;
      data2 = secondNumber;
      resolve(firstNumber, secondNumber);
      console.log("单片机数据", firstNumber, secondNumber);
    });
  });
}

// 渲染进程调用接口 获取持续数据
function handleGetSerialPorData() {
  return new Promise((resolve, reject) => {
    resolve({ data1, data2 });
  });
}
/**窗口最小化 */
function handleZoomOut() {
  mainWindow2.minimize();
}
/**窗口最大化 */
function handleMaximize() {
  if (mainWindow2.isMaximized()) {
    mainWindow2.unmaximize();
  } else {
    mainWindow2.maximize();
  }
}
/**关闭窗口 */
function handlecloseWindow() {
  mainWindow2.close();
}
let tray;
/**最小化系统托盘 */
function handleCreateTray() {
  const iconPath = path.join(__dirname, "../src/assets/icons8-rs-232公-48.png");
  const icon = nativeImage.createFromPath(iconPath);
  if (tray) {
    tray.destroy(); // 销毁之前的托盘图标
  }
  console.log("系统托盘", icon);
  tray = new Tray(icon);
  tray.setToolTip("甘肃博物馆环境监测控制系统");
  tray.setTitle("This is my title");
  const contextMenu = Menu.buildFromTemplate([
    {
      label: "退出程序",
      type: "normal", //('normal' | 'separator' | 'submenu' | 'checkbox' | 'radio')
      checked: false,
      click: () => {
        app.exit();
      },
    },
    {
      label: "打开甘肃博物馆环境监测控制系统",
      type: "normal",
      checked: false,
      click: () => {
        mainWindow2.show();
      },
    },
  ]);
  mainWindow2.hide();
  tray.setContextMenu(contextMenu);
  // 单击触发事件
  tray.on("click", () => {
    // 双击通知区图标实现应用的显示或隐藏
    mainWindow2.isVisible() ? mainWindow2.hide() : mainWindow2.show();
    mainWindow2.isVisible()
      ? mainWindow2.setSkipTaskbar(false)
      : mainWindow2.setSkipTaskbar(true);
  });
}

/**设置窗口初始为非置顶*/
function handlePinToTop(events, ups) {
  mainWindow2.setAlwaysOnTop(ups);
}
