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
                <validation-provider tag="div" name="header title" :rules="{ required: (res.static_translation && res.static_translation.is_default) ? true : false }" v-slot="{ errors }" class="group bordered">
                  <label>{{ key }} {{ (res.static_translation && res.static_translation.is_default) ? '*' : '' }}</label>
                  <textarea :name="key" class="input" rows="1" v-model="form_data[key]"></textarea>
                  <transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
                </validation-provider>
                <div class="group viewing">
                  <div class="field-input pt20">
                    {{ item }}
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

			return $axios.$get(`v2/admin/static-translation/info/${params.slug}?type=language_id`).then(({ res }) => {
				if (res.static_translation != null) {
					let form_data = {
						header_title: res.static_translation.content_fields.header_title,
						dropdown_label: res.static_translation.content_fields.dropdown_label,
						download: res.static_translation.content_fields.download,
						infographics_title: res.static_translation.content_fields.infographics_title,
						cultivation: res.static_translation.content_fields.cultivation,
						curing: res.static_translation.content_fields.curing,
						process_manufacturing: res.static_translation.content_fields.process_manufacturing,
						distribution: res.static_translation.content_fields.distribution,
						use: res.static_translation.content_fields.use,
						disposal: res.static_translation.content_fields.disposal,
						waste_management: res.static_translation.content_fields.waste_management,
						marine_pollution: res.static_translation.content_fields.marine_pollution,
						billion: res.static_translation.content_fields.billion,
						million: res.static_translation.content_fields.million,
						trillion: res.static_translation.content_fields.trillion,
						in_usd: res.static_translation.content_fields.in_usd,
						cost: res.static_translation.content_fields.cost,
						cigarettes_consumed: res.static_translation.content_fields.cigarettes_consumed,
						waste_management_costs: res.static_translation.content_fields.waste_management_costs,
						consuming: res.static_translation.content_fields.consuming,
						sticks_of_cigarettes: res.static_translation.content_fields.sticks_of_cigarettes,
						produced_mainly: res.static_translation.content_fields.produced_mainly,
						references: res.static_translation.content_fields.references,
						show_less: res.static_translation.content_fields.show_less,
						show_more: res.static_translation.content_fields.show_more,
						threat_title: res.static_translation.content_fields.threat_title,
						threat_p_1: res.static_translation.content_fields.threat_p_1,
						threat_p_2: res.static_translation.content_fields.threat_p_2,
						threat_p_3: res.static_translation.content_fields.threat_p_3,
						threat_p_4: res.static_translation.content_fields.threat_p_4,
						threat_p_5: res.static_translation.content_fields.threat_p_5,
						threat_p_6: res.static_translation.content_fields.threat_p_6,
						threat_p_7: res.static_translation.content_fields.threat_p_7,
						threat_p_8: res.static_translation.content_fields.threat_p_8,
						threat_p_9: res.static_translation.content_fields.threat_p_9,
						cost_p_1: res.static_translation.content_fields.cost_p_1,
						cost_p_2: res.static_translation.content_fields.cost_p_2,
						cost_p_3: res.static_translation.content_fields.cost_p_3,
						cost_p_4: res.static_translation.content_fields.cost_p_4,
						example_title: res.static_translation.content_fields.example_title,
						example_p_1: res.static_translation.content_fields.example_p_1,
						example_p_2: res.static_translation.content_fields.example_p_2,
						example_p_3: res.static_translation.content_fields.example_p_3,
						example_p_4: res.static_translation.content_fields.example_p_4,
						reco_title: res.static_translation.content_fields.reco_title,
						reco_p_1: res.static_translation.content_fields.reco_p_1,
						reco_p_2: res.static_translation.content_fields.reco_p_2,
						reco_p_3: res.static_translation.content_fields.reco_p_3,
						reco_p_4: res.static_translation.content_fields.reco_p_4,
						reco_p_5: res.static_translation.content_fields.reco_p_5,
						reco_p_6: res.static_translation.content_fields.reco_p_6,
						marine_modal: res.static_translation.content_fields.marine_modal,
						waste_modal: res.static_translation.content_fields.waste_modal,
						partial_modal: res.static_translation.content_fields.partial_modal,
						back_to_main_site: res.static_translation.content_fields.back_to_main_site,
						deaths: res.static_translation.content_fields.deaths,
					}
					return {
						res: res,
						form_data: form_data
					}
				}
				else {
					return {
						res: res
					}
				}

			}).catch(({ response: { data: { errors } } }) => {
				error({ statusCode: 404, message: 'Page not found' })
			})
		}
	}
</script>
