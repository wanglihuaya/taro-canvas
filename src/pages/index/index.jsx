import { Canvas, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import "./index.scss";

export default function Index() {
  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query
      .select("#myCanvas")
      .fields({ node: true, size: true, rect: true })
      .exec((res) => {
        const canvas = res[0].node;
        const rect = res[0];
        const ctx = canvas.getContext("2d");
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;
        // ctx.scale(dpr, dpr);
        const image = canvas.createImage();
        image.src =
          "https://images.unsplash.com/photo-1706401795357-36561e966374?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2Mnx8fGVufDB8fHx8fA%3D%3D";
        // image.src =
        //   "https://images.unsplash.com/photo-1706459493377-fcfe8d3c068b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDl8fHxlbnwwfHx8fHw%3D";
        image.onload = () => {
          // 绘制图片
          let scale = 1;
          // 覆盖满整个canvas，图片可能会裁切
          scale = canvas.height / image.height;
          // 将整个图片显示在canvas中，可能会有空白
          // scale = canvas.width / image.width;

          image.width = image.width * scale;
          image.height = image.height * scale;
          ctx.drawImage(image, 0, 0, image.width, image.height);

          // 添加文字
          ctx.font = `italic bold ${100}px Arial`;
          ctx.fillStyle = "red";
          ctx.textAlign = "center";
          // 文字宽度
          const textWidth = ctx.measureText("Hello World").width;

          ctx.fillText("Hello World", canvas.width / 2, 200);

          // 将canvas保存为图片 保存到相册
          Taro.canvasToTempFilePath({
            canvas,
            fileType: "png",
            success: (_res) => {
              console.log("临时图片地址", _res.tempFilePath);
              Taro.saveImageToPhotosAlbum({
                filePath: _res.tempFilePath,
                success: (__res) => {
                  console.log(__res);
                },
                fail: (err) => {
                  console.log(err);
                },
              });
            },
          });
        };
      });
  });

  return (
    <View className="index">
      <Canvas type="2d" id="myCanvas" />
    </View>
  );
}
