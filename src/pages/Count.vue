<template>
    <div class="scope-root relative min-h-screen flex  items-start">
        <div style="position:absolute; right: 0;">
            <router-link to="/">。</router-link>
        </div>
        <!-- 模糊背景層 -->
        <div v-if="printMode == false"
            class="image-bg fixed inset-0 -z-1 w-full min-h-screen bg-fixed bg-cover bg-center bg-[url('/image/bg-real.jpg')] blur-[4px] scale-110">
        </div>
        <!-- 截宣傳圖用 -->
        <div v-else
            class="image-bg fixed inset-0 -z-1 w-full min-h-screen bg-fixed bg-contain bg-center bg-[url('/image/bg-real.jpg')] blur-[4px] scale-180">
        </div>

        <div class="w-full min-h-screen bg-black/20 justify-center">
            <!-- MENU -->
            <div
                class="menu min-w-[28rem] w-[28rem] h-fit p-4 m-4 mx-auto border-2 border-gray-400 font-bold bg-[var(--sheet-color)] text-[var(--ink-color)]">

                <div class="grid gap-y-2">
                    <div v-for="(category, cIndex) in categories" :key="cIndex"
                        class="bg-[var(--sheet-color)] border-2 border-[var(--ink-color)]">
                        <div class="grid grid-cols-5 gap-2">

                            <!-- 品項 -->
                            <div v-for="(item, index) in category.items" :key="index" class="item | relative border-2"
                                :class="(item.count > 0) ? 'border-[red]' : 'border-[var(--ink-color)]'">
                                <div
                                    class="absolute -top-2 -left-2 bg-gray-600 text-white rounded-xl h-4 w-4 text-[14px] items-center justify-center flex">
                                    <button @click="decrease(cIndex, index)" class="z-10">－</button>
                                </div>
                                <div class="flex flex-col text-center text-bold" @click="increase(cIndex, index)">
                                    <div class="bg-[var(--ink-color)] text-[var(--sheet-color)] px-1 text-[18px]">
                                        {{ item.short }}
                                    </div>
                                    <!--數量-->
                                    <div
                                        class="col-span-1 h-full flex items-center justify-center relative text-[24px]">
                                        <div :class="(item.count > 0) ? 'text-red-500' : 'text-gray-400'">
                                            {{ item.count }}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <!-- 工具箱 -->
            <div class="max-w-[28rem] mx-auto mt-2 mb-8" v-if="printMode == false">
                <div class="bg-yellow-50 border-4 border-[#bd4747] rounded-lg shadow-2xl flex flex-col gap-2 p-4">
                    <!-- 公告 -->
                    <div
                        class="notice w-full min-h-40 p-2 bg-white text-black font-semibold rounded-lg shadow-inner border border-gray-300 overflow-y-auto whitespace-pre-wrap leading-relaxed text-[18px] divide-y divide-gray-300">

                        <div v-for="(item, index) in msgList" :key="index" @click="copyToClipboard(item, index)"
                            :class="(copiedIndex === index) ? 'border-2 border-red-500 rounded' : ''"
                            class="text-center text-[20px] font-bold cursor-pointer hover:text-blue-500">
                            {{ item }}
                        </div>
                    </div>
                    <!-- 提示訊息 -->
                    <div v-if="copiedMessage" class="mt-2 text-green-600 text-center transition-opacity duration-500">
                        已複製：「{{ copiedMessage }}」
                    </div>

                    <button @click="clear"
                        class="bg-[#aaa] text-white font-bold py-2 px-3 rounded hover:bg-[#999] transition-all duration-150">
                        清空重算
                    </button>
                </div>
            </div>
        </div>

    </div>


</template>

<script setup>
import { ref, reactive, computed } from 'vue'
const categories = reactive([
    {
        categoryName: '串烤1',
        items: [
            { short: '牛', price: 400, count: 0 },
            { short: '雞', price: 400, count: 0 },
            { short: '魚', price: 700, count: 0 },
            { short: '菜', price: 400, count: 0 },
        ],
    },
    {
        categoryName: '串烤2',
        items: [
            { short: '香腸', price: 300, count: 0 },
            { short: '大蒜', price: 300, count: 0 },
            { short: '焗蝦', price: 500, count: 0 },
            { short: '海螺', price: 1000, count: 0 },
        ],
    },
    {
        categoryName: '炸物',
        items: [
            { short: '豆腐', price: 400, count: 0 },
            { short: '泡菜', price: 400, count: 0 },
            { short: '花枝', price: 700, count: 0 },
            { short: '蟹餅', price: 400, count: 0 },
            { short: '炸魚', price: 400, count: 0 },
        ],
    },
    {
        categoryName: '飲料',
        items: [
            { short: '紅茶', price: 300, count: 0 },
            { short: '乃茶', price: 300, count: 0 },
            { short: '豆漿', price: 400, count: 0 },
            { short: '麥仔茶', price: 300, count: 0 },
            { short: '柳丁汁', price: 400, count: 0 },
        ],
    },
    {
        categoryName: '調味料',
        items: [
            { short: '胡椒', price: 0, count: 0 },
            { short: '孜然', price: 0, count: 0 },
            { short: '味噌', price: 0, count: 0 },
            { short: '醤燒', price: 0, count: 0 },
        ],
    },
    {
        categoryName: '調味料',
        items: [
            { short: '番茄醤', price: 0, count: 0 },
            { short: '甜辣醤', price: 0, count: 0 },
            { short: '美乃滋', price: 0, count: 0 },
        ],
    },
    {
        categoryName: '斗內',
        items: [
            { short: '老板很帥', price: 1000, count: 0 },
            { short: '秒變富翁', price: 10000, count: 0 },
        ]
    }
]);

