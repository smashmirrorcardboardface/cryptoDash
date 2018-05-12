<template>
  <div class="row">
  <div class="large-12 columns">
    <h2>Top Crypto Currencies by Rank</h2>
    <SummaryDollarValue :ticker="cryptoListing"></SummaryDollarValue>
    <Portfolio :ticker="cryptoListing"></Portfolio>
  </div>
  </div>
</template>

<script>
import SummaryDollarValue from './components/SummaryDollarValue';
import Portfolio from './components/Portfolio';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    SummaryDollarValue: SummaryDollarValue,
    Portfolio: Portfolio
  },
  data() {
    //to populate from coinmarket Ticker Endpoint
    return { cryptoListing: [] };
  },
  methods: {},
  mounted: function() {
    //get data on app load.
    axios
      .get('https://api.coinmarketcap.com/v2/ticker/?limit=8', {
        params: {}
      })
      .then(res => {
        //TODO - move this to method
        this.cryptoListing = sortBy(
          Object.values(res.data.data),
          o => o['rank']
        );
      });
  }
};

function sortBy(list, keyFunc) {
  return list.sort((a, b) => keyFunc(a) - keyFunc(b));
}
</script>
