<template>
    <div class="container">
      <div
        class="block block-1"
      >
        <h2>スマホ版開発中</h2>
      </div>
      <div
        class="block block-2"
        @click="toggleBlock(1)"
        :class="{ expanded: expandedBlock === 1 }"
      >
        <h2>Block 2</h2>
        <div class="content" v-if="expandedBlock === 1">
          <p>ブロック2の内容</p>
        </div>
      </div>
      <div
        class="block block-3"
        @click="toggleBlock(2)"
        :class="{ expanded: expandedBlock === 2 }"
      >
        <h2>Block 3</h2>
        <div class="content" v-if="expandedBlock === 2">
          <p>ブロック3の内容</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        expandedBlock: null, // 現在展開されているブロックのインデックスを保持する変数
      };
    },
    methods: {
      toggleBlock(index) {
        if (this.expandedBlock === index) {
          this.expandedBlock = null;
        } else if (index !== 0) { // ブロック1以外のクリックのみ展開
          this.expandedBlock = index;
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    display: flex;
    height: 100vh;
    flex-direction: column; /* 縦に並べる */
  }
  
  .block {
    border: 1px solid #ccc;
    padding: 10px;
    cursor: pointer;
    transition: flex-grow 0.3s; /* アニメーションを追加 */
  }
  
  .block h2 {
    margin-top: 0;
    color: white;
  }
  
  .block-1 {
    height: 70px; /* block-1 の高さを設定 */
  }
  
  .block.expanded {
    flex-grow: 1;
    max-height: calc(100vh - (3 * 50px)); /* 残りサイズの最大に展開 */
    overflow-y: auto; /* コンテンツがはみ出た場合はスクロールバーを表示 */
  }
  
  .block .content {
    display: none;
  }
  
  .block.expanded .content {
    display: block;
  }
  </style>
  