<template lang="html">

  <section class="portfolio mt-3">
  <b-card bg-variant="info" text-variant="white">
    <div slot="header" class="row">
      <div class="col-md-6"><h4>Portfolio - Total Holdings: {{totalHoldings}}(USD)</h4></div>
      <div class="col-md-6 text-right"><b-btn variant="light" v-b-modal.modal1>Add New Holding</b-btn></div>
    </div>
    <p class="card-text">
    Current Holdings
    <div class="row">
    <div class="col-sm-4" v-for="holding in currentHoldings">
      <HoldingSummary :holding="holding"></HoldingSummary>
    </div></div>
    </p>
  </b-card>
    <!-- Modal Component -->
  <b-modal id="modal1" title="Add Holding">
    <basic-select :options="options"
                  :selected-option="item"
                  placeholder="select item"
                  >
    </basic-select>
  </b-modal>
 </section>

</template>

<script lang="js">
import axios from 'axios';
import HoldingSummary from './HoldingSummary';

import { BasicSelect } from 'vue-search-select'

  export default  {
    name: 'portfolio',
    props: ['listings'],
    components:{HoldingSummary, BasicSelect},
    mounted() {
      axios.get('http://localhost:4000/holding/').then((result) => {
        this.currentHoldings=result.data;
        console.info(this.currentHoldings);
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
        })
      })
      
    
    },
    data() {
      return {
        options:[{ value: '1', text: 'aa' + ' - ' + '1' },
          { value: '2', text: 'ab' + ' - ' + '2' },
          { value: '3', text: 'bc' + ' - ' + '3' },
          { value: '4', text: 'cd' + ' - ' + '4' },
          { value: '5', text: 'de' + ' - ' + '5' }],
        totalHoldings:0,
        currentHoldings:[],
        searchText: '', // If value is falsy, reset searchText & searchItem
        item: {
          value: '',
          text: ''
        }
        //currentHoldings:[{id:1, quantity:0.3, dollarValue:0, name:null},{id:10, quantity:50, dollarValue:0, name:null}]//testData
      }
    },
    methods: {
    }
}
</script>
