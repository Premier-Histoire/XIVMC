<template>
  <div class="d-flex">
    <div v-if="isLoading" class="loading-indicator">
      <div class="spinner"></div> <!-- スピナーエレメント -->
    </div>
    <div class="search-container">
      <div class="serverselect">
        <p>SEVER SELECT</p>
        <div class="select-box-container">
          <span class="dropdown-icon">{{ isSelectBoxOpen ? '▼' : '▶' }}</span>
          <select id="servers" class="select-box" @focus="isSelectBoxOpen = true" @blur="isSelectBoxOpen = false"
            ref="servers" @change="onServerSelect" v-model="selectedServer">
            <option disabled="" value="">- Please Choose a Server -</option>
            <optgroup label="Chaos - Europe">
              <option value="Cerberus">Cerberus</option>
              <option value="Louisoix">Louisoix</option>
              <option value="Moogle">Moogle</option>
              <option value="Omega">Omega</option>
              <option value="Phantom">Phantom</option>
              <option value="Ragnarok">Ragnarok</option>
              <option value="Sagittarius">Sagittarius</option>
              <option value="Spriggan">Spriggan</option>
            </optgroup>
            <optgroup label="Light - Europe">
              <option value="Alpha">Alpha</option>
              <option value="Lich">Lich</option>
              <option value="Odin">Odin</option>
              <option value="Phoenix">Phoenix</option>
              <option value="Raiden">Raiden</option>
              <option value="Shiva">Shiva</option>
              <option value="Twintania">Twintania</option>
              <option value="Zodiark">Zodiark</option>
            </optgroup>
            <optgroup label="Elemental - Japan">
              <option value="Aegis">Aegis</option>
              <option value="Atomos">Atomos</option>
              <option value="Carbuncle">Carbuncle</option>
              <option value="Garuda">Garuda</option>
              <option value="Gungnir">Gungnir</option>
              <option value="Kujata">Kujata</option>
              <option value="Tonberry">Tonberry</option>
              <option value="Typhon">Typhon</option>
            </optgroup>
            <optgroup label="Gaia - Japan">
              <option value="Alexander">Alexander</option>
              <option value="Bahamut">Bahamut</option>
              <option value="Durandal">Durandal</option>
              <option value="Fenrir">Fenrir</option>
              <option value="Ifrit">Ifrit</option>
              <option value="Ridill">Ridill</option>
              <option value="Tiamat">Tiamat</option>
              <option value="Ultima">Ultima</option>
            </optgroup>
            <optgroup label="Mana - Japan">
              <option value="Anima">Anima</option>
              <option value="Asura">Asura</option>
              <option value="chocobo">Chocobo</option>
              <option value="Hades">Hades</option>
              <option value="Ixion">Ixion</option>
              <option value="Masamune">Masamune</option>
              <option value="Pandaemonium">Pandaemonium</option>
              <option value="Titan">Titan</option>
            </optgroup>
            <optgroup label="Meteor - Japan">
              <option value="Belias">Belias</option>
              <option value="Mandragora">Mandragora</option>
              <option value="Ramuh">Ramuh</option>
              <option value="Shinryu">Shinryu</option>
              <option value="Unicorn">Unicorn</option>
              <option value="Valefor">Valefor</option>
              <option value="Yojimbo">Yojimbo</option>
              <option value="Zeromus">Zeromus</option>
            </optgroup>
            <optgroup label="Aether - America">
              <option value="Adamantoise">Adamantoise</option>
              <option value="Cactuar">Cactuar</option>
              <option value="Faerie">Faerie</option>
              <option value="Gilgamesh">Gilgamesh</option>
              <option value="Jenova">Jenova</option>
              <option value="Midgardsormr">Midgardsormr</option>
              <option value="Sargatanas">Sargatanas</option>
              <option value="Siren">Siren</option>
            </optgroup>
            <optgroup label="Primal - America">
              <option value="Behemoth">Behemoth</option>
              <option value="Excalibur">Excalibur</option>
              <option value="Exodus">Exodus</option>
              <option value="Famfrit">Famfrit</option>
              <option value="Hyperion">Hyperion</option>
              <option value="Lamia">Lamia</option>
              <option value="Leviathan">Leviathan</option>
              <option value="Ultros">Ultros</option>
            </optgroup>
            <optgroup label="Crystal - America">
              <option value="Balmung">Balmung</option>
              <option value="Brynhildr">Brynhildr</option>
              <option value="Coeurl">Coeurl</option>
              <option value="Diabolos">Diabolos</option>
              <option value="Goblin">Goblin</option>
              <option value="Malboro">Malboro</option>
              <option value="Mateus">Mateus</option>
              <option value="Zalera">Zalera</option>
            </optgroup>
            <optgroup label="Dynamis - America">
              <option value="Halicarnassus">Halicarnassus</option>
              <option value="Maduin">Maduin</option>
              <option value="Marilith">Marilith</option>
              <option value="Seraph">Seraph</option>
            </optgroup>
            <optgroup label="Materia - Oceania">
              <option value="Bismarck">Bismarck</option>
              <option value="Ravana">Ravana</option>
              <option value="Sephirot">Sephirot</option>
              <option value="Sophia">Sophia</option>
              <option value="Zurvan">Zurvan</option>
            </optgroup>
            <optgroup label="陆行鸟 - 中国">
              <option value="宇宙和音">宇宙和音</option>
              <option value="幻影群岛">幻影群岛</option>
              <option value="神意之地">神意之地</option>
              <option value="萌芽池">萌芽池</option>
              <option value="沃仙曦染">沃仙曦染</option>
              <option value="拉诺西亚">拉诺西亚</option>
              <option value="晨曦王座">晨曦王座</option>
              <option value="红玉海">红玉海</option>
            </optgroup>
            <optgroup label="莫古力 - 中国">
              <option value="神拳痕">神拳痕</option>
              <option value="潮风亭">潮风亭</option>
              <option value="白金幻象">白金幻象</option>
              <option value="白银乡">白银乡</option>
              <option value="旅人栈桥">旅人栈桥</option>
              <option value="梦羽宝境">梦羽宝境</option>
              <option value="拂晓之间">拂晓之间</option>
              <option value="龙巢神殿">龙巢神殿</option>
            </optgroup>
            <optgroup label="猫小胖 - 中国">
              <option value="延夏">延夏</option>
              <option value="海猫茶屋">海猫茶屋</option>
              <option value="紫水栈桥">紫水栈桥</option>
              <option value="柔风海湾">柔风海湾</option>
              <option value="静语庄园">静语庄园</option>
              <option value="摩杜纳">摩杜纳</option>
              <option value="琥珀原">琥珀原</option>
            </optgroup>
            <optgroup label="豆豆柴 - 中国">
              <option value="伊修加德">伊修加德</option>
              <option value="黄金谷">黄金谷</option>
              <option value="月牙湾">月牙湾</option>
              <option value="水晶塔">水晶塔</option>
              <option value="雪松原">雪松原</option>
              <option value="太阳海岸">太阳海岸</option>
              <option value="红茶川">红茶川</option>
              <option value="银泪湖">银泪湖</option>
            </optgroup>
            <optgroup label="한국 - 한국">
              <option value="모그리">모그리</option>
              <option value="초코보">초코보</option>
              <option value="카벙클">카벙클</option>
              <option value="톤베리">톤베리</option>
              <option value="펜리르">펜리르</option>
            </optgroup>
          </select>
        </div>
      </div>
      <div class="freesearch">
        <p>FREE SEARCH</p>
        <input class="search-box" type="text" v-model="searchQuery" @keyup.enter="ItemSearch" />
      </div>
      <p class="category">CATEGORY SEARCH</p>
      <div v-for="(items, category) in categories" :key="category">
        <CategoryPanel :category="category" :items="items" @filter-search="FilterSearch" />
      </div>
      <div class="copyright">
        <p>FINAL FANTASY XIV</p>
        <p> (C) SQUARE ENIX CO., LTD. All Rights Reserved.</p>
        <p>Create by Premier</p>
      </div>
    </div>
    <div class="result">
      <div v-for="item in searchResults" :key="item" @click="selectItem(item)">
        <img :src="item.iconUrl" alt="アイコン" class="item-icon">
        <div class="item-info">
          <div class="item-name">{{ item.Name }}</div>
          <div v-if="item.isCraftable" class="item-craftable"><img class="craft"
              src="https://xivapi.com/cj/1/blacksmith.png"></div>
        </div>
      </div>
    </div>
    <div class="padding"></div>
    <div class="info">
      <!-- ローディングインジケータ: infoLoadingがtrueの場合に表示 -->
      <div v-if="infoLoading" class="info-loading-indicator">
        <div class="spinner"></div>
      </div>

      <!-- 情報ボックス: infoLoadingがfalseかつselectedInfoが存在する場合に表示 -->
      <div v-else-if="selectedInfo" class="info-box">
        <div class="info-text">
          <img :src="selectedInfo.iconUrl" alt="アイコン" class="item-icon-lg">
          <h3>{{ selectedInfo.Name }}</h3>
        </div>
        <div v-if="selectedInfo.isCraftable" class="craft-box">
          <div class="d-flex ">
            <h5>必要素材</h5>
            <p class="info-memo">(素材を作成したほうが安い場合赤文字で表示されます。)</p>
          </div>
          <div v-for="material in selectedInfo.materials" :key="material.name">
            <div class="material-row">
              <button class="material-button" v-if="material.hasSubMaterials"
                @click="material.expanded = !material.expanded">
                {{ material.expanded ? '▼' : '▶' }}
              </button>
              <div v-else class="button-placeholder"></div>
              <img v-if="material.iconUrl" :src="material.iconUrl" alt="アイコン" class="material-icon">
              <span class="material-name">{{ material.name }}</span>
              <span class="material-quantity">{{ material.quantity }}個</span>
              <span v-if="material.subMaterials && material.subMaterials.length > 0 && material.isCheaper"
                class="material-price cheaper-price">
                {{ material.subMaterialsTotalCost }} gil
              </span>
              <span v-else class="material-price">
                {{ material.price }} gil
              </span>
            </div>
            <div v-if="material.expanded" class="sub-materials">
              <div v-for="subMaterial in material.subMaterials" :key="subMaterial.name" class="sub-material-row">
                <img v-if="subMaterial.iconUrl" :src="subMaterial.iconUrl" alt="アイコン" class="material-icon">
                <span class="material-name">{{ subMaterial.name }}</span>
                <span class="material-quantity">{{ subMaterial.quantity }}個</span>
                <span class="material-price">{{ subMaterial.price }} gil</span>
              </div>
            </div>
          </div>
          <div class="material-row price-info border-top">
            <div class="button-placeholder"></div> <!-- 位置合わせ用のプレースホルダー -->
            <span class="material-name">総合計価格</span>
            <span class="material-price">{{ selectedInfo.totalCost }} gil</span>
          </div>
          <div class="material-row price-info">
            <div class="button-placeholder"></div> <!-- 位置合わせ用のプレースホルダー -->
            <span class="material-name">マーケット価格</span>
            <span class="material-price">{{ selectedInfo.finalProductPrice }} gil</span>
          </div>
          <div class="material-row price-info">
            <div class="button-placeholder"></div>
            <span class="material-name">利益率</span>
            <span class="material-price">{{ ((selectedInfo.finalProductPrice - selectedInfo.totalCost) /
              selectedInfo.totalCost * 100).toFixed(2) }}%</span>
          </div>
        </div>
        <div class="history">
          <div v-if="selectedInfo.sales" class="history-section">
            <h5>販売履歴</h5>
            <div class="history-data">
              <ul>
                <li v-for="sale in selectedInfo.sales.entries" :key="sale.timestamp">
                  <span>{{ sale.pricePerUnit }} gil</span>
                  <span>{{ new Date(sale.timestamp * 1000).toLocaleDateString() }}</span>
                  <span>{{ sale.buyerName }}</span>
                </li>
              </ul>
            </div>
          </div>
          <div v-if="selectedInfo.current" class="history-section">
            <h5>現在の市場価格</h5>
            <div class="history-data">
              <ul>
                <li v-for="listing in selectedInfo.current.listings" :key="listing.listingID">
                  <span>{{ listing.pricePerUnit }} gil</span>
                  <span>{{ new Date(listing.lastReviewTime * 1000).toLocaleDateString() }}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>

  </div>
