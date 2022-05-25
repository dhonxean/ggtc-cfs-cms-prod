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
									<div class="field-input inline pt20">
										<span>{{ item }}</span>
										<div class="success button pointer">
											<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle></svg>
											<span>View this part</span>
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
						share_infographics_title: res.static_translation.content_fields.share_infographics_title,
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
						link_copied: res.static_translation.content_fields.link_copied,
						show_less: res.static_translation.content_fields.show_less,
						show_more: res.static_translation.content_fields.show_more,
						back_to_main_site: res.static_translation.content_fields.back_to_main_site,
						search_country: res.static_translation.content_fields.search_country,
						no_country_found: res.static_translation.content_fields.no_country_found,
						curing_popup: res.static_translation.content_fields.curing_popup,
						cultivation_popup: res.static_translation.content_fields.cultivation_popup,
						processing_popup: res.static_translation.content_fields.processing_popup,
						disposal_popup: res.static_translation.content_fields.disposal_popup,
						distribution_popup: res.static_translation.content_fields.distribution_popup,
						use_popup: res.static_translation.content_fields.use_popup,
						marine_pollution_popup_p_1: res.static_translation.content_fields.marine_pollution_popup_p_1,
						marine_pollution_popup_p_2: res.static_translation.content_fields.marine_pollution_popup_p_2,
						waste_management_popup: res.static_translation.content_fields.waste_management_popup,
						partial_cost_popup: res.static_translation.content_fields.partial_cost_popup,
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
						threat_p_10: res.static_translation.content_fields.threat_p_10,
						cost_per_year: res.static_translation.content_fields.cost_per_year,
						cost_sub_title: res.static_translation.content_fields.cost_sub_title,
						cost_explanation_p_1: res.static_translation.content_fields.cost_explanation_p_1,
						cost_explanation_p_2: res.static_translation.content_fields.cost_explanation_p_2,
						cost_explanation_p_3: res.static_translation.content_fields.cost_explanation_p_3,
						cost_added_harms: res.static_translation.content_fields.cost_added_harms,
						cost_deaths: res.static_translation.content_fields.cost_deaths,
						cost_and: res.static_translation.content_fields.cost_and,
						cost_far_more: res.static_translation.content_fields.cost_far_more,
						cost_each_year: res.static_translation.content_fields.cost_each_year,
						cost_in: res.static_translation.content_fields.cost_in,
						cost_economic_losses: res.static_translation.content_fields.cost_economic_losses,
						cost_consuming: res.static_translation.content_fields.cost_consuming,
						cost_sticks: res.static_translation.content_fields.cost_sticks,
						cost_produced_mainly_by: res.static_translation.content_fields.cost_produced_mainly_by,
						tobacco_industry_title: res.static_translation.content_fields.tobacco_industry_title,
						tobacco_industry_p_1: res.static_translation.content_fields.tobacco_industry_p_1,
						tobacco_industry_p_2: res.static_translation.content_fields.tobacco_industry_p_2,
						recommendations_title: res.static_translation.content_fields.recommendations_title,
						recommendations_p_1: res.static_translation.content_fields.recommendations_p_1,
						recommendations_p_2: res.static_translation.content_fields.recommendations_p_2,
						recommendations_item_1: res.static_translation.content_fields.recommendations_item_1,
						recommendations_item_2: res.static_translation.content_fields.recommendations_item_2,
						recommendations_item_3: res.static_translation.content_fields.recommendations_item_3,
						recommendations_item_4: res.static_translation.content_fields.recommendations_item_4,
						recommendations_item_5: res.static_translation.content_fields.recommendations_item_5,
						recommendations_item_6: res.static_translation.content_fields.recommendations_item_6,
						references_title: res.static_translation.content_fields.references_title,
						references_item_1: res.static_translation.content_fields.references_item_1,
						references_item_2: res.static_translation.content_fields.references_item_2,
						references_item_3: res.static_translation.content_fields.references_item_3,
						references_item_4: res.static_translation.content_fields.references_item_4,
						references_item_5: res.static_translation.content_fields.references_item_5,
						references_item_6: res.static_translation.content_fields.references_item_6,
						references_item_7: res.static_translation.content_fields.references_item_7,
						references_item_8: res.static_translation.content_fields.references_item_8,
						references_item_9: res.static_translation.content_fields.references_item_9,
						references_item_10: res.static_translation.content_fields.references_item_10,
						references_item_11: res.static_translation.content_fields.references_item_11,
						acknowledgement_title: res.static_translation.content_fields.acknowledgement_title,
						
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
