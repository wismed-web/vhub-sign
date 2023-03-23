<template>
    <div v-if="display">
        <Captcha class="captcha" ref="refCode" :width="80" :height="22" :bgColor="'rgba(0,0,0,0.1)'" :borderColor="'#5f5f5f'" />
        <input class="answer-box" v-model="answer" ref="answerInput">
    </div>
</template>

<script setup lang="ts">

import Captcha, { CaptchaInstance } from 'vue3-captcha';
import { CaptchaOK } from "@/share/shared";

const props = defineProps({
    belongsTo: String
})

const answer = ref('')
const refCode = ref<CaptchaInstance>(null)

// for style
const dxTop = ref('')

// for UI focus
const answerInput = ref()

const display = ref(true)

onMounted(async () => {
    switch (props.belongsTo) {
        case 'sign-up':
            dxTop.value = '77%'
            break;
        case 'sign-in':
            dxTop.value = '53%'
            break;
    }
})

watchEffect(async () => {
    if (refCode.value?.check(answer.value)) {
        CaptchaOK.value = true
    }else {
        CaptchaOK.value = false
    } 
})

</script>

<style scoped>
.captcha {
    float: left;
    margin-left: 4.5%;
}

.answer-box {
    float: left;
    width: 15%;
    margin-left: 1%;
    text-align: center;
    font-size: medium;
}
</style>