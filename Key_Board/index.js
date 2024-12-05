const app = Vue.createApp({
  data() {
    return {
      whiteKeys: [
        { keyboard: "a", dataKey: 65, sound: "a" },
        { keyboard: "s", dataKey: 83, sound: "b" },
        { keyboard: "d", dataKey: 68, sound: "c" },
        { keyboard: "f", dataKey: 70, sound: "d" },
        { keyboard: "g", dataKey: 71, sound: "e" },
        { keyboard: "h", dataKey: 72, sound: "f" },
        { keyboard: "j", dataKey: 74, sound: "g" },
      ],
      whiteClass: "key white",
      activeKeys: new Set(), // 用來追蹤正在按下的按鍵
    };
  },
  methods: {
    playSound(e) {
      // 如果按鍵已經按下，則不再觸發
      if (this.activeKeys.has(e.keyCode)) {
        return;
      }

      // 將按鍵加入到 activeKeys 中
      this.activeKeys.add(e.keyCode);

      // 找到對應的 whiteKey 物件
      const keyData = this.whiteKeys.find((key) => key.dataKey === e.keyCode);

      if (keyData) {
        // 找到對應的按鍵元素
        const keyElement = document.querySelector(
          `.key[data-key="${keyData.dataKey}"]`
        );

        // 添加按下的樣式
        if (keyElement) {
          keyElement.classList.add("active");

          // 播放對應音效
          const audio = new Audio(`sounds/${keyData.sound}.wav`);
          audio.play();
        }
      }
    },
    releaseKey(e) {
      // 移除按鍵狀態和樣式
      this.activeKeys.delete(e.keyCode);
      const keyElement = document.querySelector(
        `.key[data-key="${e.keyCode}"]`
      );
      if (keyElement) {
        keyElement.classList.remove("active");
      }
    },
  },
  mounted() {
    // 綁定鍵盤事件
    window.addEventListener("keydown", this.playSound);
    window.addEventListener("keyup", this.releaseKey);
  },
});

app.mount("#piano");
