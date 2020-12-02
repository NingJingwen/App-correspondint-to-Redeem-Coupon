<template>
    <Page>
        <StackLayout orientation="vertical" width="210" height="210">
            <TextField v-model="usernameValue" hint=" username " />
            <TextField keyboardType="number" v-model="passwordValue"
                hint=" password " />
            <Button class=" h2 -primary -rounded-lg " text=" Login "
                @tap=" onLoginTap " />
        </StackLayout>
    </Page>
</template>

<script>
    export default {
        methods: {
            onLoginTap: async function() {
                console.log("Button was pressed");
                console.log(this.usernameValue);
                var reqBody = {
                    password: this.passwordValue,
                    username: this.usernameValue
                };
                var response = await fetch(
                        global.baseUrl+"/user/login",
                    {
                        method: " POST ",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(reqBody)
                    }
            );
            if (response.ok) {
                var user = await response.json();
                alert(" Welcome back, " + user.username);
                this.$navigateBack();
            } else if (response.status == 401) {
                var msg = await response.json();
                alert(msg);
            } else {
                alert(response.statusText);
            }
        }
    },
    data() {
        return {
            usernameValue: "",
            passwordValue: ""
        };
    }
    };
</script>

<style>
</style>