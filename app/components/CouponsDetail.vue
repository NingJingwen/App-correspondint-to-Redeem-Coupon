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
                    <Label class="body" :text="tappedProduct.Coins" />
                    <Label class="body" :text="tappedProduct.Expired_Data" />
                    <Button class="h2 -primary -rounded-lg" text="Redeem"
                        @tap="onRedeemTap" />
                    <Button class="h2 -primary -rounded-lg" text="Address"
                        @tap="onMapTap" />
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
                    title: "Confirm to place order?",
                    message: "Sending to httpbin.org",
                    okButtonText: "Yes",
                    cancelButtonText: "Cancel"
                });
                if (result) {
                    var response = await fetch(
                    "https://httpbin.org/post", {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify(this.inCart)
                    });
                    if (response.ok) {
                        var data = await response.json();
                        this.figures = data.json;
                    } else {
                        console.log(response.status);
                    }
                }
            },
            
            onMapTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
                console.log("Map tapped: " + args.item);
                this.$navigateTo(MapDetail, {
                    transition: {},
                    props: {}
                });
            }
        },

        props: ["tappedProduct"],
        data() {
            return {};
        }
    };
</script>

<style>
</style>