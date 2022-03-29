<template lang="html">
	<div id="dashboard" v-if="loaded">
		<!-- <div class="box_parent full nmb">
			<div class="box nmb">
				<div class="top_box">
					<h2>Sample</h2>
				</div>
				<div class="bottom_box npb">
					<div class="columns">
						<div class="wrapper four">
							<nuxt-link to="/" class="column" v-for="(data, key) in 6" :key="key">
								<div class="count">{{ key }}</div>
								<div class="title">Sample</div>
							</nuxt-link>
						</div>
					</div>
				</div>
			</div>
		</div> -->
	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false
		}),
		mounted () {
			const me = this
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		},
		asyncData ({ store }) {
			store.commit('global/settings/populateTitle', { title: 'Dashboard' })
		}
	}
</script>