</template>


<script>
import CategoryPanel from './components/CategoryPanel.vue';

export default {
  components: {
    CategoryPanel,
  },
  data() {
    return {
      searchQuery: '',
      isLoading: true,
      infoLoading: false,
      isSelectBoxOpen: false,
      selectedServer: 'Chocobo',
      searchResults: [],
      selectedInfo: null,
      categories: {
        'メインアーム/サブアーム': [
          { id: '060102', pairId: '10' },
          { id: '060103', pairId: '11' },
          { id: '060170', pairId: '76' },
          { id: '060181', pairId: '86' },
          { id: '060104', pairId: '13' },
          { id: '060183', pairId: '88' },
          { id: '060101', pairId: '9' },
          { id: '060177', pairId: '83' },
          { id: '060106', pairId: '73' },
          { id: '060105', pairId: '12' },
          { id: '060172', pairId: '77' },
          { id: '060182', pairId: '87' },
          { id: '060108', pairId: '14' },
          { id: '060109', pairId: '16' },
          { id: '060176', pairId: '84' },
          { id: '060107', pairId: '15' },
          { id: '060178', pairId: '85' },
          { id: '060171', pairId: '78' },
          { id: '060184', pairId: '89' },
          { id: '060112', pairId: '19' },
          { id: '060113', pairId: '20' },
          { id: '060114', pairId: '21' },
          { id: '060115', pairId: '22' },
          { id: '060116', pairId: '23' },
          { id: '060117', pairId: '24' },
          { id: '060118', pairId: '25' },
          { id: '060119', pairId: '26' },
          { id: '060120', pairId: '27' },
          { id: '060121', pairId: '28' },
          { id: '060122', pairId: '29' },
          { id: '060123', pairId: '30' }
        ],
        '防具/アクセサリ': [
          { id: '060110', pairId: '17' },
          { id: '060124', pairId: '31' },
          { id: '060126', pairId: '33' },
          { id: '060129', pairId: '36' },
          { id: '060128', pairId: '35' },
          { id: '060130', pairId: '37' },
          { id: '060133', pairId: '40' },
          { id: '060132', pairId: '39' },
          { id: '060134', pairId: '41' },
          { id: '060135', pairId: '42' }
        ],
        'その他': [
          { id: '060136', pairId: '6' },
          { id: '060137', pairId: '7' },
          { id: '060146', pairId: '45' },
          { id: '060138', pairId: '46' },
          { id: '060139', pairId: '47' },
          { id: '060140', pairId: '48' },
          { id: '060141', pairId: '49' },
          { id: '060142', pairId: '50' },
          { id: '060143', pairId: '51' },
          { id: '060144', pairId: '52' },
          { id: '060145', pairId: '53' },
          { id: '060147', pairId: '54' },
          { id: '060148', pairId: '55' },
          { id: '060150', pairId: '57' },
          { id: '060151', pairId: '58' },
          { id: '060152', pairId: '59' },
          { id: '060153', pairId: '60' },
          { id: '060154', pairId: '74' },
          { id: '060185', pairId: '90' },
          { id: '060155', pairId: '75' },
          { id: '060169', pairId: '79' },
          { id: '060173', pairId: '80' }
        ],
        'ハウジング': [
          { id: '060160', pairId: '65' },
          { id: '060161', pairId: '66' },
          { id: '060168', pairId: '67' },
          { id: '060164', pairId: '56' },
          { id: '060165', pairId: '68' },
          { id: '060162', pairId: '69' },
          { id: '060163', pairId: '70' },
          { id: '060166', pairId: '71' },
          { id: '060167', pairId: '72' },
          { id: '060174', pairId: '81' },
          { id: '060175', pairId: '82' }
        ],
      },
    };
  },
  created() {
    this.loadJsonData(); // コンポーネント作成時にJSONデータを読み込む
    const savedServer = localStorage.getItem('selectedServer');
    if (savedServer) {
      this.selectedServer = savedServer;
    }
  },
  methods: {
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
        this.searchResults = this.itemsData.filter(item =>
          item.Name.includes(this.searchQuery)
        ).map(item => ({
          ...item,
          iconUrl: this.getIconUrl(item.Icon),
          isCraftable: this.isCraftable(item.ItemId)
        }));
      } catch (error) {
        console.error('検索エラー:', error);
      }
    },
    FilterSearch(filterData) {
      try {
        // filterData.selectedOptionを配列に変換する
        const selectedJobId = this.findClassJobId(filterData.selectedJob);

        this.searchResults = this.itemsData.filter(item =>
          item.ItemSearchCategory === filterData.pairId &&
          (
            (filterData.category === 'メインアーム/サブアーム' && item.LevelEquip >= filterData.level) ||
            (
              filterData.category === '防具/アクセサリ' && item.LevelEquip >= filterData.level &&
              // '*'が選択されている場合はこの条件をスキップする
              selectedJobId.includes(String(item.ClassJobCategory))
            )
          )
        ).map(item => ({
          ...item,
          iconUrl: this.getIconUrl(item.Icon),
          isCraftable: this.isCraftable(item.ItemId)
        }));
      } catch (error) {
        console.error('検索エラー:', error);
      }
    },
    findClassJobId(selectedJob) {
      const matchingIds = [];
      for (const category of this.classJobCategories) {
        if (category[selectedJob] === "TRUE") {
          matchingIds.push(category.ID);
        }
      }
      return matchingIds;
    },
    getIconUrl(imageId) {
      const baseId = Math.floor(imageId / 1000) * 1000; // 1万の位を基にベースIDを算出
      const formattedBaseId = baseId.toString().padStart(6, '0'); // ベースIDを6桁でフォーマット
      const formattedImageId = imageId.toString().padStart(6, '0'); // 画像IDを6桁でフォーマット
      return `https://xivapi.com/i/${formattedBaseId}/${formattedImageId}.png`; // 完全なURLを生成
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
        }
        this.selectedInfo = selectedItem;
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
  },
};
</script>

