<template lang="html">
	<div id="dashboard" v-if="loaded">
		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
			</div>
			<div class="bottom_box form">
				<div class="group_inline nmb">
					<div class="checkbox">
						<input type="checkbox" class="check" name="sample" id="sample" @change="form.sample ^= true" :checked="form.sample">
						<label for="sample" class="pointer">Checkbox</label>
					</div>
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Disabled</h2>
				<div class="description">
					<p>Add <b>:class</b>: <i>disabled</i> together with checkbox class</p>
				</div>
			</div>
			<div class="bottom_box form">
				<div class="group_inline nmb">
					<div class="checkbox disabled">
						<input type="checkbox" class="check" name="sample_v2" id="sample_v2" @change="form.sample_v2 ^= true" :checked="form.sample_v2">
						<label for="sample_v2" class="pointer">Disabled</label>
					</div>
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Types</h2>
				<div class="description">
					<p>These checkboxes are only for demo purposes. You can change checkbox color by adding this classes.</p>
					<p><b>class</b>: <i>primary, secondary, success, error, warning, info, dark</i></p>
				</div>
			</div>
			<div class="bottom_box form">
				<div class="group_inline nmb">
					<div class="group" v-for="(type, key) in types" :key="key">
						<div :class="[ 'checkbox', type.class ]">
							<input type="checkbox" class="check" :name="`sample_${key}`" :id="`sample_${key}`" @change="type.value ^= true" :checked="type.value">
							<label :for="`sample_${key}`" class="pointer">{{ type.name }}</label>
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
			types: [
				{
					value: false,
					name: 'Primary',
					class: 'primary'
				},
				{
					value: false,
					name: 'Secondary',
					class: 'secondary'
				},
				{
					value: false,
					name: 'Success',
					class: 'success'
				},
				{
					value: false,
					name: 'Cancel',
					class: 'cancel'
				},
				{
					value: false,
					name: 'Warning',
					class: 'warning'
				},
				{
					value: false,
					name: 'Info',
					class: 'info'
				},
				{
					value: false,
					name: 'Dark',
					class: 'dark'
				}
			],
			form: {
				sample: false,
				sample_v2: false
			}
		}),
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		},
		asyncData ({ store }) {
			store.commit('global/settings/populateTitle', { title: 'Checkbox' })
		}
	}
</script>
