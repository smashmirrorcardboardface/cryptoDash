<template>
  <div class="container">
    <SummaryDollarValue></SummaryDollarValue>
    {{cryptoListing.data}}
  </div>
</template>

<script>
import SummaryDollarValue from './components/SummaryDollarValue';
import axios from 'axios';
const API_KEY = 'AIzaSyAKV4Nn-zOThQqqnvXPCghTHqiO_zYNKfw';

export default {
  name: 'App',
  components: {
    SummaryDollarValue: SummaryDollarValue
  },
  data() {
    return { cryptoListing: [] };
  },
  methods: {},
  mounted: function() {
    axios
      .get('https://api.coinmarketcap.com/v2/ticker/', {
        params: {}
      })
      .then(res => {
        this.cryptoListing = res.data;
      });
  }
};
</script>
