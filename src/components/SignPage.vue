<template>
    <div id="login-page">
        <div v-if="signPage == 'in'">
            <h1>Sign In</h1>
            <input class="textbox" v-model="unameLogin" type="text" placeholder="User Name" ref="unameInputSI" autofocus required />
            <input class="textbox" v-model="pwdLogin" type="password" placeholder="Password" required />
            <SignCaptcha :belongsTo="'sign-in'"></SignCaptcha>
            <button class="btn0" :disabled="DisableSignIn" @click="Login()" :title="BtnTip">Sign In</button>
            <p id="to-sign-up"> Don't have an account?
                <a href="#" @click="ToSignUpPage()">Sign up here</a>
            </p>
        </div>
        <div v-if="signPage == 'up'">
            <h1>Sign Up</h1>
            <input class="textbox" v-model="unameReg" type="text" placeholder="User Name" ref="unameInputSU" required />
            <input class="textbox" v-model="emailReg" type="email" placeholder="Email" required />
            <input class="textbox" v-model="pwdReg" type="password" :placeholder="`Password: (${pwdRule})`" required />
            <input class="textbox" v-model="confirmReg" type="password" placeholder="Confirm Password" required />
            <SignCaptcha :belongsTo="'sign-up'"></SignCaptcha>
            <span id="agreement">
                <input type="checkbox" v-model="agrmtSta" />
                <a href="#" @click="ToAgreementPage()">agreement</a>
            </span>
            <button class="btn0" :disabled="DisableSignUp || !agrmtSta" @click="Register()" :title="BtnTip">Sign Up</button>
            <p id="to-sign-in"> Already have an account?
                <a href="#" @click="ToSignInPage()">Sign in here</a>
            </p>
        </div>
        <div v-if="signPage == 'verify'">
            <h1>Email Verification</h1>
            <input class="textbox" v-model="unameReg" required readonly />
            <input class="textbox" v-model="codeReg" type="text" placeholder="Verification Code In Your Email" ref="codeInput" required />
            <button class="btn0" @click="EmailVerification()">Verify</button>
            <button class="btn1" @click="Register()">Resent</button>
        </div>
    </div>
    <div id="page-loader" v-if="showLoader">
        <Loader />
    </div>
</template>

<script setup lang="ts">

import { useCookies } from "vue3-cookies";
import SignCaptcha from "./SignCaptcha.vue";
import Loader from "./Loader.vue";
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
const agrmtSta = ref(false);
const showLoader = ref(false);

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

const mainSite = async () => {

    // *** no longer use 'URL with auth' ***
    // location.replace(`${URL_MAIN}?auth=${loginToken.value}`)

    // *** auth now with cookie ***
    cookies.set("auth", `${loginToken.value}`, "1d", "/", "." + Domain, false, "Lax"); // cookies.set("myCookie", "John Doe", "1d", "/", "", false, "Lax"); document.cookie = "myCookie=John Doe;SameSite=None;secure=false"
    location.replace(`${URL_MAIN}`)
}

const Login = async () => {
    showLoader.value = true;
    if (await postLogin(unameLogin.value, pwdLogin.value)) {
        // alert('login successfully')
        mainSite()
    }
    showLoader.value = false;
};

const Register = async () => {
    if (pwdReg.value != confirmReg.value) {
        alert("password confirmation error");
        confirmReg.value = "";
        showLoader.value = false;
        return;
    }
    showLoader.value = true;
    if (await postSignUp(unameReg.value, emailReg.value, pwdReg.value)) {
        alert(`verification code sent to your email ${emailReg.value}`);
        ToEmailVerifyPage();
    }
    showLoader.value = false;
};

const EmailVerification = async () => {
    showLoader.value = true;
    if (await postEmailVerify(unameReg.value, codeReg.value)) {
        alert("email verified, please login");
        ToSignInPage();
    }
    showLoader.value = false;
};

const ToSignUpPage = () => { signPage.value = "up"; };
const ToSignInPage = () => { signPage.value = "in"; };
const ToEmailVerifyPage = () => { signPage.value = "verify"; };
const ToAgreementPage = () => {
    window.open(`${URL_API}/agreement`)
}

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
    width: 45%;
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
    bottom: -3%;
}

#to-sign-in {
    position: absolute;
    right: 5%;
    bottom: -3%;
}

#agreement {
    position: absolute;
    right: 13%;
    bottom: 16%;
    font-size: small;
}
</style>
