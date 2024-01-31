import { Canvas, View } from "@tarojs/components";
import Taro from "@tarojs/taro";
import { useEffect } from "react";
import "./index.scss";

export default function Index() {
  useEffect(() => {
    const query = Taro.createSelectorQuery();
    query
      .select("#myCanvas")
      .fields({ node: true, size: true })
      .exec((res) => {
        const canvas = res[0].node;
        const ctx = canvas.getContext("2d");
        console.log("Taro.getSystemInfoSync()", Taro.getSystemInfoSync());
        const dpr = Taro.getSystemInfoSync().pixelRatio;
        // 填充 tomato
        ctx.fillStyle = "tomato";
        // 读取图片
        const image = canvas.createImage();
        image.src =
          "https://images.unsplash.com/photo-1706459493377-fcfe8d3c068b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHwxMDl8fHxlbnwwfHx8fHw%3D";

        image.onload = () => {
          // 设置 image 的宽高，保持原图宽高比，让它可以在 canvas 中完整显示
          const imageWidth = image.width / dpr;
          const imageHeight = image.height / dpr;
          canvas.width = imageWidth;
          canvas.height = imageHeight;
          // 将图片绘制到 canvas 中

          ctx.drawImage(
            image,
            0,
            0,
            image.width > image.height ? canvas.width : image.width,
            // (canvas.width * imageHeight) / imageWidth,
            image.height > image.width ? canvas.height : image.height,
            0,
            0,
            canvas.width,
            canvas.height
          );
        };
      });
  });

  return (
    <View className="index">
      <Canvas type="2d" id="myCanvas" />
    </View>
  );
}
