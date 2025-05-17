<template>
    <div class="scope-root relative min-h-screen flex justify-center items-start">
        <div style="display: none">
            <img src="/image/0.png">
            <img src="/image/1.png">
            <img src="/image/2.png">
            <img src="/image/3.png">
            <img src="/image/4.png">
            <img src="/image/5.png">
            <img src="/image/6.png">
            <img src="/image/7.png">
            <img src="/image/8.png">
            <img src="/image/9.png">
            <img src="/image/正_0.png">
            <img src="/image/正_1.png">
            <img src="/image/正_2.png">
            <img src="/image/正_3.png">
            <img src="/image/正_4.png">
            <img src="/image/正_5.png">
        </div>
        <!-- 模糊背景層 -->
        <div v-if="printMode == false"
            class="image-bg fixed inset-0 -z-1 w-full min-h-screen bg-fixed bg-cover bg-center bg-[url('/image/bg-real.jpg')] blur-[4px] scale-110">
        </div>
        <!-- 截宣傳圖用 -->
        <div v-else
            class="image-bg fixed inset-0 -z-1 w-full min-h-screen bg-fixed bg-contain bg-center bg-[url('/image/bg-real.jpg')] blur-[4px] scale-180">
        </div>

        <div class="min-w-[56rem] max-w-[56rem] bg-black/20 flex justify-center">

            <!-- MENU -->
            <div
                class="menu w-[32rem] p-6 m-6 border-2 border-gray-400 font-bold bg-[var(--sheet-color)] text-[var(--ink-color)]">

                <!-- 標題區 -->
                <div class="grid gap-y-2 mb-1">
                    <div
                        class="title bg-[var(--ink-color)] text-[var(--sheet-color)] border-2 border-[var(--ink-color)] text-center py-1 text-[32px]">
                        凱　哥　燒　烤
                    </div>

                    <div class="info flex w-full px-1 pt-3">
                        <span class="flex-1">小本經營，只收現金！</span>
                        <span class="relative text-right">
                            <img class="togo-img" src="/image/checked.png">
                            □外帶 □內用 桌號：＿＿合計：＿＿＿＿＿＿gil
                            <!-- 總價 -->
                            <div class="sum flex">
                                <img v-for="(src, index) in sumImgSrcList" :key="index" :src="src" />
                            </div>

                        </span>
                    </div>
                </div>

                <!-- 內容區 -->
                <div class="grid gap-y-4">
                    <!-- 分類BOX -->
                    <div v-for="(category, cIndex) in categories" :key="cIndex"
                        class="bg-[var(--sheet-color)] border-4 border-[var(--ink-color)]">

                        <!-- 分類名稱 -->
                        <div class="bg-[var(--ink-color)] text-[var(--sheet-color)] text-[22px] px-1">
                            {{ category.name }}
                        </div>
                        <!-- 品項BOX -->
                        <div class="divide-y divide-[var(--ink-color)]">
                            <div v-for="(item, index) in category.items" :key="index"
                                class="grid grid-cols-7 items-center divide-x-4 divide-[var(--ink-color)]">

                                <!-- 品項資訊 -->
                                <div class="col-span-5 h-full flex flex-col justify-center px-1">
                                    <div>
                                        <span class="pr-1">{{ item.name }}</span>
                                        <span class="text-sm text-[var(--name2-text-color)]">{{ item.name2 }}</span>
                                    </div>
                                    <div class="msg text-[var(--msg-text-color)]">{{ item.msg }}</div>
                                </div>

                                <!-- 價格 -->
                                <div class="price col-span-1 h-full flex items-center justify-end px-1">
                                    {{ item.price }}</div>

                                <!-- 數量-->
                                <div class="col-span-1 h-full flex items-center justify-center">
                                    <button v-if="printMode == false" @click="decrease(cIndex, index)"
                                        class="text-gray-400 z-10">－</button>

                                    <div class="flex-1 relative">
                                        <img :src="countImgSrc(item.count)"
                                            class="absolute -top-5 w-[60px] h-[55px] z-0" />
                                    </div>

                                    <button v-if="printMode == false" @click="increase(cIndex, index)"
                                        class="text-gray-400 z-10">＋</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- 資訊區 -->
                <div class="info -mb-2 px-2">
                    <div>請填妥菜單後交給老闆，現點現做請耐心等候，感謝！</div>
                    <div>店址：元素服提風區 伊修加德居住區擴張街10-56號 攤位09</div>
                </div>
            </div>

            <!-- 工具箱 -->
            <div class="p-4" v-if="printMode == false">
                <div
                    class="bg-yellow-50 border-4 border-[#bd4747] rounded-lg shadow-2xl flex flex-col gap-2 p-4 m-2 w-36">
                    <!-- 送單按鈕 -->
                    <button @click="showModal = true"
                        class="bg-[#bd4747] text-white font-bold py-2 px-3 rounded hover:bg-red-700 transition-all duration-150">
                        咻咻咻～
                    </button>
                </div>
            </div>
        </div>

        <!-- 彈出視窗 -->
        <div v-if="showModal" class="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
            <div
                class="bg-yellow-50 border-4 border-[#bd4747] rounded-lg shadow-2xl p-4 min-w-[300px] min-h-[200px] max-w-[90%]">

                <!-- 內容區 -->
                <div
                    class="border-2 border-dashed border-[#bd4747] p-4 text-black font-semibold whitespace-pre-wrap min-h-[100px]">
                    {{ orderText }}
                </div>

                <!-- 按鈕區 -->
                <div class="mt-4 flex justify-between items-center space-x-2">
                    <button @click="copyOrderText"
                        class="flex-1 bg-[#bd4747] text-white font-bold py-2 rounded hover:bg-red-700 transition-all duration-150">
                        複製文字
                    </button>
                    <button @click="showModal = false"
                        class="flex-1 bg-gray-700 text-white font-bold py-2 rounded hover:bg-gray-700 transition-all duration-150">
                        關閉
                    </button>
                    <!-- <button @click="refreshOrderText"
                        class="bg-yellow-400 text-black font-bold py-2 px-3 rounded hover:bg-yellow-300 transition-all duration-150">
                        ↻
                    </button> -->
                </div>
            </div>
        </div>



    </div>


