<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
			</div>
			<div class="bottom_box">
				<div id="tabs">
					<div class="parent">
						<ul>
							<li :class="[ 'pointer', (active_tab == data.unique) ? 'active' : '' ]" v-for="(data, key) in tabs" :key="key" @click="getTab(data)">{{ data.name }}</li>
						</ul>
					</div>
					<div class="child">
						<div v-if="active_tab == 0">
							<div class="fade">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
							</div>
						</div>
						<div v-if="active_tab == 1">
							<div class="fade">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
							</div>
						</div>
						<div v-if="active_tab == 2">
							<div class="fade">
								Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
							</div>
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
			tabs: [
				{
					name: 'Details',
					unique: 0
				},
				{
					name: 'Materials',
					unique: 1
				},
				{
					name: 'Videos',
					unique: 2
				}
			],
			active_tab: 0
		}),
		methods: {
			getTab (data) {
				this.active_tab = data.unique
			}
		},
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		},
		asyncData ({ store }) {
			store.commit('global/settings/populateTitle', { title: 'Tabs' })
		}
	}
</script>
