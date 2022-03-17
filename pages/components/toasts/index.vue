<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
			</div>
			<div class="bottom_box">
				<div class="box_group_inline">
					<div class="primary button pointer" @click="addToast({ type: 'primary', message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit' })">Toast</div>
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Types</h2>
				<div class="description">
					<p>These toasts are only for demo purposes. You can change toast type and message by adding <b>:type</b> property and <b>:message</b> in the toast component.</p>
					<p><b>:type</b>: <i>primary, secondary, success, error, warning, info, dark</i></p>
				</div>
			</div>
			<div class="bottom_box">
				<div class="box_group_inline">
					<div :class="[ data.class, 'mr ten outline pointer' ]" @click="addToast({ type: data.type, message: data.message })" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	import { mapActions } from 'vuex'

	export default {
		data: () => ({
			loaded: false,
			buttons: [
				{
					name: 'Primary',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
					type: 'primary',
					class: 'primary button'
				},
				{
					name: 'Secondary',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
					type: 'secondary',
					class: 'secondary button'
				},
				{
					name: 'Success',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
					type: 'success',
					class: 'success button'
				},
				{
					name: 'Cancel',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
					type: 'cancel',
					class: 'cancel button'
				},
				{
					name: 'Warning',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
					type: 'warning',
					class: 'warning button'
				},
				{
					name: 'Info',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
					type: 'info',
					class: 'info button'
				},
				{
					name: 'Dark',
					message: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit',
					type: 'dark',
					class: 'dark button'
				}
			]
		}),
		methods: {
			...mapActions('global/toast', {
				addToast: 'addToast'
			})
		},
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		},
		asyncData ({ store }) {
			store.commit('global/settings/populateTitle', { title: 'Toasts' })
		}
	}
</script>
