<template>
    <Page>
        <StackLayout>
            <Image :src="tappedProduct.Image" height="300"
                stretch="aspectFill" />
            <ScrollView>
                <StackLayout class="m-10">
                    <Label class="h2" :text="tappedProduct.Restaurant" />
                    <Label class="body" :text="tappedProduct.Detail" />
                    <Label class="body" :text="tappedProduct.Mall" />
                    <Label class="body" :text="'Coin:'+tappedProduct.Coins" />
                    <Label class="body"
                        :text="'Expired Date:'+tappedProduct.Expired_Date" />
                    <StackLayout orientation="horizontal">
                        <Button class="h2 -primary -rounded-lg" text="Redeem"
                            width="40%" @tap="onRedeemTap" />
                        <Button class="h2 -primary -rounded-lg" text="Address"
                            width="40%" @tap="onMapTap" />
                    </StackLayout>
                </StackLayout>
            </ScrollView>
        </StackLayout>
    </Page>
</template>

<script>
    import MapDetail from "./MapDetail";

    export default {
        methods: {
            onRedeemTap: async function() {
                var result = await confirm({
                    title: "Are your sure to redeem Coupons?",
                    okButtonText: "Yes",
                    cancelButtonText: "Cancel"
                });
                if (result) {
                    var response = await fetch(
                        global.baseUrl +
                        "/user/" +
                        this.user.id +
                        "/coupons/add/" +
                        this.tappedProduct.id, {
                            method: "POST"
                        }
                    );
                    if (response.ok) {
                        await alert("Coupon Redeemed.");
                        this.navigateBack();
                    } else if (response.status == 404) {
                        var msg = await response.json();
                        alert(msg);
                    } else {
                        alert(response.status + ": " + response
                            .statusText);
                    }
                } else {
                    alert("cancelled");
                }
            },
            onMapTap: function(args) {
                var Restaurant = "";
                Restaurant = encodeURIComponent(this.tappedProduct
                    .Restaurant);
                console.log(Restaurant);
                this.$navigateTo(MapDetail, {
                    transition: {},
                    props: {
                        tappedMap: Restaurant
                    }
                });
            }
        },
        async mounted() {
            var response = await fetch(global.baseUrl + "/GetUser");
            if (response.ok) {
                this.user = await response.json();
                console.log(JSON.stringify(this.user));
            } else {
                console.log(response.statusText);
            }
        },

        props: ["tappedProduct"],
        data() {
            return {
                user: []
            };
        }
    };
</script>

<style>
</style>