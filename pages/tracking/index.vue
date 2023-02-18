<template>
  <div id="dashboard" v-if="loaded">
    <div class="box_parent full nmb">
      <div class="box nmb">
        <div class="top_box">
          <h2>Tracking Counts</h2>
        </div>
        <div class="bottom_box npb">
          <div class="columns">
            <div class="wrapper two" v-if="record">
              <nuxt-link
                :to="`/tracking/facebook`"
                class="column solid"
              >
                <div class="count">{{ record.facebook }}</div>
                <div class="title">Facebook Share Click</div>
              </nuxt-link>
              <nuxt-link
                :to="`/tracking/twitter`"
                class="column solid"
              >
                <div class="count">{{ record.twitter }}</div>
                <div class="title">Twitter Share Click</div>
              </nuxt-link>
            </div>
            <div class="wrapper two" v-if="record">
              <nuxt-link
                :to="`/tracking/click`"
                class="column solid"
              >
                <div class="count">{{ record.clicks }}</div>
                <div class="title">Consent Clicks</div>
              </nuxt-link>
              <nuxt-link
                :to="`/tracking/redirect`"
                class="column solid"
              >
                <div class="count">{{ record.redirects }}</div>
                <div class="title">Consent Redirects</div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    loaded: false,
    record: [],
  }),
  mounted() {
    this.toggleModalStatus({ type: 'loader', status: true })
    setTimeout( () => {
      this.toggleModalStatus({ type: 'loader', status: false })
      this.loaded = true
    }, 500)
  },
  asyncData ({ $axios, store, query }) {
    store.commit('global/settings/populateTitle', { title: 'Tracking' })

    return $axios.$get(`v1/admin/consent/stats`)
      .then(({ res }) => {
        return {
          record: res,
        }
      })
      .catch(({ response: { data: { errors } } }) => {
        store.commit('global/modal/toggleModalStatus', {
          type: 'catcher',
          status: true,
          item: { errors: errors }
        })
      })
  }
}
</script>
