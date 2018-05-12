<template lang="html">

  <section class="portfolio">
    <h2>Portfolio</h2>
    <h4>Current Holdings</h4>
    <div class="columns medium-3" v-for="holding in currentHoldings">
      <div class="card">
        <div class="card-section">
          <h5>{{holding.name}} - Qty Held: {{holding.quantity}}</h5>
                SubTotal Value {{holding.dollarValue}} USD
        </div>
      </div>
    </div>
    <div class="columns medium-12"><h5>Total Holdings (USD): {{totalHoldings}}</h5></div>
          
  </section>

</template>

<script lang="js">
      //TODO: - maybe move this to mounted and do for each item in current Holdings there?
      //possibly move to "computed" but would mean it was cached unless changes?

import axios from 'axios';
  export default  {
    name: 'portfolio',
    props: ['ticker'],
    mounted() {
      this.currentHoldings.map((holding)=>{
        axios
        .get(`https://api.coinmarketcap.com/v2/ticker/${holding.id}/`, {
          params: {}
        })
        .then(res => {
          let itemIndex = this.currentHoldings.map(function(x) {return x.id; }).indexOf(holding.id);
          this.currentHoldings[itemIndex].dollarValue = res.data.data.quotes.USD.price*this.currentHoldings[itemIndex].quantity;
          this.currentHoldings[itemIndex].name = res.data.data.name;
          this.totalHoldings+=res.data.data.quotes.USD.price*this.currentHoldings[itemIndex].quantity;
        })
      }
      );
    },
    data() {
      return {
        totalHoldings:0,
        currencyListing:[],
        currentHoldings:[{id:1, quantity:0.3, dollarValue:0, name:null},{id:10, quantity:50, dollarValue:0, name:null}]
      }
    },
    methods: {
    }
}
</script>

<style scoped>

</style>
