<template lang="html">
	<div id="dashboard" v-if="loaded">
		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
			</div>
			<div class="bottom_box">
				<pagination :api_route="'testing'" :current="1" :last="10" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false
		}),
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		},
		asyncData ({ store }) {
			store.commit('global/settings/populateTitle', { title: 'Pagination' })
		}
	}
</script>