const msgList = computed(() => {
    let msgs = [];
    let sum = getSum.value;

    const hasSausage = categories.some(cate => cate.categoryName === '串烤2' && cate.items.some(item => item.short === '香腸' && item.count > 0));
    if (hasSausage) {
        msgs.push('按巨集：確認訂單-要不要賭香腸？');
    }
    else if (sum > 0) {
        msgs.push('按巨集：確認訂單-沒有香腸');
    }
    const hasGrill = categories.some(cate => cate.categoryName === '串烤1' && cate.items.some(item => item.count > 0));
    if (hasGrill) {
        msgs.push('按巨集：串考要什麼口味？');
    }
    const hasFried = categories.some(cate => cate.categoryName === '炸物' && cate.items.some(item => ['花枝', '蟹餅', '炸魚'].includes(item.short) && item.count > 0));
    if (hasFried) {
        msgs.push('按巨集：炸的要什麼醤？');
    }

    if (sum > 0) {
        msgs.push(`祢的單都好了哦! 一共是${sum}`);
    }
    return msgs;
})
const copiedIndex = ref(null)

function copyToClipboard(text, index) {
    navigator.clipboard.writeText(text).then(() => {
        copiedIndex.value = index
        setTimeout(() => {
            copiedIndex.value = null
        }, 1500)
    })
}

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
    categories[cIndex].items[iIndex].count++;
    //如果增加的品項是香腸，大蒜也要+1
    if (categories[cIndex].items[iIndex].short === '香腸') {
        const garlicIndex = categories[cIndex].items.findIndex(item => item.short === '大蒜');
        if (garlicIndex !== -1) {
            categories[cIndex].items[garlicIndex].count++;
        }
    }
    //如果品項是豆腐，那泡菜也要+1
    if (categories[cIndex].items[iIndex].short === '豆腐') {
        const kimchiIndex = categories[cIndex].items.findIndex(item => item.short === '泡菜');
        if (kimchiIndex !== -1) {
            categories[cIndex].items[kimchiIndex].count++;
        }
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
            .map(item => {
                const unit =
                    (cate.name == '炭燒串烤') ? (
                        (item.short == '香腸') ? '支' :
                            (item.short == '局蝦') ? '分' :
                                (item.short == '海螺') ? '分' : '串') :
                        (cate.name == '飲品') ? '杯' : '分'
                return `${item.count}${unit}${item.short}`
            })
    ).join('、')
    return (result == '') ? "祢還沒點餐，老板感到很切心...T_T" : result
})

const copyOrderText = () => {
    navigator.clipboard.writeText(orderText.value)
}

const clear = () => {
    for (const cate of categories) {
        for (const item of cate.items) {
            item.count = 0
        }
    }
}

</script>

<style>
/* .item {
    border: var(--ink-color) 2px solid;
}
*/


.item:hover {
    border: greenyellow 2px solid;
}

.notice>div>span {
    color: #777;
    font-size: 14px;
    padding-right: 4px;
    display: block;
    margin-bottom: -7px;
}

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
    font-family: '標楷體', 'cwTeXKai', serif;
}

.info {
    font-family: '標楷體', 'cwTeXKai', serif;
}

.price {
    font-family: 'sans-serif';
}

.msg {
    font-size: 13px;
    white-space: nowrap;
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

@font-face {
    font-family: 'cwTeXKai';
    src: url('webfont.eot');
    /* IE9 Compat Modes /
src: url('webfont.eot?#iefix') format('embedded-opentype'), / IE6-IE8 /
url('webfont.woff2') format('woff2'), / Super Modern Browsers /
url('webfont.woff') format('woff'), / Pretty Modern Browsers /
url('webfont.ttf') format('truetype'), / Safari, Android, iOS /
url('webfont.svg#svgFontName') format('svg'); / Legacy iOS */
}

@media (max-width: 640px) {

    /* 640px 以下通常代表手機尺寸 */
    .menu {
        width: 28rem !important;
        max-width: 28rem !important;
        min-width: 28rem !important;
    }
}
</style>
