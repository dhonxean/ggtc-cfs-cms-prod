<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
				<div class="description">
					<p>Property <b>:separator="/"</b> and <b>:alignment="left"</b></p>
				</div>
			</div>
			<div class="bottom_box">
				<div class="box_group">
					<breadcrumb />
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Separator</h2>
				<div class="description">
					<p>These breadcrumbs are only for demo purposes. You can change breadcrumb separator by adding <b>:separator</b> property in the breadcrumb component.</p>
				</div>
			</div>
			<div class="bottom_box">
				<div :class="[ 'box_group', (key + 1 != demo_separators.length) ? 'mb twenty' : '' ]" v-for="(demo_separator, key) in demo_separators" :key="key">
					<breadcrumb :separator="demo_separator" />
				</div>
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Alignment</h2>
				<div class="description">
					<p>You can change breadcrumb alignment by adding <b>:alignment</b> property in the breadcrumb component.</p>
				</div>
			</div>
			<div class="bottom_box">
				<div :class="[ 'box_group', (key + 1 != demo_alignments.length) ? 'mb twenty' : '' ]" v-for="(demo_alignment, key) in demo_alignments" :key="key">
					<breadcrumb :alignment="demo_alignment" />
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false,
			demo_separators: ['-', '|', '◦', '▪', '▹'],
			demo_alignments: ['left', 'center', 'right']
		}),
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		},
		asyncData ({ store }) {
			store.commit('global/settings/populateTitle', { title: 'Breadcrumb' })
		}
	}
</script>
