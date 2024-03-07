<template>
    <div class="title">
        <h1></h1>
    </div>
    <div class="container">
      <div
        class="block block-1"
      >
      <input class="search-input search-input-mobile" placeholder="アイテム名" type="text" v-model="searchQuery" @keyup.enter="ItemSearch" />
      </div>
      <div
      class="block block-2"
      :class="{ expanded: expandedBlock === 1 }"
    >
    <h2 @click="toggleBlock(1)"></h2>
        <div class="content" v-if="expandedBlock === 1">
            <div class="result-box result-box-mobile">
            <div v-for="item in searchResults" :key="item" @click="selectItem(item)">
                <img :src="item.iconUrl" alt="アイコン" class="item-icon" loading="lazy">
                <div class="item-info">
                <div class="item-name item-name-mobile">{{ item.Name }}</div>
                <div v-if="item.isCraftable" class="item-craftable"><img class="craft" src="https://xivapi.com/cj/1/blacksmith.png"></div>
                </div>
            </div>
            </div>
        </div>
    </div>
      <div
        class="block block-3"
        :class="{ expanded: expandedBlock === 2 }"
      >
      <h2 @click="toggleBlock(2)"></h2>
        <div class="content" v-if="expandedBlock === 2">
            <div v-if="infoLoading" class="info-loading-indicator">
                <loding></loding>
            </div>
        </div>
      </div>
    </div>
    <div class="copyright">
        <p>FINAL FANTASY XIV</p>
        <p> (C) SQUARE ENIX CO., LTD. All Rights Reserved.</p>
    </div>
  </template>
  
  <script>
  import Loding from './components/Loding.vue';
  export default {
    components: {
        Loding,
    },
    data() {
      return {
        isLoading: true,
        infoLoading: false,
        expandedBlock: null,
        searchResults: [],
        searchQuery: '',
        selectedInfo: null,
      };
    },
    created() {
        this.loadJsonData(); // コンポーネント作成時にJSONデータを読み込む
        const savedServer = localStorage.getItem('selectedServer');
        if (savedServer) {
            this.selectedServer = savedServer;
        } else {
            this.selectedServer = 'Chocobo'; // 'selectedServer'がない場合、'chocobo'に設定
            localStorage.setItem('selectedServer', 'chocobo'); // 'chocobo'をローカルストレージに保存
        }
    },
    methods: {
      toggleBlock(index) {
        if (this.expandedBlock === index) {
          this.expandedBlock = null;
        } else if (index !== 0) { // ブロック1以外のクリックのみ展開
          this.expandedBlock = index;
        }
        console.log(this.expandedBlock)
      },
      async loadJsonData() {
            try {
                this.isLoading = true;
                const itemsResponse = await fetch('/json/Item.json');
                const recipeResponse = await fetch('/json/Recipe.json');
                const classJobCategoriesResponse = await fetch('/json/ClassJobCategory.json');
                if (!itemsResponse.ok || !recipeResponse.ok || !classJobCategoriesResponse.ok) {
                    throw new Error('JSONファイルの読み込みに失敗しました。');
                }
                this.itemsData = await itemsResponse.json();
                this.recipeData = await recipeResponse.json();
                this.classJobCategories = await classJobCategoriesResponse.json();
            } catch (error) {
                console.error('JSON読み込みエラー:', error);
            } finally {
                this.isLoading = false;
            }
        },
        ItemSearch() {
        try {
            // 検索処理を行い、結果をsearchResultsに格納する
            this.searchResults = this.itemsData.filter(item =>
            item.Name.includes(this.searchQuery)
            ).map(item => ({
            ...item,
            iconUrl: this.getIconUrl(item.Icon),
            isCraftable: this.isCraftable(item.ItemId),
            }));

            // 検索結果があればブロック2を展開する
            if (this.searchResults.length > 0) {
            this.expandedBlock = 1;
            } else {
            // 検索結果がない場合はブロック2を閉じる
            this.expandedBlock = null;
            }
            } catch (error) {
                console.error('検索エラー:', error);
            }
        },
        getIconUrl(imageId) {
            const baseId = Math.floor(imageId / 1000) * 1000; // 1万の位を基にベースIDを算出
            const formattedImageId = imageId.toString().padStart(6, '0'); // 画像IDを6桁でフォーマット
            return `https://xivapi.com/i/0${baseId}/${formattedImageId}.png`; // 完全なURLを生成
        },
        isCraftable(itemKey) {
            return this.recipeData.some(recipe => recipe.ItemResult === itemKey);
        },
        onServerSelect() {
            this.selectedServer = this.$refs.servers.value;
            // 選択されたサーバーをローカルストレージに保存
            localStorage.setItem('selectedServer', this.selectedServer);
        },
        async getLowestPrice(itemId) {
            // Universalis APIを使用してアイテムの価格を取得
            const response = await fetch(`https://universalis.app/api/${this.selectedServer}/${itemId}`);
            const data = await response.json();
            if (data.minPriceHQ === 0) {
                return data.minPrice;
            } else {
                return data.minPriceHQ;
            }
        },
        async salesHistory(itemId) {
            try {
                const response = await fetch(`https://universalis.app/api/v2/history/${this.selectedServer}/${itemId}`);
                if (!response.ok) {
                    throw new Error('サーバーからの応答がありません');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('salesHistory取得エラー:', error);
                return null;
            }
        },

        async currentHistory(itemId) {
            try {
                const response = await fetch(`https://universalis.app/api/v2/${this.selectedServer}/${itemId}`);
                if (!response.ok) {
                    throw new Error('サーバーからの応答がありません');
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('currentHistory取得エラー:', error);
                return null;
            }
        },
        async selectItem(item) {
            this.expandedBlock = 2;
            try {
                this.infoLoading = true;
                const selectedItem = { ...item, materials: [] }; // 空の配列で materials を初期化
                if (item.isCraftable) {
                    const recipe = this.recipeData.find(recipe => recipe.ItemResult === item.ItemId);
                    if (recipe) {
                        let totalCost = 0;
                        const materialsPromises = [];

                        for (let i = 0; i <= 9; i++) {
                            const ingredientItemId = recipe[`ItemIngredient[${i}]`];
                            const quantity = recipe[`AmountIngredient[${i}]`];
                            if (ingredientItemId && quantity > 0) {
                                materialsPromises.push(this.getMaterialDetails(ingredientItemId, quantity));
                            }
                        }

                        const materials = await Promise.all(materialsPromises);
                        materials.forEach(material => {
                            if (material) {
                                selectedItem.materials.push(material); // ここで push する
                                totalCost += material.price * material.quantity;
                            }
                        });

                        selectedItem.totalCost = totalCost;
                        selectedItem.finalProductPrice = await this.getLowestPrice(item.ItemId);
                        selectedItem.sales = await this.salesHistory(item.ItemId);
                        selectedItem.current = await this.currentHistory(item.ItemId);
                    }
                } else {
                    selectedItem.sales = await this.salesHistory(item.ItemId);
                    selectedItem.current = await this.currentHistory(item.ItemId);
                }
                this.selectedInfo = selectedItem;
                console.log(this.selectedInfo)
            } catch (error) {
                console.error('アイテム選択エラー:', error);
            }
            finally {
                this.infoLoading = false; // ローディング終了
            }
        },
        async getMaterialDetails(ingredientItemId, quantity) {
            const price = await this.getLowestPrice(ingredientItemId);
            const materialItem = this.itemsData.find(i => i.ItemId === ingredientItemId);
            const subMaterials = await this.getSubMaterials(ingredientItemId);
            const subMaterialsTotalCost = subMaterials.reduce(
                (total, subMaterial) => total + (subMaterial.price * subMaterial.quantity),
                0
            );

            return {
                name: materialItem ? materialItem.Name : '不明な素材',
                quantity: quantity,
                iconUrl: materialItem ? this.getIconUrl(materialItem.Icon) : null,
                price: price,
                isCheaper: subMaterialsTotalCost < price,
                subMaterialsTotalCost: subMaterialsTotalCost,
                expanded: false,
                hasSubMaterials: subMaterials.length > 0, // subMaterialsが存在する場合はtrue, そうでなければfalse
                subMaterials: subMaterials
            };
        },
        async getSubMaterials(itemId) {
            const recipe = this.recipeData.find(recipe => recipe.ItemResult === itemId);
            if (!recipe) return [];

            const subMaterialsPromises = [];
            for (let i = 0; i <= 9; i++) {
                const ingredientItemId = recipe[`ItemIngredient[${i}]`];
                const quantity = recipe[`AmountIngredient[${i}]`];
                if (ingredientItemId && quantity > 0) {
                    subMaterialsPromises.push(this.getMaterialDetails(ingredientItemId, quantity));
                }
            }

            return await Promise.all(subMaterialsPromises);
        },
        copyText() {
            // selectedInfo.Nameのテキストをコピー
            navigator.clipboard.writeText(this.selectedInfo.Name).then(() => {
            })
                .catch(err => {
                    console.error('コピーに失敗しました:', err);
                });
        }
    },
  };
  </script>
  
  <style scoped>
  body {
    color: white;
  }
  .container {
    display: flex;
    height: calc(100vh - 40px);
    flex-direction: column; /* 縦に並べる */
  }
  
  .block {
    border-bottom: 1px solid #ccc;
    padding: 0px 0px 5px 0px;
    height: 40px;
    cursor: pointer;
    transition: flex-grow 0.3s; /* アニメーションを追加 */
  }
  
  .block h2 {
    margin-top: 5px;
    margin-bottom: 5px;
    height: 30px;
    color: white;
  }
  
  .block-1 {
    height: 40px; /* block-1 の高さを設定 */
  }
  
  .block.expanded {
    border-bottom: 1px solid #ccc;
    flex-grow: 1;
    max-height: calc(100vh - 170px); /* 画面サイズを基準として収まるように修正 */
    overflow-y: auto; /* コンテンツがはみ出た場合はスクロールバーを表示 */
  }
  
  .block .content {
    display: none;
  }
  
  .block.expanded .content {
    display: block;
  }

  .search-input-mobile{
    height: 100% !important;
    padding-left: 10px;
  }

  .result-box-mobile {
    width: 100% !important;
    padding: 0px;
    border: none;
  }

  .item-name-mobile {
    font-size: 0.5rem;
  }

  .title {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 50px;
    padding: 5px;
  }

  .title h1 {
    color: white;
    margin-bottom: 0px;
  }
  </style>
  