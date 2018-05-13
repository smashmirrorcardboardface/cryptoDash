<template lang="html">

  <section class="summary-dollar-value row">
    <div class="col-sm-4" v-for="listing in ticker">
      <b-card no-body class="mb-1">
          <h5 slot="header">{{listing.name}}({{listing.symbol}})</h5>
          <b-card-body>
            <p class="card-text">
              ${{listing.quotes.USD.price}}USD
            </p>
          </b-card-body>
      </b-card>
    </div>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'summary-dollar-value',
    props: ['ticker']
}
</script>

<style scoped>

</style>
