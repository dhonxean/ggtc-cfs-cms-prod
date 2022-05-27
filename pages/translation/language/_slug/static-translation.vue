<template>
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/translation/language" class="cancel button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				<span>Back</span>
			</nuxt-link>
		</div>

		<ValidationObserver tag="div" ref="form">
			<form id="form" class="form mb seventy" @submit.prevent="submit()">
				<div class="box mb">
					<div class="top_box">
						<h2>Static Translation of {{ res.name }}</h2>
						<p class="description">Don't remove the html element in English translation when translating to {{ res.name }} translation</p>
					</div>
					<div class="bottom_box">
						<div class="group_inline nmb two">
							<div class="group bordered">
								<label class="label l">{{ res.name }} Translation</label>
							</div>
							<div class="group bordered">
								<label class="label l">English Translation</label>
							</div>
						</div>
						<template v-for="(item, key) in default_data">
							<div class="group_inline two" :key="key">
								<validation-provider tag="div" :name="humanize('validation', key)" :rules="{ required: (res.static_translation && res.static_translation.is_default) ? true : false }" v-slot="{ errors }" class="group bordered">
									<label>{{ humanize('label', key) }} {{ (res.static_translation && res.static_translation.is_default) ? '*' : '' }}</label>
									<textarea :name="key" class="input" rows="5" v-model="form_data[key]"></textarea>
									<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
								</validation-provider>
								<div class="group viewing">
									<div class="field-input pt20">
										<span>{{ item }}</span>
										<div>
											<div class="success button pointer" @click="toggleModalStatus({ type: 'image_viewer', status: true, item: { path: key } })">
												<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
												<span>View this part</span>
											</div>
										</div>
									</div>
								</div>
							</div>
						</template>
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
  import staticTranslation from '~/plugins/translation/static-translation.js'
	export default {
    mixins: [staticTranslation],
		methods: {
			humanize (type, identifier) {
				let result = ''

				switch (type) {
				case 'label':
					result = identifier.split('_').join(' ').toUpperCase()
					break
				case 'validation':
					result = identifier.split('_').join(' ').toLowerCase()
					break
				}

				return result
			},
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
						let api = ''
						me.form_data.language_id = me.res.id
						api = (me.res.static_translation != null)
							? `v2/admin/static-translation/update/${me.res.static_translation.id}`
							: `v2/admin/static-translation/create`

						Object.keys(me.form_data).forEach(key => {
							if (!me.form_data[key]) {
								me.form_data[key] = me.default_data[key]
							}
						})

						me.$axios.post(api, me.form_data).then(res => {
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
			store.commit('global/settings/populateTitle', { title: 'Language' })

			return $axios.$get(`v2/admin/static-translation/info/${params.slug}?type=language_id`).then(({ res: { sttc, dflt } }) => {
				if (sttc.static_translation != null) {
					let form_data = {}
					Object.keys(sttc.static_translation.content_fields).forEach(key => {
						form_data[key] = sttc.static_translation.content_fields[key]
					})
					return {
						res: sttc,
            default_data: dflt.content_fields,
						form_data: form_data
					}
				}
				else {
					let form_data = {}
					Object.keys(dflt.content_fields).forEach(key => {
						form_data[key] = ''
					})
					return {
						res: sttc,
            default_data: dflt.content_fields,
						form_data: form_data
					}
				}

			}).catch(({ response: { data: { errors } } }) => {
				error({ statusCode: 404, message: 'Page not found' })
			})
		}
	}
</script>
