<template>
    <div class="login-page">

        <div v-if="signPage == 'in'">
            <h1>Sign In</h1>
            <input class="textbox" v-model="unameLogin" type="text" placeholder="User Name" autofocus required />
            <input class="textbox" v-model="pwdLogin" type="password" placeholder="Password" required />
            <button class="btn0" @click="doLogin()">Sign In</button>
            <p> Don't have an account?
                <a href="#" @click="signUpPage()">Sign up here</a>
            </p>
        </div>

        <div v-if="signPage == 'up'">
            <h1>Sign Up</h1>
            <input class="textbox" v-model="unameReg" type="text" placeholder="User Name" required />
            <input class="textbox" v-model="emailReg" type="email" placeholder="Email" required />
            <input class="textbox" v-model="pwdReg" type="password" placeholder="Password" required />
            <input class="textbox" v-model="confirmReg" type="password" placeholder="Confirm Password" required />
            <button class="btn0" @click="doRegister()">Sign Up</button>
            <p> Already have an account?
                <a href="#" @click="signInPage()">Sign in here</a>
            </p>
        </div>

        <div v-if="signPage == 'verify'">
            <h1>Email Verification</h1>
            <input class="textbox" v-model="unameReg" required readonly />
            <input class="textbox" v-model="codeReg" type="text" placeholder="Verification Code In Your Email" required />
            <button class="btn0" @click="doEmailVerification()">Verify</button>
            <button class="btn1" @click="doRegister()">Resent</button>
        </div>

    </div>
</template>

<script setup lang="ts">

import { loginToken, postLogin, postSignUp, postEmailVerify, } from "@/share/share";
import { IP_VIEW } from "@/share/ip";

let signPage = ref("in"); // page
let unameLogin = ref("");
let pwdLogin = ref("");
let unameReg = ref("");
let emailReg = ref("");
let pwdReg = ref("");
let confirmReg = ref("");
let codeReg = ref("");

onMounted(async () => {

})

const viewSite = async () => {
    location.replace(`${IP_VIEW}?auth=${loginToken.value}`)
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
        emailVerifyPage();
    }
};

const doEmailVerification = async () => {
    const ok = await postEmailVerify(unameReg.value, codeReg.value);
    if (ok) {
        alert("email verified, please login");
        signInPage();
    }
};

const signUpPage = () => { signPage.value = "up"; };
const signInPage = () => { signPage.value = "in"; };
const emailVerifyPage = () => { signPage.value = "verify"; };

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
    margin-bottom: 3%;
}

.login-page {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
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
    margin-right: 4%;
    margin-bottom: 2%;
}

.btn1 {
    float: right;
    margin-right: 2%;
    margin-bottom: 2%;
}
</style>
