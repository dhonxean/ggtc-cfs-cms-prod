<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
				<div class="description">
					<p>Property <b>:type="primary"</b> and <b>:description="The quick brown fox jumps over the lazy dog."</b></p>
				</div>
			</div>
			<div class="bottom_box">
				<alert />
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Types</h2>
				<div class="description">
					<p>These alerts are only for demo purposes. You can change alert type and message by adding <b>:type</b> property and <b>:message</b> in the alert component.</p>
					<p><b>:type</b>: <i>primary, secondary, success, error, warning, info, dark</i></p>
				</div>
			</div>
			<div class="bottom_box">
				<alert :type="demo_alert.type" :message="demo_alert.message" :class="(key + 1 != demo_alerts.length) ? 'mb twenty' : ''" v-for="(demo_alert, key) in demo_alerts" :key="key" />
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Auto Dismissal</h2>
				<div class="description">
					<p>In order to trigger the auto dismissal, add a property <b>:auto_dismiss</b> and set to <b>TRUE</b>. You can also set the time of dismissing the alert by adding a property <b>:dismiss_time</b> and set the tithis. The default value of dismissal time is <b>5000</b>.</p>
				</div>
			</div>
			<div class="bottom_box">
				<div :class="[ 'primary button', (show) ? 'none mb twenty' : 'pointer' ]" @click="triggerAutoDismiss()">Show Alert</div>
				<transition name="fade">
					<alert :type="'success'" :auto_dismiss="true" v-if="show" />
				</transition>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false,
			show: false,
			demo_alerts: [
				{
					type: 'secondary',
					message: 'This is a secondary alert!'
				},
				{
					type: 'success',
					message: 'This is a success alert!'
				},
				{
					type: 'error',
					message: 'This is a error alert!'
				},
				{
					type: 'warning',
					message: 'This is a warning alert!'
				},
				{
					type: 'info',
					message: 'This is a info alert!'
				},
				{
					type: 'dark',
					message: 'This is a dark alert!'
				}
			]
		}),
		methods: {
			triggerAutoDismiss () {
				this.show = true
				setTimeout( () => {
					this.show = false
				}, 5000)
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
			store.commit('global/settings/populateTitle', { title: 'Alert' })
		}
	}
</script>
