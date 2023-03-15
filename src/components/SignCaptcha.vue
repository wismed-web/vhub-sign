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

// for UI focus
const answerInput = ref()

const visible = ref(true)

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

const handleCheck = () => {

    // console.log(`${value.value}`)

    if (refCode.value?.check(value.value)) {

        visible.value = false // captcha ok, remove it

        switch (props.belongsTo) {
            case 'sign-up':
                DisableSignUp.value = false // captcha ok, allow sign-up
                BtnTip.value = ''
                break;

            case 'sign-in':
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
    float: left;
    margin-left: 4.5%;
}

.answer-box {
    float: left;
    margin-left: 1%;
    text-align: center;
}

.answer-btn {
    float: left;
    margin-left: 1%;
}
</style>