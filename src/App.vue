<template>
    <div class="container-fluid h-100">
        <div v-if="isLoading" class="loading-indicator">
            <loding></loding>
        </div>
        <div class="wrapper">
            <div class="search-box">
                <!-- サーバー選択 -->
                <div class="serverselect">
                    <p>SERVER SELECT</p>
                    <div class="select-box-container">
                        <span class="dropdown-icon">{{ isSelectBoxOpen ? '▼' : '▶' }}</span>
                        <select id="servers" class="select-box" @focus="isSelectBoxOpen = true"
                            @blur="isSelectBoxOpen = false" ref="servers" @change="onServerSelect"
                            v-model="selectedServer">
                            <option disabled="" value="">- Please Choose a Server -</option>
                            <optgroup v-for="(group, label) in servers" :label="label">
                                <option v-for="server in group" :value="server">{{ server }}</option>
                            </optgroup>
                        </select>
                    </div>
                </div>
                <!-- フリーサーチ -->
                <div class="freesearch">
                    <p>FREE SEARCH</p>
                    <input class="search-input" type="text" v-model="searchQuery" @keyup.enter="ItemSearch" />
                </div>
                <div class="category-box">
                    <p class="category">CATEGORY SEARCH</p>
                    <div v-for="(items, category) in categories" :key="category">
                        <CategoryPanel :category="category" :items="items" @filter-search="FilterSearch" />
                    </div>
                </div>
                <div class="AD" v-if="isScreenHeight1080">
                    <a href="https://discord.gg/GsGdqCTJNM" class="btn btn-discord" role="button">
                        Lodestone
                    </a>
                    <a href="https://discord.gg/GsGdqCTJNM" class="btn btn-discord" role="button">
                        MogStation
                    </a>
                    <a href="https://discord.gg/GsGdqCTJNM" class="btn btn-discord" role="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                            class="bi bi-discord" viewBox="0 0 16 16">
                            <path
                                d="M13.545 2.907a13.227 13.227 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.19 12.19 0 0 0-3.658 0 8.258 8.258 0 0 0-.412-.833.051.051 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.041.041 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032c.001.014.01.028.021.037a13.276 13.276 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019c.308-.42.582-.863.818-1.329a.05.05 0 0 0-.01-.059.051.051 0 0 0-.018-.011 8.875 8.875 0 0 1-1.248-.595.05.05 0 0 1-.02-.066.051.051 0 0 1 .015-.019c.084-.063.168-.129.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.052.052 0 0 1 .053.007c.08.066.164.132.248.195a.051.051 0 0 1-.004.085 8.254 8.254 0 0 1-1.249.594.05.05 0 0 0-.03.03.052.052 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.235 13.235 0 0 0 4.001-2.02.049.049 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.034.034 0 0 0-.02-.019Zm-8.198 7.307c-.789 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612Zm5.316 0c-.788 0-1.438-.724-1.438-1.612 0-.889.637-1.613 1.438-1.613.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612Z" />
                        </svg>
                    </a>
                    <a href="https://discord.gg/GsGdqCTJNM" class="btn btn-x" role="button">
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor"
                            class="bi bi-twitter-x" viewBox="0 0 16 16">
                            <path
                                d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z" />
                        </svg>
                    </a>
                </div>
                <div class="copyright">
                    <p>FINAL FANTASY XIV</p>
                    <p> (C) SQUARE ENIX CO., LTD. All Rights Reserved.</p>
                </div>
            </div>
            <div class="result-box">
                <div v-for="item in searchResults" :key="item" @click="selectItem(item)">
                    <img :src="item.iconUrl" alt="アイコン" class="item-icon" loading="lazy">
                    <div class="item-info">
                        <div class="item-name">{{ item.Name }}</div>
                        <div v-if="item.isCraftable" class="item-craftable"><img class="craft"
                                src="https://xivapi.com/cj/1/blacksmith.png"></div>
                    </div>
                </div>
            </div>
            <div class="info-box">
                <div v-if="infoLoading" class="info-loading-indicator">
                    <loding></loding>
                </div>
                <div v-if="selectedInfo && !infoLoading" class="info-main">
                    <div class="info-text">
                        <img :src="selectedInfo.iconUrl" alt="アイコン" class="item-icon-lg">
                        <div>
                            <div class="info-item d-flex align-items-center">
                                <h4>{{ selectedInfo.Name }}</h4>
                                <i class="fa-regular fa-copy fa-xl ms-2" @click="copyText" style="cursor: pointer;"></i>
                            </div>
                        </div>
                    </div>
                    <div class="info-contents">
                        <!-- タブメニュー -->
                        <div class="tab-menu">
                            <ul class="nav nav-tabs" id="myTab" role="tablist">
                                <li v-if="selectedInfo.isCraftable" class="nav-item" role="presentation">
                                    <button class="nav-link active" id="home-tab" data-bs-toggle="tab"
                                        data-bs-target="#home" type="button" role="tab" aria-controls="home"
                                        aria-selected="true">素材情報</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" :class="{ active: !selectedInfo.isCraftable }"
                                        id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile" type="button"
                                        role="tab" aria-controls="profile" aria-selected="false">相場情報</button>
                                </li>
                                <li class="nav-item" role="presentation">
                                    <button class="nav-link" id="contact-tab" data-bs-toggle="tab"
                                        data-bs-target="#contact" type="button" role="tab" aria-controls="contact"
                                        aria-selected="false">開発中</button>
                                </li>
                            </ul>
                            <div class="tab-content" id="myTabContent">
                                <div v-if="selectedInfo.isCraftable" class="tab-pane fade show active" id="home"
                                    role="tabpanel" aria-labelledby="home-tab">
                                    <div class="craft-box">
                                        <div v-if="selectedInfo.isCraftable" class="d-flex px-3">
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
                                                <img v-if="material.iconUrl" :src="material.iconUrl" alt="アイコン"
                                                    class="material-icon">
                                                <span class="material-name">{{ material.name }}</span>
                                                <span class="material-quantity">{{ material.quantity }}個</span>
                                                <span
                                                    v-if="material.subMaterials && material.subMaterials.length > 0 && material.isCheaper"
                                                    class="material-price cheaper-price">
                                                    {{ material.subMaterialsTotalCost.toLocaleString() }} 
                                                </span>
                                                <span v-else class="material-price">
                                                    {{ material.price.toLocaleString() }} 
                                                </span>
                                            </div>
                                            <div v-if="material.expanded" class="sub-materials">
                                                <div v-for="subMaterial in material.subMaterials"
                                                    :key="subMaterial.name" class="sub-material-row">
                                                    <img v-if="subMaterial.iconUrl" :src="subMaterial.iconUrl"
                                                        alt="アイコン" class="material-icon">
                                                    <span class="material-name">{{ subMaterial.name }}</span>
                                                    <span class="material-quantity">{{ subMaterial.quantity }}個</span>
                                                    <span class="material-price">{{ subMaterial.price.toLocaleString()
                                                        }} </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="material-row price-info border-top">
                                            <div class="button-placeholder"></div> <!-- 位置合わせ用のプレースホルダー -->
                                            <span class="material-name">総合計価格</span>
                                            <span class="material-price">{{ selectedInfo.totalCost.toLocaleString() }}
                                                </span>
                                        </div>
                                        <div class="material-row price-info">
                                            <div class="button-placeholder"></div> <!-- 位置合わせ用のプレースホルダー -->
                                            <span class="material-name">マーケット価格</span>
                                            <span class="material-price">{{
            selectedInfo.finalProductPrice.toLocaleString() }} </span>
                                        </div>
                                        <div class="material-row price-info">
                                            <div class="button-placeholder"></div>
                                            <span class="material-name">利益率</span>
                                            <span class="material-price">{{ ((selectedInfo.finalProductPrice -
            selectedInfo.totalCost) /
            selectedInfo.totalCost * 100).toFixed(2) }}%</span>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade"
                                    :class="{ 'show': !selectedInfo.isCraftable, 'active': !selectedInfo.isCraftable }"
                                    id="profile" role="tabpanel" aria-labelledby="profile-tab">
                                    <div class="history">
                                        <div v-if="selectedInfo.sales" class="history-section">
                                            <h5>販売履歴</h5>
                                            <div class="history-table">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th class="_sticky">#</th>
                                                            <th class="_sticky">HQ</th>
                                                            <th class="_sticky">単価</th>
                                                            <th class="_sticky">販売日</th>
                                                            <th class="_sticky">購入者</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(sale, index) in selectedInfo.sales.entries"
                                                            :key="sale.timestamp">
                                                            <td>{{ index + 1 }}</td>
                                                            <td v-if="sale.hq"></td>
                                                            <td v-else></td>
                                                            <td>{{ sale.pricePerUnit.toLocaleString() }}</td>
                                                            <td>{{ new Date(sale.timestamp * 1000).toLocaleDateString()
                                                                }}
                                                            </td>
                                                            <td>{{ sale.buyerName }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div v-if="selectedInfo.current" class="history-section">
                                            <h5>現在の市場価格</h5>
                                            <div class="history-table">
                                                <table>
                                                    <thead>
                                                        <tr>
                                                            <th class="_sticky">#</th>
                                                            <th class="_sticky">HQ</th>
                                                            <th class="_sticky">単価</th>
                                                            <th class="_sticky">最終確認日</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="(listing, index) in selectedInfo.current.listings"
                                                            :key="listing.listingID">
                                                            <td>{{ index + 1 }}</td>
                                                            <td v-if="listing.hq"></td>
                                                            <td v-else></td>
                                                            <td>{{ listing.pricePerUnit.toLocaleString() }} </td>
                                                            <td>{{ new Date(listing.lastReviewTime *
                                                                1000).toLocaleDateString() }}</td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
                                    開発中
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>
</template>
<script>
import Loding from './components/Loding.vue';
import CategoryPanel from './components/CategoryPanel.vue';
export default {
    components: {
        Loding,
        CategoryPanel,
    },
    data() {
        return {
            isLoading: true,
            infoLoading: false,
            isSelectBoxOpen: false,
            selectedServer: '',
            selectedInfo: null,
            searchResults: [],
            searchQuery: '',
            servers: {
                'Chaos - Europe': ['Cerberus', 'Louisoix', 'Moogle', 'Omega', 'Phantom', 'Ragnarok', 'Sagittarius', 'Spriggan'],
                'Light - Europe': ['Alpha', 'Lich', 'Odin', 'Phoenix', 'Raiden', 'Shiva', 'Twintania', 'Zodiark'],
                'Elemental - Japan': ['Aegis', 'Atomos', 'Carbuncle', 'Garuda', 'Gungnir', 'Kujata', 'Tonberry', 'Typhon'],
                'Gaia - Japan': ['Alexander', 'Bahamut', 'Durandal', 'Fenrir', 'Ifrit', 'Ridill', 'Tiamat', 'Ultima'],
                'Mana - Japan': ['Anima', 'Asura', 'Chocobo', 'Hades', 'Ixion', 'Masamune', 'Pandaemonium', 'Titan'],
                'Meteor - Japan': ['Belias', 'Mandragora', 'Ramuh', 'Shinryu', 'Unicorn', 'Valefor', 'Yojimbo', 'Zeromus'],
                'Aether - America': ['Adamantoise', 'Cactuar', 'Faerie', 'Gilgamesh', 'Jenova', 'Midgardsormr', 'Sargatanas', 'Siren'],
                'Primal - America': ['Behemoth', 'Excalibur', 'Exodus', 'Famfrit', 'Hyperion', 'Lamia', 'Leviathan', 'Ultros'],
                'Crystal - America': ['Balmung', 'Brynhildr', 'Coeurl', 'Diabolos', 'Goblin', 'Malboro', 'Mateus', 'Zalera'],
                'Dynamis - America': ['Halicarnassus', 'Maduin', 'Marilith', 'Seraph'],
                'Materia - Oceania': ['Bismarck', 'Ravana', 'Sephirot', 'Sophia', 'Zurvan'],
                '陆行鸟 - 中国': ['宇宙和音', '幻影群岛', '神意之地', '萌芽池', '沃仙曦染', '拉诺西亚', '晨曦王座', '红玉海'],
                '莫古力 - 中国': ['神拳痕', '潮风亭', '白金幻象', '白银乡', '旅人栈桥', '梦羽宝境', '拂晓之间', '龙巢神殿'],
                '猫小胖 - 中国': ['延夏', '海猫茶屋', '紫水栈桥', '柔风海湾', '静语庄园', '摩杜纳', '琥珀原', ''],
                '豆豆柴 - 中国': ['伊修加德', '黄金谷', '月牙湾', '水晶塔', '雪松原', '太阳海岸', '红茶川', '银泪湖'],
                '한국 - 한국': ['모그리', '초코보', '카벙클', '톤베리', '펜리르']
            },
            categories: {
                'メインアーム/サブアーム': [
                    { id: '060102', pairId: '10', name: '片手剣' },
                    { id: '060103', pairId: '11', name: '斧' },
                    { id: '060170', pairId: '76', name: '両手剣' },
                    { id: '060181', pairId: '86', name: 'ガンブレード' },
                    { id: '060104', pairId: '13', name: '槍' },
                    { id: '060183', pairId: '88', name: '両手鎌' },
                    { id: '060101', pairId: '9', name: '刀' },
                    { id: '060177', pairId: '83', name: '双剣双剣' },
                    { id: '060106', pairId: '73', name: '弓' },
                    { id: '060105', pairId: '12', name: 'テスト' },
                    { id: '060172', pairId: '77', name: 'テスト' },
                    { id: '060182', pairId: '87', name: 'テスト' },
                    { id: '060108', pairId: '14', name: 'テスト' },
                    { id: '060109', pairId: '16', name: 'テスト' },
                    { id: '060176', pairId: '84', name: 'テスト' },
                    { id: '060107', pairId: '15', name: 'テスト' },
                    { id: '060178', pairId: '85', name: 'テスト' },
                    { id: '060171', pairId: '78', name: 'テスト' },
                    { id: '060184', pairId: '89', name: 'テスト' },
                    { id: '060112', pairId: '19', name: 'テスト' },
                    { id: '060113', pairId: '20', name: 'テスト' },
                    { id: '060114', pairId: '21', name: 'テスト' },
                    { id: '060115', pairId: '22', name: 'テスト' },
                    { id: '060116', pairId: '23', name: 'テスト' },
                    { id: '060117', pairId: '24', name: 'テスト' },
                    { id: '060118', pairId: '25', name: 'テスト' },
                    { id: '060119', pairId: '26', name: 'テスト' },
                    { id: '060120', pairId: '27', name: 'テスト' },
                    { id: '060121', pairId: '28', name: 'テスト' },
                    { id: '060122', pairId: '29', name: 'テスト' },
                    { id: '060123', pairId: '30', name: 'テスト' }
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
                    { id: '060136', pairId: '43' },
                    { id: '060137', pairId: '44' },
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
    computed: {
        isScreenHeight1080() {
            return window.innerHeight === 1080; // 画面の高さが1080ピクセルかどうかを返す
        }
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
                const selectedJobId = this.findClassJobId(filterData.selectedJob);

                this.searchResults = this.itemsData.filter(item => {
                    // メインアーム/サブアームまたは防具/アクセサリの場合
                    if (filterData.category === 'メインアーム/サブアーム' || filterData.category === '防具/アクセサリ') {
                        return item.ItemSearchCategory === filterData.pairId &&
                            (
                                (filterData.category === 'メインアーム/サブアーム' && item.LevelEquip >= filterData.level) ||
                                (
                                    filterData.category === '防具/アクセサリ' && item.LevelEquip >= filterData.level &&
                                    selectedJobId.includes(String(item.ClassJobCategory))
                                )
                            );
                    }
                    // それ以外のカテゴリの場合
                    else {
                        return item.ItemSearchCategory === filterData.pairId;
                    }
                }).map(item => ({
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
<style>
button {
    cursor: pointer;
}

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

.wrapper {
    display: flex;
    width: 100%;
    height: 100%;
}

.search-box {
    margin-right: 0.5rem;
    margin-left: 0.5rem;
    flex: 0 0 auto;
    position: relative;
    width: 260px;
    height: 100%;
    padding-top: 10px;
}

.serverselect {
    padding: 3px 10px 7px 10px;
    height: fit-content;
    border: 2px solid #515151;
    border-radius: 10px;
    padding-bottom: 10px;
    margin-bottom: 5px;
}

.serverselect p {
    color: #7D7463;
    font-size: 15px;
    margin-bottom: 0;
    margin-left: 10px;
}

.select-box-container {
    display: flex;
    align-items: center;
}

.dropdown-icon {
    position: absolute;
    color: #fff;
    top: 40px;
    left: 20px;
    z-index: 100;
    font-size: 12px;
    /* セレクトボックスの上に表示 */
}

.select-box {
    flex-grow: 1;
    padding: 3px 0;
    padding-left: 30px;
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
    padding: 3px 10px 7px 10px;
    height: fit-content;
    border: 2px solid #515151;
    border-radius: 10px;
    padding-bottom: 10px;
}

.freesearch p {
    color: #7D7463;
    font-size: 15px;
    margin-bottom: 0;
    margin-left: 10px;
}

.search-input {
    flex-grow: 1;
    width: 100%;
    border-radius: 5px;
    height: 25px;
    font-size: 13px;
    background-color: #545454;
    border: solid 1px #454044;
    color: #fff;
}

.category-box p {
    color: #7D7463;
    font-size: 15px;
    margin-bottom: 0;
    margin-left: 5px;
}

.AD {
    height: 330px;
    margin-top: 20px;
    margin-bottom: 20px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    /* 要素を垂直方向に配置 */
}

.btn-discord {
    width: 100%;
    height: 50px;
    background-color: #7289da !important;
    /* Discordの青色 */
    border-color: #7289da !important;
    /* 枠線の色 */
    color: white !important;
    /* テキストの色 */
    border-radius: 5px !important;
    /* 角の丸み */
    margin-bottom: 10px;
    padding: 10px 20px !important;
    /* 内側の余白 */
    font-size: 16px !important;
    /* テキストのフォントサイズ */
}

.btn-discord:hover {
    background-color: #677bc4 !important;
    /* マウスオーバー時の背景色 */
    border-color: #677bc4 !important;
    /* マウスオーバー時の枠線の色 */
}

.btn-x {
    width: 100%;
    height: 50px;
    background-color: #1DA1F2 !important;
    /* Twitter Xの青色 */
    border-color: #1DA1F2 !important;
    /* 枠線の色 */
    color: white !important;
    /* テキストの色 */
    border-radius: 5px !important;
    /* 角の丸み */
    margin-bottom: 10px;
    padding: 10px 20px !important;
    /* 内側の余白 */
    font-size: 16px !important;
    /* テキストのフォントサイズ */
}

.btn-x:hover {
    background-color: #0F7AE5 !important;
    /* マウスオーバー時の背景色 */
    border-color: #0F7AE5 !important;
    /* マウスオーバー時の枠線の色 */
}



.copyright {
    position: absolute;
    bottom: 0;
    margin-bottom: 10px;
    font-size: 10px;
    color: #FFF;
    width: 100%;
    text-align: center;
}

.copyright p {
    margin-bottom: 0;
    color: #fff;
}

.result-box {
    flex: 0 0 auto;
    height: 100%;
    width: calc(calc(100vw - 285px)* 0.35);
    font-size: 14px;
    overflow-y: auto;
    padding: 10px;
    border-left: solid #575757 2px;
    border-right: solid #575757 2px;
}

.result-box>div {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
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

.item-name,
.item-craftable {
    color: #FFF;
}

.item-info {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.item-craftable {
    color: #FFF;
    margin-left: auto;
    /* クラフト可能テキストを右に寄せる */
}

.craft {
    width: 20px;
    height: 20px;
}

.info-box {
    flex: 0 0 auto;
    height: 100%;
    width: calc(calc(100vw - 285px)* 0.65);
    font-size: 14px;
    overflow-y: auto;
    padding: 10px;
    border-left: solid #575757 2px;
    border-right: solid #575757 2px;
}

.info-text {
    display: flex;
    align-items: center;
    color: #fff;
    margin-bottom: 20px;
}

.info-item h3,
.info-item h6 {
    margin-bottom: 0px;
}

.copy-icon:hover {
    color: #eee;
    /* ホバー時の色 */
}

.info-contents {
    flex-grow: 1;
    width: 100%;
    height: fit-content;
    color: #fff;
}

.info-main {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.info-data {
    width: 100%;
    height: 100%;
    overflow: hidden;
}

.info-memo {
    font-size: 12px;
    color: yellow;
    vertical-align: bottom;
    margin-top: 6px;
    margin-bottom: 0;
}

.craft-box {
    overflow-y: scroll;
    height: calc(100% - 60px);
    margin: 10px;
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
    width: 100%;
    height: 95%;
    padding: 0px 10px 0px 10px;
    display: flex;
    gap: 10px;
}

.history-section {
    flex: 0 0 50%;
    /* 各セクションを横幅の50%に設定 */
    color: #fff;
    margin-bottom: 10px;
    background-color: #2D302D;
}

.history-table {
    overflow-y: scroll;
    height: 100%;
}

table {
    border-collapse: collapse;
    border-spacing: 0;
    width: 100%;
}

th,
td {
    vertical-align: middle;
    padding: 5px;
    border: 1px solid #fff;
    color: #fff;
    font-size: 14px;
    text-align: center;
    white-space: nowrap;
}

th {
    background: #795548;
    border-left: 1px solid #434857 !important;
    border-right: 1px solid #434857 !important;
}

td {
    background: #17191E;
    border: 1px solid #434857 !important;
}

._sticky {
    position: sticky;
    top: 0;
    left: 0;
    background: none;
    border-top: none;
    border-bottom: none;
    text-align: center;
}

._sticky:before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: #434857;
    z-index: -1;
}

/*===========
.scroll-box
===========*/

.scroll-box {
    height: 300px;
    overflow-y: auto;
    padding-right: 10px;
    -webkit-overflow-scrolling: touch;
}

/*===========
scrollbar
===========*/


/*スクロールバー全体の高さ*/

.scroll-box::-webkit-scrollbar {
    width: 4px;
}

/*スクロールバー全体の背景*/

.scroll-box::-webkit-scrollbar-track {
    background: #eee;
}

/*スクロールバーの動く部分*/

.scroll-box::-webkit-scrollbar-thumb {
    background: #aaa;
    border: none;
}

/*スクロールバーの動く部分のホバー（マウスオーバー）*/

.scroll-box::-webkit-scrollbar-thumb:hover {
    background: #999;
}

/* ホバー時の行の背景色 */

.cheaper-price {
    color: red;
}

/* 選択されているタブのスタイル */
.nav-tabs .nav-link.active {
    color: #495057;
    background-color: #fff;
    border-color: #dee2e6 #dee2e6 #fff;
    height: 110%;
}

/* 選択されていないタブのスタイル */
.nav-tabs .nav-link {
    color: #495057;
    background-color: #868788;
    border: 1px solid transparent !important;
    border-top-left-radius: 0.25rem !important;
    border-top-right-radius: 0.25rem !important;
    height: 110%;
}

/* ホバー時のタブのスタイル */
.nav-tabs .nav-link:hover {
    border-color: #e9ecef #e9ecef #dee2e6;
}

.tab-content {
    height: calc(100vh - 120px) !important;
}

.tab-menu {
    height: 100%;
}

.tab-pane {
    padding: 5px;
    height: 100%;
}

.container-fluid {
    --bs-gutter-x: 0 !important;
}

.tooltip.show {
    opacity: 1 !important;
}

.custom-tooltip {
    padding: 0 !important;
}

.custom-tooltip .tooltip-inner {
    background-color: white;
    color: black;
}

.tooltip-arrow,
.tooltip-arrow::before {
    border-top-color: white !important;
    border-bottom-color: white !important;
}
</style>