<template lang="html">
	<div id="dashboard" v-if="loaded">
		<ValidationObserver tag="div" ref="form">
			<form id="form" class="form mb seventy" @submit.prevent="submit()">
				<div class="box">
					<div class="top_box">
						<h2>File</h2>
					</div>
					<div class="bottom_box">
						<asset-container
							:extensions="['xlsx']"
							:division="'whole'"
							:columns="''"
							:multiple="false"
							:type="'file'"
							file_name="file"
						/>
					</div>
				</div>
				<div class="buttons fixed">
					<nuxt-link :to="`/dashboard`"  class="cancel button half_width btn lg">Cancel</nuxt-link>
					<button type="submit" class="success button half_width btn lg pointer">Submit</button>
				</div>
			</form>
		</ValidationObserver>

	</div>
</template>

<script>
	export default {
		components: {
			AssetContainer: () => import('~/components/file/AssetContainer')
		},
		data: () => ({
			loaded: false,
		}),
		methods: {
			submit() {
				const me = this
				me.$refs.form.validate().then(success => {
					if (!success) {
						me.$scrollTo('.validate', {
							offset: -250
						})
						return
					} else {
						me.toggleModalStatus({ type: 'loader', status: true })

						let form_data = new FormData(document.getElementById('form'))
						form_data.append('type', 'country')

						me.$axios.post('admin/import/country', form_data).then(res => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Data Imported Successfully!' })
						}).catch(err => {
							me.toggleModalStatus({ type: 'catcher', status: true, item: { errors: err.response.data.errors } })
						}).then(() => {
							me.toggleModalStatus({ type: 'loader', status: false })
							setTimeout(() => {
								location.reload(true)
							}, 1000)
						})
					}
					me.$nextTick(() => {
						me.$refs.form.reset()
					})
				})
			}
		},
		mounted () {
			const me = this
			me.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				me.toggleModalStatus({ type: 'loader', status: false })
				me.loaded = true
			}, 500)
		},
		asyncData ({ $axios, store }) {
			store.commit('global/settings/populateTitle', { title: 'Import Country' })

		}
	}
</script>
