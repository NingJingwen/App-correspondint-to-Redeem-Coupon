<template>
    <Page>
        <StackLayout>
            <ListView for="restaurant in tappedCoin" @itemTap="onItemTap">
                <v-template>
                    <StackLayout orientation="vertical">
                        <Label :text="restaurant.Restaurant" class="h2" />
                    </StackLayout>
                </v-template>
            </ListView>
        </StackLayout>
    </Page>
</template>

<script>
    import CouponsDetail from "./CouponsDetail";
    export default {
        methods: {
            onItemTap: function(args) {
                console.log("Item with index: " + args.index + " tapped");
                console.log("Restaurant tapped: " + args.item.Restaurant);
                this.$navigateTo(CouponsDetail, {
                    transition: {},
                    props: {
                        tappedProduct: args.item
                    }
                });
            }
        },
        props: ["tappedCoin"],
        data() {
            return {};
        }
    };
</script>

<style>
</style>