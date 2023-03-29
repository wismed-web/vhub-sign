<template>
    <div id="login-page">
        <div v-if="signPage == 'in'">
            <h1>Sign In</h1>
            <input class="textbox" v-model="unameLogin" type="text" placeholder="User Name" ref="unameInputSI" autofocus required />
            <input class="textbox" v-model="pwdLogin" type="password" placeholder="Password" required />
            <SignCaptcha :belongsTo="'sign-in'"></SignCaptcha>
            <button class="btn0" :disabled="!enableSignIn" @click="Login()">Sign In</button>
            <p id="to-sign-up"> Don't have an account? <a href="#" @click="ToSignUpPage()">Sign up here</a> </p>
        </div>
        <div v-if="signPage == 'up'">
            <h1>Sign Up</h1>
            <input class="textbox" v-model="unameReg" type="text" placeholder="User Name" ref="unameInputSU" required />
            <input class="textbox" v-model="emailReg" type="email" placeholder="Email" required />
            <input class="textbox" v-model="pwdReg" type="password" :placeholder="`Password: (${pwdRule})`" required />
            <input class="textbox" v-model="confirmReg" type="password" placeholder="Confirm Password" required />
            <SignCaptcha :belongsTo="'sign-up'"></SignCaptcha>
            <button class="btn0" :disabled="!enableSignUp" @click="Register()">Sign Up</button>
            <span id="agreement"> <input type="checkbox" v-model="agreement" /> accept <a href="#" @click="ToAgreementPage()">agreement</a> </span>
            <p id="to-sign-in"> Already have an account? <a href="#" @click="ToSignInPage()">Sign in here</a> </p>
        </div>
        <div v-if="signPage == 'verify'">
            <h1>Email Verification</h1>
            <input class="textbox" v-model="unameReg" required readonly />
            <input class="textbox" v-model="codeReg" type="text" placeholder="Verification Code In Your Email" ref="codeInput" required />
            <button class="btn0" @click="EmailVerification()">Verify</button>
            <button class="btn1" @click="Register()">Resent</button>
        </div>
    </div>
    <Loader id="page-loader" v-if="loading" />
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import SignCaptcha from "./SignCaptcha.vue";
import Loader from "./Loader.vue";
import { loginToken, postLogin, postSignUp, postEmailVerify, getPwdRule, pwdRule } from "@/share/share";
import { Domain, URL_API, URL_MAIN } from "@/share/ip";
import { CaptchaOK } from "@/share/shared";

const { cookies } = useCookies();
const loading = ref(false);
const signPage = ref("in"); // page
const unameLogin = ref("");
const pwdLogin = ref("");
const unameReg = ref("");
const emailReg = ref("");
const pwdReg = ref("");
const confirmReg = ref("");
const codeReg = ref("");
const agreement = ref(false);

const enableSignIn = computed(() => { return unameLogin.value.length > 0 && pwdLogin.value.length > 0 && CaptchaOK.value })
const enableSignUp = computed(() => { return unameReg.value.length > 0 && emailReg.value.length > 0 && pwdReg.value.length > 0 && confirmReg.value.length > 0 && agreement.value && CaptchaOK.value })

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
            CaptchaOK.value = false;
            break;

        case "up":
            unameInputSU?.value?.focus();
            CaptchaOK.value = false;
            break;

        case "verify":
            codeInput?.value?.focus();
            break
    }
})

const ToMainSite = async () => {

    // *** auth now with cookie ***
    cookies.set("token", `${loginToken.value}`, "1d", "/", "." + Domain, false, "Lax"); // cookies.set("myCookie", "John Doe", "1d", "/", "", false, "Lax"); document.cookie = "myCookie=John Doe;SameSite=None;secure=false"
    // await new Promise((f) => setTimeout(f, 5000));
    location.replace(`${URL_MAIN}`)
}

const Login = async () => {
    loading.value = true;
    if (await postLogin(unameLogin.value, pwdLogin.value)) {
        // alert('login successfully')
        ToMainSite()
    }
    loading.value = false;
};

const Register = async () => {
    if (pwdReg.value != confirmReg.value) {
        alert("password confirmation error");
        confirmReg.value = "";
        return;
    }
    loading.value = true;
    if (await postSignUp(unameReg.value, emailReg.value, pwdReg.value)) {
        alert(`verification code sent to your email ${emailReg.value}`);
        ToEmailVerifyPage();
    }
    loading.value = false;
};

const EmailVerification = async () => {
    loading.value = true;
    if (await postEmailVerify(unameReg.value, codeReg.value)) {
        alert("email verified, please login");
        ToSignInPage();
    }
    loading.value = false;
};

const ToSignUpPage = () => { signPage.value = "up"; };
const ToSignInPage = () => { signPage.value = "in"; };
const ToEmailVerifyPage = () => { signPage.value = "verify"; };
const ToAgreementPage = () => { window.open(`${URL_API}/agreement`) }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-bottom: 3%;
}

#page-loader {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
}

#login-page {
    position: absolute;
    top: 40%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 36%;
    height: 32%;
    background-color: white;
    opacity: 0.95;
    border-radius: 25px;
}

.textbox {
    margin-bottom: 1.5%;
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

#to-sign-up {
    position: absolute;
    right: 5%;
    bottom: 0%;
    font-size: small;
}

#to-sign-in {
    position: absolute;
    right: 5%;
    bottom: 0%;
    font-size: small;
}

#agreement {
    float: right;
    margin-right: 1%;
    margin-top: 0.5%;
    font-size: small;
}
</style>