</template>

<script setup>
import { ref, reactive, computed } from 'vue'
const categories = reactive([
    {
        name: '炭燒串烤 grill',
        items: [
            { short: '牛串', name: '超多汁牛肉烤串', name2: 'beef', price: 1200, msg: '來自拉札罕放牧區，這牛的肉比光戰還緊實，烤了也比較香', count: 0 },
            { short: '鳥串', name: 'DoDo鳥腿肉烤串', name2: 'dodo', price: 1000, msg: '渡渡鳥界滿級精選大腿肉，好吃程度不輸你家陸行鳥', count: 0 },
            { short: '魚串', name: '爆爆魚串', name2: 'fish', price: 1000, msg: '海賊眾說吃這魚可以加直爆，不管你信不信反正我是信了', count: 0 },
            { short: '青菜', name: '健康烤時蔬', name2: 'vegetable', price: 1000, msg: '蔬菜的使命就是幫你少一點罪惡感，烤了更像在做健康選擇', count: 0 },
            { short: '香腸', name: '烤香腸', name2: 'sausage', price: 1000, msg: '對面澤中的學生放學都會來買，人手一支，一口爆汁！', count: 0 },
            //{ short: '香腸', name: '香腸泡菜', name2: 'sausage & pickled cabbage', price: 1000, msg: '泡菜才是靈魂，香腸只是載具，不接受單點香腸', count: 0 },
            { short: '烤蝦', name: '焗烤鮮蝦', name2: 'shrimp', price: 1200, msg: '搭配特製醬汁來食用，味道更是妙不可言', count: 0 },
            { short: '海螺', name: '烤海螺', name2: 'snail', price: 1500, msg: '老闆為這顆螺跑了四個市場，請尊重牠的旅程和價格', count: 0 },
        ],
    },
    {
        name: '精選炸物 fried',
        items: [
            { short: '豆腐', name: '不是臭豆腐', name2: 'tofu', price: 800, msg: '之前有客人抱怨蟹肉餅變成臭蟹肉餅，只好改賣炸豆腐', count: 0 },
            { short: '花枝', name: '炸一堆花枝圈', name2: 'squid', price: 1000, msg: '我賣花枝圈的原則就是幹你娘塞爆！(售完為止)', count: 0 },
            { short: '蟹餅', name: '炸蟹肉餅', name2: 'crab cake', price: 1000, msg: '製作過程中沒有真正螃蟹受傷，只有老闆燙傷', count: 0 },
            { short: '炸魚', name: '酥炸鮮魚塊', name2: 'fish', price: 1000, msg: '外表金酥脆，內底超Juicy，乎你呷嘎ㄟ彈舌', count: 0 },
        ],
    },
    {
        name: '飲品 drink',
        items: [
            { short: '紅茶', name: '紅茶', name2: 'black tea', price: 500, msg: '烏爾達哈紅茶，解膩好選擇，解完記得再多吃兩串', count: 0 },
            { short: '奶茶', name: '奶茶', name2: 'milk tea', price: 700, msg: '早餐店奶茶，沒有賣鮮奶茶，因為老闆喜歡早餐店奶茶', count: 0 },
            { short: '豆漿', name: '豆漿', name2: 'soy milk', price: 700, msg: '有客人問怎麼沒有紅茶豆漿，啊你就各買一杯自己加', count: 0 },
            { short: '麥仔茶', name: '麥仔茶', name2: 'barley tea', price: 500, msg: '○○味麥仔～茶～(唱)(老闆沒接業配，但歡迎洽談)', count: 0 },
            { short: '柳丁汁', name: '柳丁汁', name2: 'orange juice', price: 700, msg: '純手工現榨，柳丁本人也不確定為什麼要這麼累', count: 0 },
        ],
    },
]);

