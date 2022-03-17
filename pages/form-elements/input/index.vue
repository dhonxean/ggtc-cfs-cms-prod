<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
			</div>
			<div class="bottom_box form">
				<div class="group floating">
					<input type="text" :class="[ 'input', (form.sample.length > 0) ? 'filled' : '' ]" name="sample" autocomplete="off" v-model="form.sample">
					<label for="sample">Input</label>
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Disabled</h2>
				<div class="description">
					<p>Add <b>:class</b>: <i>disabled</i> together with input class</p>
				</div>
			</div>
			<div class="bottom_box form">
				<div class="group pt floating">
					<input type="text" :class="[ 'input disabled', (form.sample_v5.length > 0) ? 'filled' : '' ]" name="sample_v5" autocomplete="off" v-model="form.sample_v5">
					<label for="sample_v5">Disabled</label>
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Types</h2>
				<div class="description">
					<p>These inputs are only for demo purposes. You can change input type by adding this classes together with group.</p>
					<p><b>class</b>: <i>fixed, bordered, radius</i></p>
				</div>
			</div>
			<div class="bottom_box form">
				<div :class="[ 'group fixed', (form.sample_v2.length > 0) ? 'filled' : '' ]">
					<label for="sample_v2">Input</label>
					<input type="text" class="input" name="sample_v2" autocomplete="off" v-model="form.sample_v2">
				</div>
				<div :class="[ 'group bordered', (form.sample_v3.length > 0) ? 'filled' : '' ]">
					<label for="sample_v3">Input</label>
					<input type="text" class="input" name="sample_v3" autocomplete="off" v-model="form.sample_v3">
				</div>
				<div :class="[ 'group radius', (form.sample_v4.length > 0) ? 'filled' : '' ]">
					<label for="sample_v4">Input</label>
					<input type="text" class="input" name="sample_v4" autocomplete="off" v-model="form.sample_v4">
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false,
			form: {
				sample: '',
				sample_v2: '',
				sample_v3: '',
				sample_v4: '',
				sample_v5: ''
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
			store.commit('global/settings/populateTitle', { title: 'Input' })
		}
	}
</script>
