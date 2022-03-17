<template lang="html">
	<div id="dashboard" v-if="loaded">
		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
				<div class="description">
					<p>You can choose if file is multiple or single by adding <b>:multiple</b> property with a value of <b>TRUE</b> or <b>FALSE</b>.</p><br />
					<p>Property <b>:multiple="true"</b>, <b>:type="image"</b> and <b>:extensions="['jpeg', 'jpg', 'png']"</b></p>
					<!-- <p>You can change the type of asset by adding <b>:type</b> property with a value of <b>IMAGE</b> or <b>FILE</b>.</p> -->
				</div>
			</div>
			<div class="bottom_box form">
				<asset-container />
			</div>
		</div>

		<div class="box mb">
			<div class="top_box">
				<h2>Single File</h2>
				<div class="description">
					<p>Property <b>:multiple="false"</b>, <b>:type="file"</b> and <b>:extensions="['pdf', 'txt', 'doc']"</b></p>
				</div>
			</div>
			<div class="bottom_box form">
				<asset-container :unique="1" :extensions="['pdf', 'txt', 'doc']" :multiple="false" :type="'file'" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		components: {
			AssetContainer: () => import('~/components/file/AssetContainer')
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
			store.commit('global/settings/populateTitle', { title: 'File' })
		}
	}
</script>
