<template>
    <Page>
        <ActionBar title="Home" />
        <StackLayout>
            <BottomNavigation height="400px">
                <TabStrip>
                    <TabStripItem>
                        <Label text="Home"></Label>
                        <Image src="res://home"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Malls"></Label>
                        <Image src="res://settings"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Coins"></Label>
                        <Image src="res://search"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="User"></Label>
                        <Image src="res://search"></Image>
                    </TabStripItem>
                </TabStrip>
                <TabContentItem>
                    <ListView for="coupon in coupons" @itemTap="onItemTap">
                        <v-template>
                            <StackLayout orientation="vertical">
                                <Image :src="coupon.Image" height="300"
                                    stretch="aspectFill" />
                                <Label :text="coupon.Restaurant" class="h2" />
                                <Label :text="coupon.Detail" class="h2" />
                                <Label :text="coupon.Coins" class="h2" />
                            </StackLayout>
                        </v-template>
                    </ListView>
                </TabContentItem>
                <TabContentItem>
                    <ListView for="mall in malls" @itemTap="onMallTap">
                        <v-template>
                            <StackLayout orientation="vertical">
                                <Label :text="mall.name" class="h2" />
                            </StackLayout>
                        </v-template>
                    </ListView>
                </TabContentItem>
                <TabContentItem>
                    <ListView for="coin in coins" @itemTap="onCoinTap">
                        <v-template>
                            <StackLayout orientation="vertical">
                                <Label :text="coin.name" class="h2" />
                            </StackLayout>
                        </v-template>
                    </ListView>
                </TabContentItem>
                <TabContentItem>
                    <StackLayout orientation="vertical">
                        <StackLayout orientation="horizontal">
                            <Image
                                src="data:image/jpeg;base64,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"
                                height="100" width="33%"
                                horizontalAlignment="left" />
                            <Label :text="this.user.username" class=" h2"
                                width="33%" textAlignment="center"
                                horizontalAlignment="center" />
                        </StackLayout>
                        <ListView for="option in options"
                            @itemTap="onLoginTap" height="150">
                            <v-template>
                                <StackLayout orientation="vertical"
                                    class="nt-form">
                                    <Label :text="option.name" class="h2" />
                                </StackLayout>
                            </v-template>
                        </ListView>
                    </StackLayout>
                </TabContentItem>
            </BottomNavigation>
        </StackLayout>
    </Page>
</template>

<script>
    import CouponsDetail from "./CouponsDetail";
    import Mall from "./Mall";
    import Coin from "./Coin";
    import Login from "./Login";

    export default {
        methods: {
            onLoginTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
                console.log("Product tapped: " + args.item);
                this.$navigateTo(Login);
            },
            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
                console.log("Product tapped: " + args.item.Restaurant);
                console.log(global.user.username)
                console.log(this.user[0].username)
                this.$navigateTo(CouponsDetail, {
                    transition: {},
                    props: {
                        tappedProduct: args.item
                    }
                });
            },
            onMallTap: function(arg) {
                console.log("Item with index: " + arg.index + " tapped");
                console.log("Mall tapped: " + arg.item.name);
                var inmalls = [];
                this.coupons.forEach(function(ele) {
                    if (ele.Mall == arg.item.name) {
                        inmalls.push(ele);
                    }
                });
                this.$navigateTo(Mall, {
                    transition: {},
                    props: {
                        tappedMall: inmalls
                    }
                });
            },
            onCoinTap: function(arg) {
                console.log("Item with index: " + arg.index + " tapped");
                console.log("Mall tapped: " + arg.item.name);
                var incoins = [];
                this.coupons.forEach(function(ele) {
                    if (
                        arg.item.thresholdL < ele.Coins &&
                        ele.Coins <= arg.item.thresholdR
                    ) {
                        incoins.push(ele);
                    }
                });
                this.$navigateTo(Coin, {
                    transition: {},
                    props: {
                        tappedCoin: incoins
                    }
                });
            }
        },
        async mounted() {
            var response = await fetch(global.baseUrl + "/AllCoupons", {
                method: "GET"
            });
            if (response.ok) {
                this.coupons = await response.json();
                console.log(JSON.stringify(this.coupons));
            } else {
                console.log(response.statusText);
            }
        },
        data() {
            return {
                user: [{
                    username: global.user.username
                }],
                coupons: [],
                malls: [{
                        name: "IFC MaLL"
                    },
                    {
                        name: "Pacific Place"
                    },
                    {
                        name: "APM"
                    }
                ],
                options: [{
                        name: "Login"
                    },
                    {
                        name: "My Redeemed Coupons"
                    }
                ],
                afters: [{
                    name: "Logff"
                }, {
                    name: "My Redeemed Coupons"
                }],
                coins: [{
                        name: "Coins<=20",
                        thresholdL: 0,
                        thresholdR: 20
                    },
                    {
                        name: "20<Coins<=40",
                        thresholdL: 20,
                        thresholdR: 40
                    },
                    {
                        name: "Coins>40",
                        thresholdL: 40,
                        thresholdR: 8888888888
                    }
                ]
            };
        }
    };
</script>

<style scoped>
    .home-panel {
        vertical-align: center;
        font-size: 20;
        margin: 15;
    }

    .description-label {
        margin-bottom: 15;
    }
</style>