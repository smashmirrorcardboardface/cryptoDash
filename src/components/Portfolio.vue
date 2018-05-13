<template lang="html">

  <section class="portfolio mt-3">
  <b-card bg-variant="info" text-variant="white">
    <div slot="header" class="row">
      <div class="col-md-6"><h4>Portfolio - Total Holdings: {{totalHoldings}}(USD)</h4></div>
      <div class="col-md-6 text-right"><b-btn variant="light" v-b-modal.addHoldingModal>Add New Holding</b-btn></div>
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
  <b-modal id="addHoldingModal" title="Add Holding" v-on:ok="modalOk">
    <basic-select :options="listingOptions"
                  :selected-option="item"
                  placeholder="select item"
                  @select="onSelect"
                  >
    </basic-select>
    <b-form-input class="mt-1"
                  v-model="quantityInput"
                  type="text"
                  placeholder="Enter Qty.">
    </b-form-input>
    
  </b-modal>
 </section>

</template>

<script lang="js">
import axios from 'axios';
import HoldingSummary from './HoldingSummary';

//TODO: ADD Delete nd Update methods

import { BasicSelect } from 'vue-search-select';

export default  {
  name: 'portfolio',
  props: ['listings'],
  components:{HoldingSummary, BasicSelect},
  mounted() {
    this.getHoldingsDetail();
  },
  data() {
    return {

      totalHoldings:0,
      currentHoldings:[],
      searchText: '', // If value is falsy, reset searchText & searchItem
      item: {
        value: '',
        text: ''
      },
      quantityInput:0
      //currentHoldings:[{id:1, quantity:0.3, dollarValue:0, name:null},{id:10, quantity:50, dollarValue:0, name:null}]//testData
    }
  },
  computed: {
        listingOptions(){
          let listingOptionArray=[];
          this.listings.map((item, index)=>{
            let optionObject={value:item.id, text:item.name};
            listingOptionArray.push(optionObject);
          });
          return listingOptionArray;
        }
  },
  methods:{
    getHoldingsDetail(){
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
    onSelect (item) {
      this.item = item
    },
    reset () {
      this.item = {}
    },
    selectOption () {
      // select option from parent component
      this.item = this.options[0]
    },
    modalOk(){
      axios.post('http://localhost:4000/holding/add/',
      {
        quantity: this.quantityInput,
        id:this.item.value,
        name:null,
        dollarValue:0
      })
      .then((res)=>{
        console.info(res);
        this.getHoldingsDetail();
      })
    }
  }
}
</script>
