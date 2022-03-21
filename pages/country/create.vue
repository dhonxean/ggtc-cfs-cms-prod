<template>
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/country" class="cancel button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				<span>Back</span>
			</nuxt-link>
		</div>

		<ValidationObserver tag="div" ref="form">
			<form id="form" class="form mb seventy" @submit.prevent="submit()">
				<div class="box mb">
					<div class="top_box inline">
						<h2>Information</h2>
						<div class="top_right">
							<!-- Action Items -->
							<div id="switch" :class="(form_data.publish) ? 'success toggled' : 'cancel'">
								<label for="switch_publish" @click="toggle('publish')"></label>
								<input
									type="checkbox"
									name="switch_publish"
									id="switch_publish"
									:checked="form_data.publish"
								/>
								<span>Publish</span>
							</div>
						</div>
					</div>
					<div class="bottom_box">
						<div class="group_inline two">
							<ValidationProvider tag="div" class="group bordered" name="name" :rules="{ required: true }" v-slot="{ errors }">
								<label for="name">Name *</label>
								<input type="text" class="input" name="name" autocomplete="off" placeholder="Enter country name" v-model="form_data.name">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<div class="group bordered">
								<label for="region">Region </label>
								<input type="text" class="input" name="region" autocomplete="off" placeholder="Enter region" v-model="form_data.region">
							</div>
						</div>
						<div class="group_inline three">
							<ValidationProvider tag="div" class="group bordered" name="country code" :rules="{ required: true }" v-slot="{ errors }">
								<label for="country_code">Country Code *</label>
								<input type="text" class="input" name="country_code" autocomplete="off" placeholder="Enter country code" v-model="form_data.country_code">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="currency" :rules="{ required: true }" v-slot="{ errors }">
								<label for="currency">Currency Code*</label>
								<input type="text" class="input" name="currency" autocomplete="off" placeholder="Enter currency code" v-model="form_data.currency">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="flag" :rules="{ required: true }" v-slot="{ errors }">
								<label for="flag">Flag *</label>
								<input type="text" class="input" name="flag" autocomplete="off" placeholder="Enter flag" v-model="form_data.flag">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
						<div class="group bordered">
							<label for="policy">CSR Policy *</label>
							<quill-editor
								class="editor policy"
								:value="form_data.policy"
								@change="updateWysiwyg($event, 'policy')"
							/>
							<transition name="slide"><span class="validate" v-if="validation.policy">The CSR Policy field is required</span></transition>
						</div>
						<div class="group bordered">
							<label for="gti_facts">GTI Facts *</label>
							<quill-editor
								class="editor gti_facts"
								:value="form_data.gti_facts"
								@change="updateWysiwyg($event, 'gti_facts')"
							/>
							<transition name="slide"><span class="validate" v-if="validation.gti_facts">The GTI Facts field is required</span></transition>
						</div>
						<div class="group bordered">
							<label for="acknowledgement">Acknowledgement *</label>
							<quill-editor
								class="editor acknowledgement"
								:value="form_data.acknowledgement"
								@change="updateWysiwyg($event, 'acknowledgement')"
							/>
							<transition name="slide"><span class="validate" v-if="validation.acknowledgement">The Acknowledgement field is required</span></transition>
						</div>
					</div>
				</div>
				<div class="box mb">
					<div class="top_box">
						<h2>Marine Waste</h2>
					</div>
					<div class="bottom_box">
						<div class="group_inline two">
							<ValidationProvider tag="div" class="group bordered" name="marine cost 1" :rules="{ required: true }" v-slot="{ errors }">
								<label for="marine_cost_1">Cost 1*</label>
								<input type="number" class="input" name="marine_cost_1" autocomplete="off" placeholder="Enter cost 1" v-model="form_data.marine_cost_1">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="marine year 1" :rules="{ required: true, max:4 }" v-slot="{ errors }">
								<label for="marine_cost_year_1">Year 1*</label>
								<input type="number" class="input" name="marine_cost_year_1" autocomplete="off" placeholder="Enter year 1" v-model="form_data.marine_cost_year_1">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
						<div class="group_inline two">
							<ValidationProvider tag="div" class="group bordered" name="marine cost 2" :rules="{ required: true }" v-slot="{ errors }">
								<label for="marine_cost_2">Cost 2*</label>
								<input type="number" class="input" name="marine_cost_2" autocomplete="off" placeholder="Enter cost 2" v-model="form_data.marine_cost_2">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="marine year 2" :rules="{ required: true, max:4 }" v-slot="{ errors }">
								<label for="marine_cost_year_2">Year 2*</label>
								<input type="number" class="input" name="marine_cost_year_2" autocomplete="off" placeholder="Enter year 2" v-model="form_data.marine_cost_year_2">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
						<ValidationProvider tag="div" class="group bordered" name="marine cost total" :rules="{ required: true }" v-slot="{ errors }">
							<label for="marine_cost_total">Cost Total*</label>
							<input type="number" class="input" name="marine_cost_total" autocomplete="off" placeholder="Enter cost total" v-model="form_data.marine_cost_total">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
					</div>
				</div>
				<div class="box mb">
					<div class="top_box">
						<h2>Urban Waste</h2>
					</div>
					<div class="bottom_box">
						<div class="group_inline two">
							<ValidationProvider tag="div" class="group bordered" name="urban cost 1" :rules="{ required: true }" v-slot="{ errors }">
								<label for="urban_cost_1">Cost 1*</label>
								<input type="text" class="input" name="urban_cost_1" autocomplete="off" placeholder="Enter cost 1" v-model="form_data.urban_cost_1">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="urban year 1" :rules="{ required: true, max:4 }" v-slot="{ errors }">
								<label for="urban_cost_year_1">Year 1*</label>
								<input type="number" class="input" name="urban_cost_year_1" autocomplete="off" placeholder="Enter year 1" v-model="form_data.urban_cost_year_1">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
						<div class="group_inline two">
							<ValidationProvider tag="div" class="group bordered" name="urban cost 2" :rules="{ required: true }" v-slot="{ errors }">
								<label for="urban_cost_2">Cost 2*</label>
								<input type="text" class="input" name="urban_cost_2" autocomplete="off" placeholder="Enter cost 2" v-model="form_data.urban_cost_2">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="urban year 2" :rules="{ required: true, max:4 }" v-slot="{ errors }">
								<label for="urban_cost_year_2">Year 2*</label>
								<input type="number" class="input" name="urban_cost_year_2" autocomplete="off" placeholder="Enter year 2" v-model="form_data.urban_cost_year_2">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
						<ValidationProvider tag="div" class="group bordered" name="urban cost total" :rules="{ required: true }" v-slot="{ errors }">
							<label for="urban_cost_total">Cost Total*</label>
							<input type="number" class="input" name="urban_cost_total" autocomplete="off" placeholder="Enter cost total" v-model="form_data.urban_cost_total">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
					</div>
				</div>
				<div class="box mb">
					<div class="top_box">
						<h2>Estimations</h2>
					</div>
					<div class="bottom_box">
						<div class="group_inline three">
							<ValidationProvider tag="div" class="group bordered" name="economic losses" :rules="{ required: true }" v-slot="{ errors }">
								<label for="economic_losses">Economic Losses *</label>
								<input type="text" class="input" name="economic_losses" autocomplete="off" placeholder="Enter economic losses" v-model="form_data.economic_losses">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="consumption in sticks" :rules="{ required: true }" v-slot="{ errors }">
								<label for="consumption">Consumption in sticks *</label>
								<input type="text" class="input" name="consumption" autocomplete="off" placeholder="Enter consumption in sticks" v-model="form_data.consumption">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="death" :rules="{ required: true }" v-slot="{ errors }">
								<label for="death">Death *</label>
								<input type="text" class="input" name="death" autocomplete="off" placeholder="Enter death" v-model="form_data.death">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
						<div class="group_inline three">
							<ValidationProvider tag="div" class="group bordered" name="low estimate" :rules="{ required: true }" v-slot="{ errors }">
								<label for="low_estimate">Low estimate *</label>
								<input type="number" class="input" name="low_estimate" autocomplete="off" placeholder="Enter low estimate" v-model="form_data.low_estimate">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="average estimate" :rules="{ required: true }" v-slot="{ errors }">
								<label for="average_estimate">Average estimate *</label>
								<input type="number" class="input" name="average_estimate" autocomplete="off" placeholder="Enter average estimate" v-model="form_data.average_estimate">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="high estimate" :rules="{ required: true }" v-slot="{ errors }">
								<label for="high_estimate">High estimate *</label>
								<input type="number" class="input" name="high_estimate" autocomplete="off" placeholder="Enter high estimate" v-model="form_data.high_estimate">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
					</div>
				</div>
				<div class="box mb">
					<div class="top_box">
						<h2>Companies</h2>
					</div>
					<div class="bottom_box">
						<ValidationProvider tag="div" class="group bordered multi nmb" name="company" :rules="{ required: true }" v-slot="{ errors }">
							<label for="items">company *</label>
							<multiselect placeholder="Search a item" id="company" label="name" track-by="id"
								:options="companies"
								:multiple="true"
								:close-on-select="true"
								:hide-selected="true"
								v-model="form_data.company">
							</multiselect>
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
					</div>
				</div>
				<div class="box mb">
					<div class="top_box">
						<h2>References</h2>
					</div>
					<div class="bottom_box">
						<ul class="gallery">
							<li v-for="(item, index) in form_data.reference" :key="index">
								<div class="group bordered">
									<label :for="`content_${index}`">Content  {{index + 1}}*</label>
									<quill-editor
										:class="`editor content_${index}`"
										:value="item.content"
										@change="updateWysiwyg($event, index, false, true, 'reference')"
									/>
									<transition name="slide"><span class="validate" v-if="item.validation">The Content {{index + 1}} field is required</span></transition>
								</div>
								<ValidationProvider tag="div" class="group bordered" :name="`sequence ${index+1}`" :rules="{ required: true,numeric: true, min_value: 1 }" v-slot="{ errors }">
									<label :for="`sequence_${index}`">Sequence {{index+1}} *</label>
									<input type="number" class="input" name="sequence[]" autocomplete="off" placeholder="Enter sequence" v-model="item.sequence">
									<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
								</ValidationProvider>
								<template v-if="form_data.reference.length != 1">
									<div class="actions inline centered nmb">
										<div class="cancel button pointer" @click="itemAction('remove', index)">
											<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"  fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
											<span>Remove</span>
										</div>
									</div>
								</template>
							</li>
							<li v-if="form_data.reference.length > 0">
								<div class="actions inline centered">
									<div class="info button pointer" @click="itemAction('add')">
										<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
										<span>Add reference</span>
									</div>
								</div>
							</li>
						</ul>
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
		components: {
			ImageHandlerContainer: () => import('~/components/file/ImageHandlerContainer'),
			AssetContainer: () => import('~/components/file/AssetContainer')
		},
		data: ({ $moment }) => ({
			loaded: false,
			validation: {
				policy: false,
				gti_facts: false,
				acknowledgement: false,
				reference: [false],
			},
			form_data: {
				publish: false,
				name: null,
				country_code: null,
				flag: null,
				currency: null,
				region: null,
				economic_losses: null,
				cigarettes_consumed: null,
				death: null,
				gti_facts: '',
				policy: '',
				acknowledgement: '',
				low_estimate: null,
				average_estimate: null,
				high_estimate: null,
				consumption: null,
				marine_cost_1: null,
				marine_cost_year_1: null,
				marine_cost_2: null,
				marine_cost_year_2: null,
				marine_cost_total: null,
				urban_cost_1: null,
				urban_cost_year_1: null,
				urban_cost_2: null,
				urban_cost_year_2: null,
				urban_cost_total: null,
				company: [],
				company_sequence: [],
				reference: [
					{
						content: '',
						sequence: 0,
						validation: false,
					},
				],
			},
			companies: [],
		}),
		methods: {
			toggle (type) {
				this.form_data[type] ^= true
			},
			itemAction(type, index=0) {
				const me = this
				switch (type) {
					case 'add':
						me.form_data.reference.push({
							content: '',
							sequence: 0,
							validation: false,
						})
						break;
					case 'remove':
						me.form_data.reference.splice(index, 1)
						break;
				}
			},
			submit () {
				const me = this
				me.$refs.form.validate().then(success => {
					if (!success) {
						me.validateWysiwyg(me, ['policy', 'gti_facts', 'acknowledgement'])
						me.validateWysiwyg(me, ['reference'], true)
						me.$scrollTo('.validate', {
							offset: -250
						})
						return
					} else {
						me.toggleModalStatus({ type: 'loader', status: true })
						let form_data = new FormData()

						form_data.append('publish', me.form_data.publish ? 1 : 0)
						form_data.append('name', me.form_data.name)
						form_data.append('region', me.form_data.region)
						form_data.append('country_code', me.form_data.country_code)
						form_data.append('flag', me.form_data.flag)
						form_data.append('currency', me.form_data.currency)
						form_data.append('region', me.form_data.region)
						form_data.append('economic_losses', me.form_data.economic_losses)
						form_data.append('death', me.form_data.death)
						form_data.append('gti_facts', me.form_data.gti_facts)
						form_data.append('policy', me.form_data.policy)
						form_data.append('acknowledgement', me.form_data.acknowledgement)
						form_data.append('low_estimate', me.form_data.low_estimate)
						form_data.append('average_estimate', me.form_data.average_estimate)
						form_data.append('high_estimate', me.form_data.high_estimate)
						form_data.append('consumption', me.form_data.consumption)
						form_data.append('marine_cost_1', me.form_data.marine_cost_1)
						form_data.append('marine_cost_year_1', me.form_data.marine_cost_year_1)
						form_data.append('marine_cost_2', me.form_data.marine_cost_2)
						form_data.append('marine_cost_year_2', me.form_data.marine_cost_year_2)
						form_data.append('marine_cost_total', me.form_data.marine_cost_total)
						form_data.append('urban_cost_1', me.form_data.urban_cost_1)
						form_data.append('urban_cost_year_1', me.form_data.urban_cost_year_1)
						form_data.append('urban_cost_2', me.form_data.urban_cost_2)
						form_data.append('urban_cost_year_2', me.form_data.urban_cost_year_2)
						form_data.append('urban_cost_total', me.form_data.urban_cost_total)

						me.form_data.company.forEach((item, index) => {
							form_data.append('company[]', item.id)
							form_data.append('company_sequence[]', index+1)
						})

						me.form_data.reference.forEach((item, index) => {
							form_data.append('reference[]', item.content)
							form_data.append('reference_sequence[]', item.sequence)
						})

						me.$axios.post('admin/country/create', form_data).then(res => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
							me.$router.push(`/country/${res.data.res.id}/update`)
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
			console.log(me.companies)
			me.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				me.toggleModalStatus({ type: 'loader', status: false })
				me.loaded = true
			}, 500)
		},
		asyncData ({ $axios, store }) {
			store.commit('global/settings/populateTitle', { title: 'Country' })

			return $axios.$post('admin/company/get-all-company?all=true').then(({ res }) => {
				return {
					companies: res
				}
			}).catch(({ response: { data: { errors } } }) => {
				store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: errors } })
			})
		}
	}
</script>
