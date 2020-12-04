<template>
    <Page>
        <WebView
            :src="'https://leaflet-api.vercel.app?center=22.34,114.18&zoom=17&marker='+tappedMap+'%7C22.341072,114.179645&sensor='" />
    </Page>
</template>

<script>
    export default {
        props: ["tappedMap"],
        data() {
            return {};
        }
    };
</script>

<style>
</style>