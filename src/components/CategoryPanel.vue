<template>
    <div class="searchpanel">
        <div class="category">
            <p>{{ category }}</p>
            <div class="button-grid full">
                <button v-for="(item, index) in items" :key="`btn-${index}`"
                    @click="filterSearch(item.pairId, level, selectedOption)">
                    <img :src="`src/assets/img/${item.id}.png`" alt="Icon" class="button-icon">
                </button>
            </div>
            <!-- レベル選択UIの追加 -->
            <div v-if="category === 'メインアーム/サブアーム' || category === '防具/アクセサリ'" class="level-selector-container">
                <div class="level-selector">
                    <span class="leveltext">Lv</span>
                    <input type="text" class="level-input" v-model.number="currentLevel">
                    <button class="level-up" @click="incrementLevel">+</button>
                    <button class="level-down" @click="decrementLevel">-</button>
                </div>
            </div>
            <div v-if="category === '防具/アクセサリ'" class="select-box-container">
                <div class="select-box-header">
                    <span class="dropdown-icon">{{ isSelectBoxOpen ? '▼' : '▶' }}</span>
                    <select class="select-box" v-model="selectedJob" @focus="isSelectBoxOpen = true"
                        @blur="isSelectBoxOpen = false">
                        <option value="ADV">すべて表示</option>
                        <option value="PLD">ナイト</option>
                        <option value="GLA">剣術士</option>
                        <option value="WAR">戦士</option>
                        <option value="MRD">斧術士</option>
                        <option value="DRK">暗黒騎士</option>
                        <option value="GNB">ガンブレイカー</option>
                        <option value="WHM">白魔道士</option>
                        <option value="CNJ">幻術士</option>
                        <option value="SCH">学者</option>
                        <option value="AST">占星術師</option>
                        <option value="SGE">賢者</option>
                        <option value="MNK">モンク</option>
                        <option value="PGL">格闘士</option>
                        <option value="DRG">竜騎士</option>
                        <option value="LNC">槍術士</option>
                        <option value="NIN">忍者</option>
                        <option value="ROG">双剣士</option>
                        <option value="SAM">侍</option>
                        <option value="RPR">リーパー</option>
                        <option value="BRD">吟遊詩人</option>
                        <option value="MCH">機工士</option>
                        <option value="DNC">踊り子</option>
                        <option value="BLM">黒魔道士</option>
                        <option value="THM">呪術士</option>
                        <option value="SMN">召喚士</option>
                        <option value="ACN">巴術士</option>
                        <option value="RDM">赤魔道士</option>
                        <option value="BLU">青魔道士</option>
                        <option value="CRP">木工師</option>
                        <option value="BSM">鍛冶師</option>
                        <option value="ARM">甲冑師</option>
                        <option value="GSM">彫金師</option>
                        <option value="LTW">革細工師</option>
                        <option value="WVR">裁縫師</option>
                        <option value="ALC">錬金術師</option>
                        <option value="CUL">調理師</option>
                        <option value="MIN">採掘師</option>
                        <option value="BTN">園芸師</option>
                        <option value="FSH">漁師</option>
                    </select>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        category: String,
        items: Array,
    },
    data() {
        return {
            mainArmSubArmLevel: 1, // メインアーム/サブアームのレベル
            armorAccessoryLevel: 1, // 防具/アクセサリのレベル
            selectedJob: 'ADV',
            isSelectBoxOpen: false,
        };
    },
    computed: {
        currentLevel: {
            get() {
                return this.category === 'メインアーム/サブアーム' ? this.mainArmSubArmLevel : this.armorAccessoryLevel;
            },
            set(value) {
                if (this.category === 'メインアーム/サブアーム') {
                    this.mainArmSubArmLevel = value;
                } else if (this.category === '防具/アクセサリ') {
                    this.armorAccessoryLevel = value;
                }
            }
        }
    },
    methods: {
        incrementLevel() {
            if (this.category === 'メインアーム/サブアーム' && this.mainArmSubArmLevel < 90) {
                this.mainArmSubArmLevel++;
            } else if (this.category === '防具/アクセサリ' && this.armorAccessoryLevel < 90) {
                this.armorAccessoryLevel++;
            }
        },
        decrementLevel() {
            if (this.category === 'メインアーム/サブアーム' && this.mainArmSubArmLevel > 1) {
                this.mainArmSubArmLevel--;
            } else if (this.category === '防具/アクセサリ' && this.armorAccessoryLevel > 1) {
                this.armorAccessoryLevel--;
            }
        },
        filterSearch(pairId) {
            let filterData = {
                pairId,
                category: this.category // カテゴリーを追加
            };
            // カテゴリーに応じて適切なレベルを使用
            if (this.category === 'メインアーム/サブアーム') {
                filterData.level = this.mainArmSubArmLevel;
            } else if (this.category === '防具/アクセサリ') {
                filterData.level = this.armorAccessoryLevel;
                filterData.selectedJob = this.selectedJob; // ClassJobCategory.ID を追加
            }
            // 親コンポーネントにフィルター検索の指示を伝える
            console.log(filterData)
            this.$emit('filter-search', filterData);
        }
    },
};
</script>
  
  
<style scoped>
.searchpanel {
    height: 100%;
}

.category {
    border: 2px solid #515151;
    border-radius: 10px;
    padding: 3px 10px 10px 10px;
    margin:0 auto 5px auto;
}

.category p {
    font-size: 12px;
    color: #9A9A9A;
    margin-bottom: 5px !important;
}

.button-grid {
    display: grid;
    grid-template-columns: repeat(10, 20px);
    gap: 4px;
}

.button-icon {
    width: 20px;
    height: 20px;
}

.button-grid button {
    width: 20px;
    height: 20px;
    padding: 0;
    border: none;
    background: transparent;
}

.level-selector-container {
    display: flex;
    justify-content: center;
    margin-top: 10px;
}

.level-selector {
    display: flex;
    align-items: center;
    border-radius: 5px;
    padding: 2px 6px;
}

.leveltext {
    color: #6A6A6A;
}

.level-input {
    margin: 0 0 0 10px;
    /* ボタンとの余白 */
    width: 35px;
    height: 25px;
    color: #fff;
    background-color: #545454;
    border: solid 1px #454044;
    border-radius: 5px;
    text-align: center;
}

.level-up,
.level-down {
    display: flex;
    justify-content: center;
    /* 水平方向の中央揃え */
    align-items: center;
    /* 垂直方向の中央揃え */
    background-color: #202020;
    color: black;
    border: solid 1px #151515;
    border-radius: 5px;
    cursor: pointer;
    font-size: 23px;
    width: 25px;
    height: 25px;
}

.triangle-icon {
    width: 0;
    height: 0;
    margin: 0 10px;
    border-top: 5px solid transparent;
    border-bottom: 5px solid transparent;
    border-left: 10px solid #FFFDC6;
    position: relative;
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
    top: 438px;
    left: 20px;
    z-index: 100;
    font-size: 12px;
    /* セレクトボックスの上に表示 */
}

.select-box {
    flex-grow: 1;
    margin-top: 5px;
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

.select-box:focus {
  outline: none;
}

::-webkit-scrollbar {
    width: 7px;
}

::-webkit-scrollbar-thumb {
    background: #7A7A7A;
    border-radius: 3px;
}
</style>
  