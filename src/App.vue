<template>
    <div v-if="showPage">
        <SignPage />
        <div id="copyright">
            Copyright@2023 TBD | <a href="#" @click="ToPolicyPage()">Privacy Policy</a>
        </div>
    </div>
    <notifications position="top center" :speed="2000" :duration="4000" :closeOnClick="false" />
</template>

<script setup lang="ts">

import { useNotification } from "@kyvg/vue3-notification";
import SignPage from "@/components/SignPage.vue";
import { getPing } from "@/share/share";
import { URL_API } from "@/share/ip";

const notification = useNotification()

let Width = window.innerWidth + "px";
let Height = window.innerHeight + "px";

const onResize = () => {
    Width = window.innerWidth + "px";
    Height = window.innerHeight + "px";
    console.log("Width:", Width);
    console.log("Height:", Height);
};

const showPage = ref(false);

onMounted(async () => {
    // test backend api available
    const de = await getPing();
    if (de.error != null) {
        notification.notify({
            title: "Backend API Service is NOT Available",
            text: de.error,
            type: "error"
        })
        return
    }
    showPage.value = true

    // listen browser size change
    window.addEventListener("resize", onResize);
});

const ToPolicyPage = () => { window.open(`${URL_API}/policy`) }

</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 10px;
}

body {
    background-image: url('assets/bg.png');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}

#copyright {
    position: fixed;
    bottom: 0;
    width: 100%;
    margin-bottom: 10px;
}
</style>