<style scoped>
.loading-indicator {
  position: fixed;
  /* 画面に固定 */
  top: 0;
  left: 0;
  width: 100vw;
  /* ビューポートの全幅 */
  height: 100vh;
  /* ビューポートの全高 */
  background-color: #2D302D;
  /* 半透明の背景 */
  display: flex;
  justify-content: center;
  /* 中央揃え */
  align-items: center;
  /* 中央揃え */
  z-index: 1000;
  /* 他の要素より上に表示 */
}

.info-loading-indicator {
  top: 0;
  left: 0;
  width: 100%;
  /* infoセクションの幅に合わせる */
  height: 100%;
  /* infoセクションの高さに合わせる */
  padding: 0;
  background-color: rgba(45, 48, 45, 1);
  /* 半透明の背景色 */
  display: flex;
  justify-content: center;
  /* 中央揃え */
  align-items: center;
  /* 中央揃え */
  z-index: 10;
  /* 必要に応じてz-indexを調整 */
}

.spinner {
  border: 5px solid #f3f3f3;
  /* 軽い灰色のボーダー */
  border-top: 5px solid #3498db;
  /* 青色のボーダートップ */
  border-radius: 50%;
  /* 円形 */
  width: 100px;
  height: 100px;
  animation: spin 2s linear infinite;
  /* アニメーションの適用 */
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }

  100% {
    transform: rotate(360deg);
  }
}

