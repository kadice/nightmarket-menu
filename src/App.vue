<template>
    <div class="scope-root">

        <div class="max-w-[56rem] mx-auto bg-black/10 flex justify-center">


            <!-- MENU -->
            <div
                class="menu w-[32rem] p-6 m-6 border-2 border-gray-400 font-bold bg-[var(--sheet-color)] text-[var(--ink-color)]">

                <!-- 標題區 -->
                <div class="grid gap-y-2 mb-1">
                    <div
                        class="title bg-[var(--ink-color)] text-[var(--sheet-color)] border-2 border-[var(--ink-color)] text-center py-1 text-[32px]">
                        凱　哥　燒　烤</div>
                    <div class="info text-right w-full px-2 pt-4">
                        <span class="relative">
                            <img class="togo-img" src="https://images.plurk.com/1G99s3vdoM6ZC2cyGPdCH9.png">
                            □外帶　□內用　桌號：＿＿　合計：＿＿＿＿＿＿gil
                            <div class="sum flex" v-html="renderSum()"></div>
                        </span>
                    </div>
                </div>

                <!-- 資訊區 -->
                <div class="info -mb-2 px-2">
                    <div>請填妥菜單後交給老闆，現點現做請耐心等候，乾蝦！</div>
                    <div>店址：元素服提風區 伊修加德居住區擴張街10-56號 攤位09</div>
                </div>
            </div>

            <!-- 工具箱 -->
            <div class="p-4">
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



    </div>


</template>

<script setup>
import { ref, reactive, computed } from 'vue'
// const { createApp, ref, reactive, mounted, computed } = Vue;
//import HelloWorld from './components/HelloWorld.vue'
const categories = reactive([
    {
        name: '炭燒串烤 grill',
        items: [
            { short: '牛串', name: '超多汁牛肉烤串', name2: 'beef', price: 1000, msg: '還沒想到', count: 0 },
            { short: 'G串', name: 'DoDo鳥腿肉烤串', name2: 'chicken', price: 10000, msg: '渡渡鳥界Lv100精選腿肉，好吃程度不輸你家陸行鳥', count: 0 },
            { short: '魚串', name: '白肉魚', name2: 'fish', price: 1000, msg: '還沒想到', count: 0 },
            { short: '青菜', name: '烤時蔬', name2: 'vegetable', price: 1000, msg: '還沒想到', count: 0 },
            { short: '烤蝦', name: '焗烤鮮蝦', name2: 'shrimp', price: 1000, msg: '還沒想到', count: 0 },
            { short: '海螺', name: '烤海螺', name2: 'snail', price: 1000, msg: '老闆為這顆螺跑了四個市場，請尊重牠的旅程', count: 0 },
            { short: '香腸', name: '烤香腸(附泡菜)', name2: 'sausage', price: 1000, msg: '泡菜是靈魂，香腸只是載具，不接受單點香腸！', count: 0 },
        ],
    },
    {
        name: '精選炸物 fried',
        items: [
            { short: '豆腐', name: '不是臭豆腐', name2: 'fried tofu', price: 1000, msg: '之前有客人抱怨蟹肉餅變成臭蟹肉餅，只好改賣炸豆腐', count: 0 },
            { short: '花枝', name: '炸一堆花枝圈', name2: 'fried squid', price: 1000, msg: '我賣花枝圈的原則就是幹你娘塞爆！', count: 0 },
            { short: '蟹餅', name: '炸蟹肉餅', name2: 'fried crab cake', price: 1000, msg: '製作過程中沒有真正螃蟹受傷，只有老闆燙傷', count: 0 },
            { short: '炸魚', name: '酥炸魚塊', name2: 'fried fish', price: 1000, msg: '外表金酥脆，內底超Juicy，呼你呷嘎ㄟ彈舌', count: 0 },
        ],
    },
    {
        name: '飲品 drink',
        items: [
            { short: '紅茶', name: '紅茶', name2: 'black tea', price: 1000, msg: '烏爾達哈進口紅茶，解膩好選擇，解完再多吃兩串', count: 0 },
            { short: '奶茶', name: '奶茶', name2: 'milk tea', price: 1000, msg: '早餐店奶茶，沒有賣鮮奶茶，因為老闆喜歡早餐店奶茶', count: 0 },
            { short: '豆漿', name: '豆漿', name2: 'soy milk', price: 1000, msg: '要紅茶豆漿，你就各買一杯自己加', count: 0 },
            { short: '麥仔茶', name: '麥仔茶', name2: 'barley tea', price: 1000, msg: '愛○味麥仔～茶～(老闆沒接業配，但歡迎洽談)', count: 0 },
            { short: '柳丁汁', name: '柳丁汁', name2: 'orange juice', price: 1000, msg: '純手工現榨，柳丁本人也不確定為什麼要這麼累', count: 0 },
        ],
    },
]);

// categories[0].items[0].count = 1
// categories[0].items[1].count = 2
// categories[0].items[2].count = 3
// categories[0].items[3].count = 4
// categories[0].items[4].count = 5

const zhengImages = [
    'https://images.plurk.com/6piBnv0GVycZrRPpXJEEnT.png', // 0
    'https://images.plurk.com/2MX1IwxYs2ZNKa3dw4YjKQ.png', // 1
    'https://images.plurk.com/6QOBpIc414KjkVaLsVpTiE.png', // 2
    'https://images.plurk.com/4gt5jzGtk0j69QflyjFSbl.png', // 3
    'https://images.plurk.com/1gYJcycLn8Oxy2axpfxW2j.png', // 4
    'https://images.plurk.com/6ZXnesX3iptPIpn5t0JL96.png', // 5
];
const renderTally = (count) => {
    if (count < 0 || count > 5) return '';
    return count.toString().split().map(d => `<img src="${zhengImages[+d]}">`).join('');
};

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

const getWidthClass = (width) => {
    switch (width) {
        case '50%': return 'w-1/2';
        case '33%': return 'w-1/3';
        case '100%': return 'w-full';
        default: return 'w-full';
    }
};

const getSum = computed(() => {
    return 11000
    // let sum = 0;
    // for (cate of categories) {
    //     for (item of cate.items) {
    //         sum += item.price * item.count
    //     }
    // }
    // //return 11000
    // return sum
})
const digitImages = [
    'https://images.plurk.com/6aGUwLKqAhPErgz5oiJl6l.png', // 0
    'https://images.plurk.com/6VQMdAdzVG0KDnOTxMu80m.png', // 1
    'https://images.plurk.com/6F1MMyqInOcPsqcJ95omka.png', // 2
    'https://images.plurk.com/1KoDKmQbLIJ5iwtwwER6vi.png', // 3
    'https://images.plurk.com/bYgBnyQV6FFIweWThAHBA.png', // 4
    'https://images.plurk.com/7H4TfQbmhApuqnhWVrOtid.png', // 5
    'https://images.plurk.com/4rROvA7jQt2h4zKTbLifCo.png', // 6
    'https://images.plurk.com/77GHCyFuPMmZnXmfrpVH4t.png', // 7
    'https://images.plurk.com/5cSd0h28p4qNvevnh8Thpp.png', // 8
    'https://images.plurk.com/3lJMFzEhxDaQXm7EXWrPur.png', // 9
];
const renderSum = () => {
    if (getSum.value <= 0) return '';
    return getSum.value.toString().split('').map(d => `<img src="${digitImages[+d]}">`).join('');
};

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
}


.logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
    transition: filter 300ms;
}

.logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
    filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
