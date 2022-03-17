<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
				<div class="description">
					<p>Add <b>:class</b>: <i>select</i> together with group class</p>
				</div>
			</div>
			<div class="bottom_box form">
				<div class="group floating select">
					<select :class="[ 'input', (form.sample.length > 0) ? 'filled' : '' ]" name="sample" v-model="form.sample">
						<option value="test" v-for="n in 5">Test</option>
					</select>
					<div class="dd"></div>
					<label for="sample">Select</label>
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
				<div class="group pt floating select">
					<select :class="[ 'input disabled', (form.sample_v5.length > 0) ? 'filled' : '' ]" name="sample_v5" v-model="form.sample_v5">
						<option value="test" v-for="n in 5">Test</option>
					</select>
					<div class="dd"></div>
					<label for="sample_v5">Select</label>
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Types</h2>
				<div class="description">
					<p>These selects are only for demo purposes. You can change select type by adding this classes together with group.</p>
					<p><b>class</b>: <i>fixed, bordered, radius</i></p>
				</div>
			</div>
			<div class="bottom_box form">
				<div :class="[ 'group select fixed', (form.sample_v2.length > 0) ? 'filled' : '' ]">
					<label for="sample_v2">Select</label>
					<select class="input" name="sample_v2" v-model="form.sample_v2">
						<option value="test" v-for="n in 5">Test</option>
					</select>
					<div class="dd"></div>
				</div>
				<div :class="[ 'group select bordered', (form.sample_v3.length > 0) ? 'filled' : '' ]">
					<label for="sample_v3">Select</label>
					<select class="input" name="sample_v3" v-model="form.sample_v3">
						<option value="test" v-for="n in 5">Test</option>
					</select>
					<div class="dd"></div>
				</div>
				<div :class="[ 'group select radius', (form.sample_v4.length > 0) ? 'filled' : '' ]">
					<label for="sample_v4">Select</label>
					<select class="input" name="sample_v4" v-model="form.sample_v4">
						<option value="test" v-for="n in 5">Test</option>
					</select>
					<div class="dd"></div>
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
			store.commit('global/settings/populateTitle', { title: 'Select' })
		}
	}
</script>
