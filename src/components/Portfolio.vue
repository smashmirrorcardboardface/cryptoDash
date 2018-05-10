<template lang="html">

  <section class="portfolio">
    <h2>Portfolio</h2>
    <h5>Current Holdings</h5>
    <div class="columns medium-12" v-for="holding in currentHoldings">
      <div class="card">
        <div class="card-section">
          <h5>{{holding.name}} - Qty Held: {{holding.quantity}}</h5>
                {{getCurrencyDetailById(holding.id)}}
                Total Value {{holding.dollarValue}} USD
        </div>
      </div>

    </div>
  </section>

</template>

<script lang="js">
import axios from 'axios';
  export default  {
    name: 'portfolio',
    props: ['ticker'],
    mounted() {
    },
    data() {
      return {
        currencyListing:[],
        currentHoldings:[{id:1, quantity:0.3, dollarValue:0, name:null},{id:10, quantity:50, dollarValue:0, name:null}]
      }
    },
    methods: {
      //TODO - maybe move this to mounted and do for each item in current Holdings there?
      //possibly move to "computed" but would mean it was cached unless changes?
      getCurrencyDetailById(id){
        axios
        .get(`https://api.coinmarketcap.com/v2/ticker/${id}/`, {
          params: {}
        })
        .then(res => {
          let itemIndex = this.currentHoldings.map(function(x) {return x.id; }).indexOf(id);
          this.currentHoldings[itemIndex].dollarValue = res.data.data.quotes.USD.price*this.currentHoldings[itemIndex].quantity;
          this.currentHoldings[itemIndex].name = res.data.data.name;
        })
      }
    }
}
</script>

<style scoped>

</style>
