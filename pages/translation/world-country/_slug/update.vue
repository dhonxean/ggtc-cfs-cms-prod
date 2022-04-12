<template>
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/translation/world-country" class="cancel button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				<span>Back</span>
			</nuxt-link>
			<nuxt-link to="/translation/world-country/create" class="success ml ten button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
				<span>Add Another</span>
			</nuxt-link>
		</div>

		<ValidationObserver tag="div" ref="form">
			<form id="form" class="form mb seventy" @submit.prevent="submit()">
				<div class="box mb">
					<div class="top_box">
						<h2>Information</h2>
					</div>
					<div class="bottom_box">
						<ValidationProvider tag="div" class="group bordered" name="name" :rules="{ required: true }" v-slot="{ errors }">
							<label for="name">Name *</label>
							<input type="text" class="input" name="name" autocomplete="off" placeholder="Enter country name" v-model="form_data.name">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
						<ValidationProvider tag="div" class="group bordered" name="country code" :rules="{ required: true }" v-slot="{ errors }">
							<label for="country_code">Country Code *</label>
							<input type="text" class="input" name="country_code" autocomplete="off" placeholder="Enter country code" v-model="form_data.country_code">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
						<ValidationProvider tag="div" class="group bordered multi nmb" name="language" :rules="{ required: true }" v-slot="{ errors }">
							<label for="items">Language *</label>
							<multiselect placeholder="Search a item" id="language" label="name" track-by="id"
								:options="languages"
								:multiple="false"
								:close-on-select="true"
								:hide-selected="true"
								v-model="form_data.language_id">
							</multiselect>
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
					</div>
				</div>
				<div class="buttons fixed">
					<nuxt-link to="/" class="cancel button half_width btn lg">Cancel</nuxt-link>
					<button type="submit" class="success button half_width btn lg pointer">Submit</button>
				</div>
			</form>
		</ValidationObserver>
	</div>
</template>

<script>
	export default {
		data: ({ $moment }) => ({
			loaded: false,
			form_data: {
				name: null,
				country_code: null,
				language_id: null,
			},
			languages: [],
		}),
		methods: {
			submit () {
				const me = this
				me.$refs.form.validate().then(success => {
					if (!success) {
						me.$scrollTo('.validate', {
							offset: -250
						})
						return
					} else {
						me.toggleModalStatus({ type: 'loader', status: true })
						let form_data = new FormData()

						form_data.append('name', me.form_data.name)
						form_data.append('country_code', me.form_data.country_code)
						form_data.append('language_id', me.form_data.language_id.id)

						me.$axios.post(`v2/admin/world-country/update/${me.$route.params.slug}`, form_data).then(res => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been updated!' })
							me.$nuxt.refresh()
						}).catch(err => {
							me.toggleModalStatus({ type: 'catcher', status: true, item: { errors: err.response.data.errors } })
						}).then(() => {
							setTimeout( () => {
								me.toggleModalStatus({ type: 'loader', status: false })
							}, 500)
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
		asyncData ({ $axios, store, error, params }) {
			store.commit('global/settings/populateTitle', { title: 'World Country' })

			return $axios.$get(`v2/admin/world-country/info/${params.slug}`).then(({ res }) => {
				let record = res
				return $axios.$post('v2/admin/language/get-all-language?all=true').then(({ res }) => {
					return {
						languages: res,
						form_data: {
							name: record.name,
							country_code: record.country_code,
							language_id: record.language != null ? record.language : null,
						}
					}
				}).catch(({ response: { data: { errors } } }) => {
					store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: errors } })
				})
			}).catch(({ response: { data: { errors } } }) => {
				error({ statusCode: 404, message: 'Page not found' })
			})
		}
	}
</script>
