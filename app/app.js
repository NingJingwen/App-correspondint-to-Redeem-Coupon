import Vue from 'nativescript-vue';

import HelloWorld from './components/HelloWorld';

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = true;

global.baseUrl = "https://06ecbe5c560a.ngrok.io";
global.user = {
    "username": "",
};

new Vue({

    template: `
        <Frame>
            <HelloWorld />
        </Frame>`,

    components: {
        HelloWorld
    }
}).$start();