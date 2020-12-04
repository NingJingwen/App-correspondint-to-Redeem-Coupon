<template>
  <Page>
    <ListView for="restaurant in coupons" @itemTap="onItemTap">
      <v-template>
        <StackLayout orientation="vertical">
          <Label :text="restaurant.Restaurant" class="h2" />
        </StackLayout>
      </v-template>
    </ListView>
  </Page>
</template>

<script>
import CouponsDetail from "./CouponsDetail";
export default {
  methods: {
    onItemTap: function (args) {
      console.log("Item with index: " + args.index + " tapped");
      console.log("Restaurant tapped: " + args.item.Restaurant);
      this.$navigateTo(CouponsDetail, {
        transition: {},
        props: {
          tappedProduct: args.item,
        },
      });
    },
  },
  async mounted() {
    var response = await fetch(global.baseUrl + "/person/MyRedeemedCoupons");
    if (response.ok) {
      var temp = await response.json();
      this.coupons = temp.coupons;
      console.log(JSON.stringify(this.coupons));
    } else {
      console.log(response.statusText);
    }
  },
  data() {
    return {
      coupons: [],
    };
  },
};
</script>

<style>
</style>