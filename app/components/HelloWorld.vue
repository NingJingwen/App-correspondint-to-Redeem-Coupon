<template>
    <Page @navigatedTo="update" @loaded="update">
        <ActionBar title="Redeem App" />
        <StackLayout>
            <BottomNavigation height="400px">
                <TabStrip>
                    <TabStripItem>
                        <Label text="Home"></Label>
                        <Image src="res://home"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Malls"></Label>
                        <Image src="res://search"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="Coins"></Label>
                        <Image src="res://search"></Image>
                    </TabStripItem>
                    <TabStripItem>
                        <Label text="User"></Label>
                        <Image src="res://settings"></Image>
                    </TabStripItem>
                </TabStrip>
                <TabContentItem>
                    <ListView for="coupon in coupons" @itemTap="onItemTap">
                        <v-template>
                            <StackLayout orientation="vertical">
                                <Image :src="coupon.Image" height="300"
                                    stretch="aspectFill" />
                                <Label :text="coupon.Restaurant" class="h2" />
                                <Label :text="coupon.Detail" class="h3" />
                                <Label :text="'Coin:'+coupon.Coins"
                                    class="h3" />
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
                                src="https://lh3.googleusercontent.com/c3A2DmEfRLXjDxHU3z65z5eg3onFwni74_GqEx3ATbUxVHHmA9CtuAyEcvfQMcZJ4CAe=s85"
                                height="100" width="33%"
                                horizontalAlignment="left" />
                            <Label :text="this.user[0].username" class=" h2"
                                width="33%" textAlignment="center"
                                horizontalAlignment="center" />
                        </StackLayout>
                        <ListView for="option in options"
                            @itemTap="onFlexTap" height="150">
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
    import MyRedeemedCoupons from "./MyRedeemedCoupons";

    export default {
        methods: {
            update: function() {
                if (global.user.username) {
                    this.user[0].username = global.user.username;
                    this.options = [{
                            name: "Logoff"
                        },
                        {
                            name: "My Redeemed Coupons"
                        }
                    ];
                } else {
                    this.user.username = "";
                    this.options = [{
                            name: "Login"
                        },
                        {
                            name: "My Redeemed Coupons"
                        }
                    ];
                }
            },
            onFlexTap: async function(args) {
                if (args.index == 0) {
                    if (this.options[0].name == "Login") {
                        this.$navigateTo(Login);
                    } else if (this.options[0].name == "Logoff") {
                        var r = await confirm({
                            title: "Confirm Logout ?",
                            okButtonText: "Yes",
                            cancelButtonText: "Cancel"
                        });
                        if (r) {
                            var response = await fetch(
                                global.baseUrl + "/user/logout", {
                                    method: "POST"
                                }
                            );
                            if (response.ok) {
                                alert("User Logout.");
                                this.options = [{
                                        name: "Login"
                                    },
                                    {
                                        name: "My Redeemed Coupons"
                                    }
                                ];
                                this.user[0].username="";
								global.user.username="";
                            } else {
                                alert(response.status + ": " + response
                                    .statusText);
                            }
                        } else {
                            alert("cancelled");
                        }
                    }
                } else if (args.index == 1) {
                    if (!global.user.username) {
                        alert("please login first!");
                    } else {
                        this.$navigateTo(MyRedeemedCoupons);
                    }
                }
            },
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
                console.log(global.user.username);
                console.log(this.user[0].username);
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
                    username: ""
                }],
                coupons: [],
                malls: [{
                        name: "IFC MaLL"
                    },
                    {
                        name: "Pacific Place"
                    },
                    {
                        name: "New Town Plaza"
                    },
                    {
                        name: "Tsuen Wan Plaza"
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
                coins: [{
                        name: "Coins<=300",
                        thresholdL: 0,
                        thresholdR: 300
                    },
                    {
                        name: "300<Coins<600",
                        thresholdL: 300,
                        thresholdR: 599
                    },
                    {
                        name: "Coins>=600",
                        thresholdL: 599,
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