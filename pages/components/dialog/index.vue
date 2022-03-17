<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="box mb">
			<div class="top_box">
				<h2>Confirmation</h2>
			</div>
			<div class="bottom_box">
				<div class="box_group_inline">
					<div class="primary button pointer" @click="toggleModalStatus({ type: 'confirmation', status: true, item: { action: 'primary' } })">Confirm</div>
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Error</h2>
			</div>
			<div class="bottom_box">
				<div class="box_group_inline">
					<div class="cancel button pointer" @click="toggleModalStatus({ type: 'catcher', status: true, item: { errors: ['asdasd', 'asdasdsad'] } })">Show</div>
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Types</h2>
				<div class="description">
					<p>These dialogs are only for demo purposes. You can change dialog type by adding <b>:type</b> property in the dialog component.</p>
					<p><b>:type</b>: <i>primary, secondary, success, error, warning, info, dark</i></p>
				</div>
			</div>
			<div class="bottom_box">
				<div class="box_group_inline">
					<div :class="[ data.class, 'mr ten pointer', 'outline' ]" v-for="(data, key) in buttons" :key="key" @click="toggleType(data)">{{ data.name }}</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false,
			buttons: [
				{
					name: 'Primary',
					class: 'primary button',
					dialog: 'primary'
				},
				{
					name: 'Secondary',
					class: 'secondary button',
					dialog: 'secondary'
				},
				{
					name: 'Success',
					class: 'success button',
					dialog: 'success'
				},
				{
					name: 'Cancel',
					class: 'cancel button',
					dialog: 'cancel'
				},
				{
					name: 'Warning',
					class: 'warning button',
					dialog: 'warning'
				},
				{
					name: 'Info',
					class: 'info button',
					dialog: 'info'
				},
				{
					name: 'Dark',
					class: 'dark button',
					dialog: 'dark'
				}
			],
			type: 'primary'
		}),
		methods: {
			toggleType (data) {
				this.toggleModalStatus({ type: 'confirmation', status: true, item: { action: data.dialog } })
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
			store.commit('global/settings/populateTitle', { title: 'Dialog' })
		}
	}
</script>
