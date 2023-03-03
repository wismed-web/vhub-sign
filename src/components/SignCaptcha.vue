<template>
    <div v-if="visible">
        <Captcha class="captcha" ref="refCode" :width="80" :height="22" :bgColor="'rgba(0,0,0,0.1)'" :borderColor="'#5f5f5f'" />
        <input class="answer-box" v-model="value" ref="answerInput">
        <button class="answer-btn" @click="handleCheck()">Check</button>
    </div>
</template>

<script setup lang="ts">

import Captcha, { CaptchaInstance } from 'vue3-captcha';
import { DisableSignIn, DisableSignUp, BtnTip } from "@/share/shared";

const props = defineProps({
    belongsTo: String
})

const value = ref('')
const refCode = ref<CaptchaInstance>(null)

// for style
const dxTop = ref('')
const dxLeft = 4.5
const dxLeftCaptcha = ref(`${dxLeft}%`)
const dxLeftInput = ref(`${dxLeft + 10}%`)
const dxLeftBtn = ref(`${dxLeft + 18.5}%`)

// for UI focus
const answerInput = ref()

const visible = ref(true)

onMounted(async () => {
    switch (props.belongsTo) {
        case 'signup':
            dxTop.value = '80%'
            break;
        case 'signin':
            dxTop.value = '53%'
            break;
    }
})

const handleCheck = () => {

    // console.log(`${value.value}`)

    if (refCode.value?.check(value.value)) {

        visible.value = false // captcha ok, remove it

        switch (props.belongsTo) {
            case 'signup':
                DisableSignUp.value = false // captcha ok, allow sign-up
                BtnTip.value = ''
                break;

            case 'signin':
                DisableSignIn.value = false // captcha ok, allow sign-in
                BtnTip.value = ''
                break;
        }

    } else {

        alert('Answer is incorrect.\r\nTry again or Click question to refresh for a new one.')
        value.value = ''
        answerInput.value.focus()
    }
}

</script>

<style scoped>
.captcha {
    position: absolute;
    left: v-bind(dxLeftCaptcha);
    top: v-bind(dxTop);
}

.answer-box {
    position: absolute;
    left: v-bind(dxLeftInput);
    top: v-bind(dxTop);
    width: 7%;
    height: 5.8%;
    text-align: center;
}

.answer-btn {
    position: absolute;
    left: v-bind(dxLeftBtn);
    top: v-bind(dxTop);
    width: 8%;
    height: 7.8%;
}
</style>