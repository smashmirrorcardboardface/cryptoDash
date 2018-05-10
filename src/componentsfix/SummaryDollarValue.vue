<template lang="html">

  <section class="summary-dollar-value">
    <div class="columns medium-3" v-for="listing in ticker">
      <div class="card">
        <div class="card-section">
          <h5>{{listing.name}}({{listing.symbol}})</h5>
        </div>
        <div class="card-divider">
          ${{listing.quotes.USD.price}}USD
        </div>    
      </div>
    </div>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'summary-dollar-value',
    props: ['ticker'],
    mounted() {

    },
    data() {
      return {

      }
    },
    methods: {

    },
    computed: {

    }
}
</script>

<style scoped>

</style>
