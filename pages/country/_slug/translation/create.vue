<template>
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link :to="`/country/${$route.params.slug}/translation`" class="cancel button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				<span>Back</span>
			</nuxt-link>
		</div>

		<ValidationObserver tag="div" ref="form">
			<form id="form" class="form mb seventy" @submit.prevent="submit()">
				<div class="box mb">
					<div class="top_box">
						<h2>Dynamic translation of {{ country.name }} Contents</h2>
					</div>
					<div class="bottom_box">
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
				<!-- CSR Policy  -->
				<div class="box mb">
					<div class="top_box">
						<h2>CSR Policy</h2>
					</div>
					<div class="bottom_box">
						<div class="group viewing">
							<label for="csr_policy">English version</label>
							<div class="field-input" v-html="country.country_detail != null ? country.country_detail.csr_policy : 'N/A'"></div>
						</div>
						<div class="group bordered">
							<label for="csr_policy">Translated version</label>
							<quill-editor
								class="editor csr_policy"
								:value="form_data.csr_policy"
							/>
						</div>
					</div>
				</div>
				<!-- CSR Local Examples  -->
				<div class="box mb">
					<div class="top_box">
						<h2>CSR Local Examples</h2>
					</div>
					<div class="bottom_box">
						<div class="group viewing">
							<label for="csr_local_examples">English version</label>
							<div class="field-input" v-html="country.country_detail != null ? country.country_detail.csr_local_examples : 'N/A'"></div>
						</div>
						<div class="group bordered">
							<label for="csr_local_examples">Translated version</label>
							<quill-editor
								class="editor csr_local_examples"
								:value="form_data.csr_local_examples"
							/>
						</div>
					</div>
				</div>
				<!-- acknowledgement  -->
				<div class="box mb">
					<div class="top_box">
						<h2>CSR Local Examples</h2>
					</div>
					<div class="bottom_box">
						<div class="group viewing">
							<label for="csr_acknowledgement">English version</label>
							<div class="field-input" v-html="country.country_detail != null ? country.country_detail.acknowledgement : 'N/A'"></div>
						</div>
						<div class="group bordered">
							<label for="csr_acknowledgement">Translated version</label>
							<quill-editor
								class="editor csr_acknowledgement"
								:value="form_data.csr_acknowledgement"
							/>
						</div>
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
			validation: {
				csr_policy: false,
				csr_local_examples: false,
				acknowledgement: false,
			},
			form_data: {
				language_id: null,
				csr_policy: null,
				csr_local_examples: null,
				csr_acknowledgement: null
			},
			languages: [],
			country: [],
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
						form_data.append('country_id', me.$route.params.slug)
						form_data.append('language_id', me.form_data.language_id.id)
						form_data.append('csr_policy', me.form_data.csr_policy)
						form_data.append('csr_local_examples', me.form_data.csr_local_examples)
						form_data.append('csr_acknowledgement', me.form_data.csr_acknowledgement)

						me.$axios.post('v2/admin/dynamic-translation/create', form_data).then(res => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
							me.$router.push(`/country/${me.$route.params.slug}/translation/${res.data.res.id}/update`)
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
		asyncData ({ $axios, store, params, error }) {
			store.commit('global/settings/populateTitle', { title: 'Country' })
			return $axios.$get(`v1/admin/country/info/${params.slug}`).then(({ res }) => {
				let country = res
				return $axios.$post('v2/admin/language/get-all-language?all=true').then(({ res }) => {
					return {
						languages: res,
						country: country
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
