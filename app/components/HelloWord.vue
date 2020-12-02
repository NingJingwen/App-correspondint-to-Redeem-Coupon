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
                    <StackLayout class="nt-form">
                        <Image
                            src="https://www.google.com/imgres?imgurl=https%3A%2F%2Fimg.jk51.com%2Fimg_jk51%2F486664192.jpeg&imgrefurl=https%3A%2F%2Fmts.jk51.com%2Ftushuo%2F10756251.html&tbnid=sLgy2H9oB2_7ZM&vet=12ahUKEwj68rWKsKztAhVXAaYKHWROA3wQMygIegUIARCiAQ..i&docid=2Ni64c6v50RK0M&w=500&h=500&q=%E6%9C%AA%E7%99%BB%E5%BD%95%E7%9A%84%E5%A4%B4%E5%83%8F&ved=2ahUKEwj68rWKsKztAhVXAaYKHWROA3wQMygIegUIARCiAQ" />
                        <Label text="Name" class="h2" />
                        <Label text="Login/Logoff" class="h2" @tap="onLoginTap"/>
                        <Label text=" My Redeemed Coupons" class="h2" />
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

    export default {
        methods: {
            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
                console.log("Product tapped: " + args.item.Restaurant);
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
                    if ((arg.item.thresholdL < ele.Coins)&&(ele.Coins<= arg.item
                        .thresholdR)) {
                        incoins.push(ele);
                        console.log(arg.item.thresholdR);
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
                coins: [{
                        name: "Coins<=20",
                        thresholdL: 0,
                        thresholdR: 20,
                    },
                    {
                        name: "20<Coins<=40",
                        thresholdL: 20,
                        thresholdR: 40,
                    },
                    {
                        name: "Coins>40",
                        thresholdL: 40,
                        thresholdR: 88888888,
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