const printMode = ref(false)

// 讓你能在瀏覽器 console 裡用 window.toggleDebug() 切換它
window.togglePrintMode = () => {
    printMode.value = !printMode.value
    console.log('printMode:', printMode.value)
}

// categories[0].items[0].count = 1
// categories[0].items[1].count = 2
// categories[0].items[2].count = 3
// categories[0].items[3].count = 4
// categories[0].items[4].count = 5

const increase = (cIndex, iIndex) => {
    if (categories[cIndex].items[iIndex].count < 5) {
        categories[cIndex].items[iIndex].count++;
    }
};

const decrease = (cIndex, iIndex) => {
    if (categories[cIndex].items[iIndex].count > 0) {
        categories[cIndex].items[iIndex].count--;
    }
};

const getSum = computed(() => {
    //return 11000
    let sum = 0;
    for (const cate of categories) {
        for (const item of cate.items) {
            sum += item.price * item.count
        }
    }
    return sum
})

const countImgSrc = (count) => {
    if (count < 0 || count > 5) return '';
    return `${import.meta.env.BASE_URL}image/正_${count}.png`;
};

const sumImgSrcList = computed(() =>
    getSum.value > 0 ? getSum.value.toString().split('').map(d => `${import.meta.env.BASE_URL}image/${Number(d)}.png`) : []
);

const showModal = ref(false)

const orderText = computed(() => {
    const result = categories.flatMap(cate =>
        cate.items
            .filter(item => item.count > 0)
            .map(item => `${item.short}${item.count}` + ((cate.name == '飲品 drink') ? '杯' : '份'))
    ).join('、')
    return (result == '') ? "你還沒點餐，老闆感到很切心...T_T" : result
})

const copyOrderText = () => {
    navigator.clipboard.writeText(orderText.value)
}

</script>

<style scoped>
.scope-root {
    --sheet-color: #ffdfdf;
    --ink-color: #302726;
    --name2-text-color: #555;
    --msg-text-color: #777;
}

.image-bg::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: rgba(0, 0, 0, 0.2);
}

.menu {
    font-family: '新細明體';
    font-size: 16px;
    box-shadow: 5px 10px 20px #333, -2px -1px 5px #333;
}

.title {
    font-family: '標楷體';
}

.info {
    font-family: '標楷體';
}

.price {
    font-family: 'sans-serif';
}

.msg {
    font-size: 13px;
}

.togo-img {
    position: absolute;
    bottom: -3px;
    left: -7px;
    width: 50px;
    height: 50px;
    object-fit: cover;
    z-index: 1;
    overflow: visible;
    transform: rotate(10deg);
}

.sum {
    position: absolute;
    bottom: -5px;
    right: 0px;
    transform: rotate(-10deg);
}

.sum img {
    transform: rotate(10deg);
    height: 50px;
}

button {
    cursor: pointer;
}
</style>
