<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
				<div class="description">
					<p>Property <b>:data</b> pass <b>OBJECT ARRAY</b> if updating the item. (Default: <b>NULL</b>)</p>
					<br />
					<p>Property <b>:parent</b> pass <b>NUMBER</b> if updating the item. (Default: <b>0</b>)</p>
					<br />
					<p>Property <b>:category</b> pass <b>STRING</b>. (Default: <b>image</b>)</p>
					<br />
					<p>Property <b>:dimension</b> pass <b>OBJECT</b>. (Default: <b>{ imageWidth: 0, imageHeight: 0 }</b>)</p>
					<br />
					<p>Property <b>:show_image_mode</b> pass <b>BOOLEAN</b>. (Default: <b>FALSE</b>)</p>
					<br />
					<p>Property <b>:show_image_caption</b> pass <b>BOOLEAN</b>. (Default: <b>FALSE</b>)</p>
					<br />
					<p>Property <b>:show_sequence</b> pass <b>BOOLEAN</b>. (Default: <b>FALSE</b>)</p>
					<br />
					<p>Property <b>:required</b> pass <b>BOOLEAN</b>. (Default: <b>TRUE</b>)</p>
					<br />
					<p>Property <b>:multiple</b> pass <b>BOOLEAN</b>. (Default: <b>FALSE</b>)</p>
					<br />
					<p>Property <b>:multiple</b> pass <b>BOOLEAN</b>. (Default: <b>FALSE</b>)</p>
				</div>
			</div>
			<div class="bottom_box form">
				<div class="group nmb">
					<image-handler-container
						:input_name="'file'"
						:image_label="'Image'"
						:multiple="false"
						:category="'image'"
					/>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		components: {
			ImageHandlerContainer: () => import('~/components/file/ImageHandlerContainer')
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
			store.commit('global/settings/populateTitle', { title: 'Image' })
		}
	}
</script>
