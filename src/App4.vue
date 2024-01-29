<template>
    <div class="main">
        <div class="wrapper">
            <div class="search-box">

            </div>
            <div class="result-box">
                
            </div>
            <div class="info-box">
                <div class="info-data">

                </div>
                <!-- タブメニュー -->
                <div class="tab-menu">
                    <ul class="nav nav-tabs" id="myTab" role="tablist">
                        <li class="nav-item" role="presentation">
                            <button class="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home"
                                type="button" role="tab" aria-controls="home" aria-selected="true">ホーム</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile"
                                type="button" role="tab" aria-controls="profile" aria-selected="false">プロフィール</button>
                        </li>
                        <li class="nav-item" role="presentation">
                            <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact"
                                type="button" role="tab" aria-controls="contact" aria-selected="false">コンタクト</button>
                        </li>
                    </ul>
                    <div class="tab-content" id="myTabContent">
                        <div class="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            ホームのコンテンツ...</div>
                        <div class="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
                            プロフィールのコンテンツ...</div>
                        <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">コンタクトのコンテンツ...
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
                'Chaos - Europe': ['Cerberus', 'Louisoix', 'Moogle'],
                'Light - Europe': ['Alpha', 'Lich', 'Odin'],
            },
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
    created() {
        this.loadJsonData(); // コンポーネント作成時にJSONデータを読み込む
        const savedServer = localStorage.getItem('selectedServer');
        if (savedServer) {
            this.selectedServer = savedServer;
        } else {
            this.selectedServer = 'chocobo';
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
            return `https://res.cloudinary.com/dke932tm8/image/upload/v1706168566/icon/${formattedImageId}.png`; // 完全なURLを生成
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
<style>
.main {
    width: 100%;
    height: 100%;
}

.wrapper {
    display: flex;
    width: 100%;
    height: 100%;
}

.search-box {
    flex: 0 0 auto;
    position: relative;
    width: 285px;
    height: 100%;
    padding-top: 10px;
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

.info-box {
    flex: 0 0 auto;
    flex-grow: 1;
    height: 100%;
    font-size: 14px;
    overflow-y: auto;
    padding: 10px;
    border-left: solid #575757 2px;
    border-right: solid #575757 2px;
}

.tab-content {
    color: #fff;
}</style>