import Taro, { useLaunch } from "@tarojs/taro";
import "./app.scss";

function App({ children }) {
  useLaunch(() => {
    console.log("App launched.");
    // Taro.loadFontFace({
    //   global: true,
    //   family: "SourceHanSerifCN",
    //   source: 'url("xxx.OTF")',
    //   scopes: ["webview", "native"],
    //   success: function (res) {
    //     console.log("字体加载完成");
    //   },
    //   fail: function (res) {
    //     console.log("字体加载失败");
    //   },
    //   complete: function (res) {
    //     console.log(res.status);
    //   },
    // });
  });

  // children 是将要会渲染的页面
  return children;
}

export default App;
