<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
			</div>
			<div class="bottom_box form">
				<div class="group_inline nmb">
					<div class="group radios">
						<input type="radio" class="radio" value="yes" name="sample" id="yes" v-model="form.sample">
						<label for="yes" class="pointer">Yes</label>
					</div>
					<div class="group radios">
						<input type="radio" class="radio" value="no" name="sample" id="no" v-model="form.sample">
						<label for="no" class="pointer">No</label>
					</div>
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Disabled</h2>
				<div class="description">
					<p>Add <b>:class</b>: <i>disabled</i> together with radios class</p>
				</div>
			</div>
			<div class="bottom_box form">
				<div class="group radios disabled nmb">
					<input type="radio" class="radio" value="disabled" name="sample" id="disabled">
					<label for="disabled" class="pointer">Disabled</label>
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Types</h2>
				<div class="description">
					<p>These radios are only for demo purposes. You can change radio color by adding this classes.</p>
					<p><b>class</b>: <i>primary, secondary, success, error, warning, info, dark</i></p>
				</div>
			</div>
			<div class="bottom_box form">
				<div class="group_inline nmb">
					<div :class="[ 'group radios', type.class ]" v-for="(type, key) in types" :key="key">
						<input type="radio" class="radio" :value="type.class" :name="`sample_${key}`" :id="type.class" v-model="type.value">
						<label :for="type.class" class="pointer">{{ type.name }}</label>
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
				sample: ''
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
			store.commit('global/settings/populateTitle', { title: 'Radio' })
		}
	}
</script>