.search-box {
  width: 250px;
  margin-left: 10px;
  border-radius: 5px;
  height: 25px;
  font-size: 13px;
  background-color: #545454;
  border: solid 1px #454044;
  color: #fff;
}

.search-container {
  width: 290px;
  height: calc(100vh - 20px);
}

.serverselect {
  width: 270px;
  margin: 10px 10px 5px 10px;
  padding: 3px 10px 7px 10px;
  border: 2px solid #515151;
  border-radius: 10px;
  padding-bottom: 5px;
}

.serverselect p {
  color: #7D7463;
  font-size: 20px;
  margin-bottom: 0;
  margin-left: 10px;
}

.select-box-container {
  display: flex;
  align-items: center;
}

.select-icon {
  margin-right: 10px;
  /* アイコンとセレクトボックスの間隔 */
}

.dropdown-icon {
  position: absolute;
  color: #fff;
  top: 61px;
  left: 35px;
  z-index: 100;
  font-size: 12px;
  /* セレクトボックスの上に表示 */
}

.select-box {
  flex-grow: 1;
  padding: 3px 0;
  padding-left: 30px;
  width: 246px;
  height: 25px;
  -webkit-appearance: none;
  -moz-appearance: none;
  appearance: none;
  color: #fff;
  background: linear-gradient(to bottom, #2F2F2F 0%, #272727 50%, #2F2F2F 100%);
  background-color: #2F2F2F;
  border: 1px solid #222222;
  border-radius: 9999px;
  font-size: 12px;
}

.freesearch {
  width: 270px;
  margin: 10px 10px 5px 10px;
  border: 2px solid #515151;
  border-radius: 10px;
  padding-bottom: 5px;
}

.freesearch p {
  color: #7D7463;
  font-size: 20px;
  margin-bottom: 0;
  margin-left: 10px;
}

.category {
  color: #7D7463;
  font-size: 20px;
  margin-bottom: 0;
  margin-left: 20px;
}

.copyright {
  font-size: 12px;
  color: #FFF;
  text-align: center;
}

.copyright p {
  margin-bottom: 0;
}

.result {
  width: 25%;
  height: calc(100vh - 20px);
  font-size: 14px;
  overflow-y: auto;
  padding: 10px;
  border-left: solid #575757 2px;
}

.craft {
  width: 20px;
  height: 20px;
}

::-webkit-scrollbar {
  width: 7px;
}

::-webkit-scrollbar-thumb {
  background: #7A7A7A;
  border-radius: 3px;
}

.item-icon {
  width: 30px;
  /* アイコンのサイズを設定 */
  height: 30px;
  margin-right: 10px;
}

.item-icon-lg {
  width: 50px;
  /* アイコンのサイズを設定 */
  height: 50px;
  margin-right: 10px;
  margin-left: 10px;
}

.result>div {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.item-name {
  color: #fff;
}

.item-craftable {
  color: #FFF;
}

.item-info {
  display: flex;
  align-items: center;
  justify-content: space-between;
  /* これにより要素が両端に配置されます */
  width: 100%;
  /* item-infoの幅を設定 */
}

.item-craftable {
  color: #FFF;
  margin-left: auto;
  /* クラフト可能テキストを右に寄せる */
}

.padding {
  width: 5px;
  height: calc(100vh - 20px);
}

.info {
  width: calc(100vw - 25% - 290px);
  height: calc(100vh - 20px);
  padding: 10px;
  color: #fff;
  border-left: solid #575757 2px;
}

.info-box {
  display: flex;
  flex-flow: column;
}

.info-text {
  display: flex;
  align-items: center;
}

.info h3 {
  margin-bottom: 0px;
}

.craft-box {
  height: calc(50vh - 25px);
  overflow-y: scroll;
  margin-top: 10px;
  margin-left: 10px;
  padding-right: 15px;
}

.history {
  height: calc(50vh - 65px);
}

.material-button {
  width: 30px;
  height: 30px;
  color: #fff;
  background: none;
  border: none;
}

.button-placeholder {
  width: 30px;
  /* ボタンと同じサイズ */
  height: 30px;
  /* ボタンと同じサイズ */
  display: inline-block;
  /* ブロックレベル要素として表示 */
}

.sub-material-row {
  margin-left: 50px;
}

li {
  margin-bottom: 5px;
}

ul {
  padding-left: 10px;
  list-style: none;
}

.material-row,
.sub-material-row {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.material-icon,
.sub-material-row .material-icon {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.material-name,
.sub-material-row .material-name {
  flex-grow: 1;
  margin-right: 10px;
}

.material-quantity,
.sub-material-row .material-quantity {
  width: 50px;
  text-align: right;
  margin-right: 10px;
}

.material-price,
.sub-material-row .material-price {
  width: 80px;
  text-align: right;
}

.sub-material-row {
  margin-left: 70px;
  /* サブ素材のインデント */
}

.border-top {
  border-top: solid #fff 2px;
}

.history {
  display: flex;
}

.history-section {
  flex: 0 0 50%;
  /* 各セクションを横幅の50%に設定 */
  padding: 15px;
  color: #fff;
  margin-right: 10px;
  margin-bottom: 10px;
  background-color: #2D302D;
}

.history-section:last-child {
  margin-right: 0;
  /* 最後のセクションの右余白を取り除く */
}

.history-data {
  max-height: calc(50vh - 65px - 40px);
  /* 高さをヘッダーとの差し引きで設定 */
  overflow-y: auto;
  /* スクロール可能に設定 */
  border-top: 1px solid #eee;
  /* 上部に境界線を追加 */
}

.history-section h5 {
  margin-bottom: 10px;
  /* タイトルとコンテンツの間隔を設定 */
}

.history-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-section li {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.history-section span {
  flex: 1;
  padding: 0 5px;
  text-align: center;
  color: #fff;
}

.cheaper-price {
  color: red;
}

.info-memo {
  font-size: 12px;
  color: yellow;
  vertical-align: bottom;
  margin-top: 6px;
  margin-bottom: 0;
}
</style>


