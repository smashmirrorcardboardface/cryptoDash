<template>
  <div class="container">
    <h2>Top 10 Crypto Currencies by Rank</h2>
    <SummaryDollarValue :ticker="cryptoListing"></SummaryDollarValue>
  </div>
</template>

<script>
import SummaryDollarValue from './components/SummaryDollarValue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    SummaryDollarValue: SummaryDollarValue
  },
  data() {
    //to populate from coinmarket Ticker Endpoint
    return { cryptoListing: [] };
  },
  methods: {},
  mounted: function() {
    //get data on app load.
    axios
      .get('https://api.coinmarketcap.com/v2/ticker/?limit=10', {
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
