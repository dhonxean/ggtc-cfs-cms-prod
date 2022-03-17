<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
			</div>
			<div class="bottom_box">
				<div class="box_group_inline">
					<div :class="[ data.class, 'mr ten pointer' ]" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
				</div>
			</div>
		</div>

		<div class="box_inline two mb">
			<div class="box">
				<div class="top_box">
					<h2>Outline</h2>
					<div class="description">
						<p>Just add <b>outline</b> class along with the button class.</p>
					</div>
				</div>
				<div class="bottom_box">
					<div class="box_group_inline">
						<div :class="[ data.class, 'mr ten pointer', 'outline' ]" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
					</div>
				</div>
			</div>

			<div class="box">
				<div class="top_box">
					<h2>Flat</h2>
					<div class="description">
						<p>Just add <b>flat</b> class along with the button class.</p>
					</div>
				</div>
				<div class="bottom_box">
					<div class="box_group_inline">
						<div :class="[ data.class, 'mr ten pointer', 'flat' ]" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
					</div>
				</div>
			</div>
		</div>

		<div class="box_inline two mb">
			<div class="box">
				<div class="top_box">
					<h2>Rectangle</h2>
					<div class="description">
						<p>Just add <b>rectangle</b> class along with the button class.</p>
					</div>
				</div>
				<div class="bottom_box">
					<div class="box_group_inline">
						<div :class="[ data.class, 'mr ten pointer', 'rectangle' ]" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
					</div>
				</div>
			</div>

			<div class="box">
				<div class="top_box">
					<h2>Rectangle</h2>
					<div class="description">
						<p>Just add <b>rounded</b> class along with the button class.</p>
					</div>
				</div>
				<div class="bottom_box">
					<div class="box_group_inline">
						<div :class="[ data.class, 'mr ten pointer', 'rounded' ]" v-for="(data, key) in buttons" :key="key">{{ data.name }}</div>
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
			buttons: [
				{
					name: 'Primary',
					class: 'primary button'
				},
				{
					name: 'Secondary',
					class: 'secondary button'
				},
				{
					name: 'Success',
					class: 'success button'
				},
				{
					name: 'Cancel',
					class: 'cancel button'
				},
				{
					name: 'Warning',
					class: 'warning button'
				},
				{
					name: 'Info',
					class: 'info button'
				},
				{
					name: 'Dark',
					class: 'dark button'
				}
			]
		}),
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		},
		asyncData ({ store }) {
			store.commit('global/settings/populateTitle', { title: 'Button' })
		}
	}
</script>
