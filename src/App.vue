<template>
    <SignPage v-if="disp" />
</template>

<script setup lang="ts">

import SignPage from "@/components/SignPage.vue";
import { ping } from "@/share/ping";

let Width = window.innerWidth + "px";
let Height = window.innerHeight + "px";

const onResize = () => {
    Width = window.innerWidth + "px";
    Height = window.innerHeight + "px";
    console.log("Width:", Width);
    console.log("Height:", Height);
};

let disp = ref(false);

onMounted(async () => {
    // test backend api available
    disp.value = await ping();
    if (!disp.value) {
        alert("backend api service is not available");
    }

    // listen browser size change
    window.addEventListener("resize", onResize);
});

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
    background-image: url('assets/bg.jpg');
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-size: cover;
}
</style>
