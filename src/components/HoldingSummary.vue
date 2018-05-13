<template lang="html">

  <section class="holding-summary">
    <b-card no-body class="mb-1" bg-variant="secondary">
        <h4 slot="header">{{holding.name}}</h4>
        <div slot="footer">SubTotal Value {{holding.dollarValue}} USD</div>
        <b-card-body>
        <h5>Qty Held: {{holding.quantity}}</h5>
        </b-card-body>
      </b-card>
  </section>

</template>

<script lang="js">
  export default  {
    name: 'holding-summary',

    props: ['holding'],
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