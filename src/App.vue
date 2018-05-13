<template>
  <div class="container">
  <div>
    <h2 class="mt-2">Top Crypto Currencies by Rank</h2>
    <SummaryDollarValue :ticker="ticker"></SummaryDollarValue>
    <Portfolio :listings="cryptoListing"></Portfolio>
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
    return { cryptoListing: [], ticker: [] };
  },
  methods: {},
  mounted: function() {
    //get data on app load.
    axios
      .get('https://api.coinmarketcap.com/v2/ticker/?limit=6', {
        params: {}
      })
      .then(res => {
        this.ticker = sortBy(Object.values(res.data.data), o => o['rank']);
      });
    axios
      .get('https://api.coinmarketcap.com/v2/listings/', {
        params: {}
      })
      .then(res => {
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
