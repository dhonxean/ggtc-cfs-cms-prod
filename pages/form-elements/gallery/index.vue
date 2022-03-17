<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
				<div class="description">
					<p>Property <b>:records</b> pass <b>OBJECT ARRAY</b> if updating the item. (Default: <b>NULL</b>)</p>
					<br />
					<p>Property <b>:title</b> pass <b>STRING</b>. (Default: <b>Gallery</b>)</p>
					<br />
					<p>Property <b>:update</b> pass <b>BOOLEAN</b> if updating the item. (Default: <b>FALSE</b>)</p>
					<br />
					<p>Property <b>:image_input_name</b> pass <b>STRING</b>. (Default: <b>gallery</b>)</p>
					<br />
					<p>Property <b>:show_image_caption</b> pass <b>BOOLEAN</b>. (Default: <b>FALSE</b>)</p>
					<br />
					<p>Property <b>:show_adding</b> pass <b>BOOLEAN</b>. (Default: <b>TRUE</b>)</p>
					<br />
					<p>Property <b>:show_sequence</b> pass <b>BOOLEAN</b>. (Default: <b>TRUE</b>)</p>
					<br />
					<p>Property <b>:show_videos</b> pass <b>BOOLEAN</b>. (Default: <b>TRUE</b>)</p>
					<br />
					<p>Property <b>:max_number</b> pass <b>NUMBER</b>. (Default: <b>6</b>)</p>
				</div>
			</div>
			<div class="bottom_box form">
				<div class="group nmb">
					<gallery
						:image_input_name="'gallery'"
						:show_sequence="false"
						:show_image_caption="true"
						:show_videos="false"
						:show_adding="false"
					/>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		components: {
			Gallery: () => import('~/components/gallery/Gallery')
		},
		data: () => ({
			loaded: false
		}),
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		},
		asyncData ({ store }) {
			store.commit('global/settings/populateTitle', { title: 'Gallery' })
		}
	}
</script>
