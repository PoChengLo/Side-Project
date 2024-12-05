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
    playSound(keyData) {
      // 防止重複觸發
      if (this.activeKeys.has(keyData.dataKey)) {
        return;
      }

      // 將按鍵加入 activeKeys 集合中
      this.activeKeys.add(keyData.dataKey);

      const keyElement = document.querySelector(
        `.key[data-key="${keyData.dataKey}"]`
      );

      if (keyElement) {
        keyElement.classList.add("active");

        // 播放音效
        const audio = new Audio(`sounds/${keyData.sound}.wav`);
        audio.play();
      }

      // 在音效播放結束後移除樣式並從 activeKeys 中移除
      setTimeout(() => {
        if (keyElement) {
          keyElement.classList.remove("active");
        }
        this.activeKeys.delete(keyData.dataKey);
      }, 200);
    },

    // 處理鍵盤按下事件
    playSoundOnKeydown(e) {
      // 找到對應的 whiteKey 物件
      const keyData = this.whiteKeys.find((key) => key.dataKey === e.keyCode);
      if (keyData) {
        this.playSound(keyData);
      }
    },

    // 處理觸控事件
    playSoundOnTouchStart(keyData) {
      // 防止重複觸發
      if (this.activeKeys.has(keyData.dataKey)) {
        return;
      }

      this.playSound(keyData);
    },

    releaseKey(e) {
      this.activeKeys.delete(e.keyCode);
      const keyElement = document.querySelector(
        `.key[data-key="${e.keyCode}"]`
      );
      if (keyElement) {
        keyElement.classList.remove("active");
      }
    },

    // // 處理觸控結束事件
    // touchEnd(keyData) {
    //   const keyElement = document.querySelector(
    //     `.key[data-key="${keyData.dataKey}"]`
    //   );
    //   if (keyElement) {
    //     keyElement.classList.remove("active");
    //     this.activeKeys.delete(keyData.dataKey);
    //   }
    // },
  },
  mounted() {
    // 綁定鍵盤事件
    window.addEventListener("keydown", this.playSoundOnKeydown);
    window.addEventListener("keyup", this.releaseKey);
  },
});

app.mount("#piano");
