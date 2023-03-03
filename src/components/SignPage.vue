<template>
    <div id="login-page">
        <div v-if="signPage == 'in'">
            <h1>Sign In</h1>
            <input class="textbox" v-model="unameLogin" type="text" placeholder="User Name" ref="unameInputSI" autofocus required />
            <input class="textbox" v-model="pwdLogin" type="password" placeholder="Password" required />
            <SignCaptcha :belongsTo="'signin'"></SignCaptcha>
            <button class="btn0" :disabled="DisableSignIn" @click="doLogin()" :title="BtnTip">Sign In</button>
            <p id="to-signup"> Don't have an account?
                <a href="#" @click="toSignUpPage()">Sign up here</a>
            </p>
        </div>
        <div v-if="signPage == 'up'">
            <h1>Sign Up</h1>
            <input class="textbox" v-model="unameReg" type="text" placeholder="User Name" ref="unameInputSU" required />
            <input class="textbox" v-model="emailReg" type="email" placeholder="Email" required />
            <input class="textbox" v-model="pwdReg" type="password" :placeholder="`Password: (${pwdRule})`" required />
            <input class="textbox" v-model="confirmReg" type="password" placeholder="Confirm Password" required />
            <SignCaptcha :belongsTo="'signup'"></SignCaptcha>
            <span id="agreement"> agreement?
                <a href="#" @click="toAgreementPage()">agreement</a>
            </span>
            <button class="btn0" :disabled="DisableSignUp" @click="doRegister()" :title="BtnTip">Sign Up</button>
            <p id="to-signin"> Already have an account?
                <a href="#" @click="toSignInPage()">Sign in here</a>
            </p>
        </div>
        <div v-if="signPage == 'verify'">
            <h1>Email Verification</h1>
            <input class="textbox" v-model="unameReg" required readonly />
            <input class="textbox" v-model="codeReg" type="text" placeholder="Verification Code In Your Email" ref="codeInput" required />
            <button class="btn0" @click="doEmailVerification()">Verify</button>
            <button class="btn1" @click="doRegister()">Resent</button>
        </div>
    </div>
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import SignCaptcha from "./SignCaptcha.vue";
import { loginToken, postLogin, postSignUp, postEmailVerify, getPwdRule, pwdRule } from "@/share/share";
import { Domain, URL_API, URL_MAIN } from "@/share/ip";
import { DisableSignIn, DisableSignUp, BtnTip } from "@/share/shared";

const { cookies } = useCookies();

const signPage = ref("in"); // page
const unameLogin = ref("");
const pwdLogin = ref("");
const unameReg = ref("");
const emailReg = ref("");
const pwdReg = ref("");
const confirmReg = ref("");
const codeReg = ref("");

// for UI focus
const unameInputSI = ref();
const unameInputSU = ref();
const codeInput = ref();

onMounted(async () => {
    getPwdRule();
})

watchEffect(async () => {
    switch (signPage.value) {
        case "in":
            unameInputSI?.value?.focus();
            DisableSignIn.value = true;
            BtnTip.value = 'answer question to unlock it';
            break;

        case "up":
            unameInputSU?.value?.focus();
            DisableSignUp.value = true;
            BtnTip.value = 'answer question to unlock it';
            break;

        case "verify":
            codeInput?.value?.focus();
            break
    }
})

const viewSite = async () => {

    // *** no longer use 'URL with auth' ***
    // location.replace(`${URL_MAIN}?auth=${loginToken.value}`)

    // *** auth now with cookie ***
    cookies.set("auth", `${loginToken.value}`, "1d", "/", "." + Domain, false, "Lax"); // cookies.set("myCookie", "John Doe", "1d", "/", "", false, "Lax"); document.cookie = "myCookie=John Doe;SameSite=None;secure=false"
    location.replace(`${URL_MAIN}`)
}

const doLogin = async () => {
    const ok = await postLogin(unameLogin.value, pwdLogin.value);
    if (ok) {
        // alert('login successfully')
        viewSite()
    }
};

const doRegister = async () => {
    if (pwdReg.value != confirmReg.value) {
        alert("password confirmation error");
        confirmReg.value = "";
        return;
    }
    const ok = await postSignUp(unameReg.value, emailReg.value, pwdReg.value);
    if (ok) {
        alert(`verification code sent to your email ${emailReg.value}`);
        toEmailVerifyPage();
    }
};

const doEmailVerification = async () => {
    const ok = await postEmailVerify(unameReg.value, codeReg.value);
    if (ok) {
        alert("email verified, please login");
        toSignInPage();
    }
};

const toSignUpPage = () => { signPage.value = "up"; };
const toSignInPage = () => { signPage.value = "in"; };
const toEmailVerifyPage = () => { signPage.value = "verify"; };
const toAgreementPage = () => {
    window.open(`${URL_API}/agreement`)
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-bottom: 3%;
}

#login-page {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 45%;
    height: 32%;
    background-color: white;
    opacity: 0.95;
    border-radius: 25px;
}

.textbox {
    margin-bottom: 2%;
    width: 90%;
}

.btn0 {
    float: right;
    margin-right: 4.5%;
    margin-bottom: 5%;
}

.btn1 {
    float: right;
    margin-right: 2%;
    margin-bottom: 5%;
}

#to-signup {
    position: absolute;
    right: 5%;
    bottom: -2%;
}

#to-signin {
    position: absolute;
    right: 5%;
    bottom: -2%;
}

#agreement {
    position: absolute;
    right: 13%;
    bottom: 15%;
    font-size: small;
}
</style>
