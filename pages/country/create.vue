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
							<!-- <ValidationProvider tag="div" class="group bordered" name="currency" :rules="{ required: true }" v-slot="{ errors }">
								<label for="currency">Currency Code*</label>
								<input type="text" class="input" name="currency" autocomplete="off" placeholder="Enter currency code" v-model="form_data.currency" @change="setDefaultCurrency()">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider> -->
							<ValidationProvider tag="div" class="group bordered multi nmb" name="currency code" :rules="{ required: true }" v-slot="{ errors }">
								<label for="items">Currency Code *</label>
								<multiselect placeholder="Search a item" id="currency_code" label="name" track-by="id"
									:options="rates"
									:multiple="false"
									:close-on-select="true"
									:hide-selected="true"
									@close="setDefaultCurrency()"
									v-model="form_data.currency">
								</multiselect>
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<div class="group bordered">
								<label for="currency_symbol">Currency Symbol</label>
								<input type="text" class="input" name="currency_symbol" autocomplete="off" placeholder="Enter currency symbol" v-model="form_data.currency_symbol">
							</div>
						</div>
						<div class="group bordered">
							<label for="csr_local_examples">CSR local examples *</label>
							<quill-editor
								class="editor csr_local_examples"
								:value="form_data.csr_local_examples"
								@change="updateWysiwyg($event, 'csr_local_examples')"
							/>
							<transition name="slide"><span class="validate" v-if="validation.csr_local_examples">The CSR local examples field is required</span></transition>
						</div>
						<div class="group bordered">
							<label for="csr_policy">CSR Policy</label>
							<quill-editor
								class="editor csr_policy"
								:value="form_data.csr_policy"
								@change="updateWysiwyg($event, 'csr_policy')"
							/>
							<!-- <transition name="slide"><span class="validate" v-if="validation.csr_policy">The CSR Policy field is required</span></transition> -->
						</div>
						<div class="group bordered">
							<label for="acknowledgement">Acknowledgement</label>
							<quill-editor
								class="editor acknowledgement"
								:value="form_data.acknowledgement"
								@change="updateWysiwyg($event, 'acknowledgement')"
							/>
							<!-- <transition name="slide"><span class="validate" v-if="validation.acknowledgement">The Acknowledgement field is required</span></transition> -->
						</div>
					</div>
				</div>
				<div class="box mb">
					<div class="top_box">
						<h2>Threat to Environmental harms</h2>
					</div>
					<div class="bottom_box">
						<div class="group_inline two">
							<ValidationProvider tag="div" class="group bordered" name="Death" :rules="{ required: true }" v-slot="{ errors }">
								<label for="death">Death *</label>
								<input type="number" class="input" name="death" autocomplete="off" placeholder="Enter death" v-model="form_data.death">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="Economic Losses" :rules="{ required: true }" v-slot="{ errors }">
								<label for="economic_cost">Economic Losses * (1 = FAR MORE)</label>
								<input type="decimal" class="input" name="economic_cost" autocomplete="off" placeholder="Enter Economic Losses" v-model="form_data.economic_cost">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
						<div class="group_inline two">
							<div class="group bordered">
								<label for="economic_cost_currency">Economic Losses Currency</label>
								<input type="text" class="input" name="economic_cost_currency" autocomplete="off" placeholder="Enter Economic Losses Currency" v-model="form_data.economic_cost_currency">
							</div>
							<ValidationProvider tag="div" class="group bordered" name="Cigarettes Consumed" :rules="{ required: true }" v-slot="{ errors }">
								<label for="cigarettes_consumed">Cigarettes Consumed * </label>
								<input type="number" class="input" name="cigarettes_consumed" autocomplete="off" placeholder="Enter Cigarettes Consumed" v-model="form_data.cigarettes_consumed">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<!-- <div class="group bordered" name="Cigarettes Consumed Unit">
								<label for="cigarettes_consumed_unit">Cigarettes Consumed Unit</label>
								<input type="text" class="input" name="cigarettes_consumed_unit" autocomplete="off" placeholder="Enter Cigarettes Consumed Unit" v-model="form_data.cigarettes_consumed_unit">
							</div>
							<div class="group bordered" >
								<label for="cigarettes_sticks">Cigarettes Sticks</label>
								<input type="number" class="input" name="cigarettes_sticks" autocomplete="off" placeholder="Enter Cigarettes Sticks" v-model="form_data.cigarettes_sticks">
							</div> -->
						</div>
					</div>
				</div>
				<!-- <div class="box mb">
					<div class="top_box inline two">
						<h2>Cost Estimations in USD</h2> 
						<h2>Cost Estimations in {{ form_data.currency != null && form_data.currency != '' ? form_data.currency.name : 'Country Currency' }}</h2> 
					</div>
					<div class="bottom_box">
						<div class="group_inline two">
							<ValidationProvider tag="div" class="group bordered" name="Marine Cost per ton" :rules="{ required: true }" v-slot="{ errors }">
								<label for="marine_cost_per_ton">Marine Cost per ton *</label>
								<input type="decimal" class="input" name="marine_cost_per_ton" autocomplete="off" placeholder="Enter Marine Cost per ton" v-model="form_data.marine_cost_per_ton">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="Waste Cost per ton" :rules="{ required: true }" v-slot="{ errors }">
								<label for="waste_cost_per_ton">Waste Cost per ton *</label>
								<input type="decimal" class="input" name="waste_cost_per_ton" autocomplete="off" placeholder="Enter Waste Cost per ton" v-model="form_data.waste_cost_per_ton">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
						<div class="group_inline three">
							<ValidationProvider tag="div" class="group bordered" name="Marine Pollution Cost" :rules="{ required: true }" v-slot="{ errors }">
								<label for="marine_pollution">Marine Pollution Cost *</label>
								<input type="decimal" class="input" name="marine_pollution" autocomplete="off" placeholder="Enter Marine Pollution Cost" v-model="form_data.marine_pollution">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="Waste Management Cost" :rules="{ required: true }" v-slot="{ errors }">
								<label for="waste_management">Waste Management Cost *</label>
								<input type="decimal" class="input" name="waste_management" autocomplete="off" placeholder="Enter Waste Management Cost" v-model="form_data.waste_management">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered" name="Partial Cost" :rules="{ required: true }" v-slot="{ errors }">
								<label for="partial_cost">Partial Cost *</label>
								<input type="decimal" class="input" name="partial_cost" autocomplete="off" placeholder="Enter Partial Cost" v-model="form_data.partial_cost">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
					</div>
				</div> -->
				<div class="box mb">
					<div class="top_box">
						<h2>Cost Estimations in USD</h2> 
						<p class="description">Maximum of two decimals only</p>
					</div>
					<div class="bottom_box">
						<!-- <div class="group_inline two">
							<div class="group bordered">
								<label for="marine_cost_per_ton">Marine Cost per ton</label>
								<input @keyup="convertSelectedCurrency('local_marine_cost_per_ton', selected_rates, 'marine_cost_per_ton')" pattern="/^\d+(?:\.\d{0,2})?/" type="number" step="0.000000001" class="input" name="marine_cost_per_ton" autocomplete="off" placeholder="Enter Marine Cost per ton" v-model="form_data.marine_cost_per_ton">
							</div>
							<div class="group bordered">
								<label for="marine_cost_per_ton">Marine Cost per ton in {{ form_data.currency != null && form_data.currency != '' ? form_data.currency.name : 'Country Currency' }}</label>
								<input @keyup="convertSelectedCurrency('marine_cost_per_ton', selected_rates, 'local_marine_cost_per_ton', 'usd')" type="number" step="0.000000001" class="input" name="marine_cost_per_ton" autocomplete="off" :placeholder="`Enter Marine Cost per ton in ${form_data.currency != null && form_data.currency != '' ? form_data.currency.name : 'Country Currency'}`" v-model="form_data.local_marine_cost_per_ton">
							</div>
						</div>
						<div class="group_inline two">
							<div class="group bordered">
								<label for="waste_cost_per_ton">Waste Cost per ton</label>
								<input @keyup="convertSelectedCurrency('local_waste_cost_per_ton', selected_rates, 'waste_cost_per_ton')" type="number" step="0.000000001" class="input" name="waste_cost_per_ton" autocomplete="off" placeholder="Enter Waste Cost per ton" v-model="form_data.waste_cost_per_ton">
							</div>
							<div class="group bordered">
								<label for="waste_cost_per_ton">Waste Cost per ton in {{ form_data.currency != null && form_data.currency != '' ? form_data.currency.name : 'Country Currency' }}</label>
								<input @keyup="convertSelectedCurrency('waste_cost_per_ton', selected_rates, 'local_waste_cost_per_ton', 'usd')" type="number" step="0.000000001" class="input" name="waste_cost_per_ton" autocomplete="off" :placeholder="`Enter Waste Cost per ton in ${form_data.currency != null && form_data.currency != '' ? form_data.currency.name : 'Country Currency'}`" v-model="form_data.local_waste_cost_per_ton">
							</div>
						</div> -->
						<div class="group_inline two">
							<ValidationProvider tag="div" class="group bordered" name="Marine Pollution Cost" :rules="{ required: true }" v-slot="{ errors }">
								<label for="marine_pollution">Marine Pollution Cost *</label>
								<input @keyup="convertSelectedCurrency('local_marine_pollution', selected_rates, 'marine_pollution')" type="number" step="0.000000001" class="input" name="marine_pollution" autocomplete="off" placeholder="Enter Marine Pollution Cost" v-model="form_data.marine_pollution">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<div class="group bordered">
								<label for="marine_pollution">Marine Pollution Cost in {{ form_data.currency != null && form_data.currency != '' ? form_data.currency.name : 'Country Currency' }}</label>
								<input @keyup="convertSelectedCurrency('marine_pollution', selected_rates, 'local_marine_pollution', 'usd')" type="number" step="0.000000001" class="input" name="marine_pollution" autocomplete="off" :placeholder="`Enter Marine Pollution Cost in ${form_data.currency != null && form_data.currency != '' ? form_data.currency.name : 'Country Currency'}`" v-model="form_data.local_marine_pollution">
							</div>
						</div>
						<div class="group_inline two">
							<ValidationProvider tag="div" class="group bordered" name="Waste Management Cost" :rules="{ required: true }" v-slot="{ errors }">
								<label for="waste_management">Waste Management Cost *</label>
								<input @keyup="convertSelectedCurrency('local_waste_management', selected_rates, 'waste_management')" type="number" step="0.000000001" class="input" name="waste_management" autocomplete="off" placeholder="Enter Waste Management Cost" v-model="form_data.waste_management">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<div class="group bordered">
								<label for="waste_management">Waste Management Cost in {{ form_data.currency != null && form_data.currency != '' ? form_data.currency.name : 'Country Currency' }}</label>
								<input @keyup="convertSelectedCurrency('waste_management', selected_rates, 'local_waste_management', 'usd')" type="number" step="0.000000001" class="input" name="waste_management" autocomplete="off" :placeholder="`Enter Waste Management Cost in ${form_data.currency != null && form_data.currency != '' ? form_data.currency.name : 'Country Currency'}`" v-model="form_data.local_waste_management">
							</div>
						</div>
						<div class="group_inline two">
							<ValidationProvider tag="div" class="group bordered" name="Partial Cost" :rules="{ required: true }" v-slot="{ errors }">
								<label for="partial_cost">Partial Cost *</label>
								<input @keyup="convertSelectedCurrency('local_partial_cost', selected_rates, 'partial_cost')" type="number" step="0.000000001" class="input" name="partial_cost" autocomplete="off" placeholder="Enter Partial Cost" v-model="form_data.partial_cost">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<div class="group bordered">
								<label for="partial_cost">Partial Cost in {{ form_data.currency != null && form_data.currency != '' ? form_data.currency.name : 'Country Currency' }}</label>
								<input @keyup="convertSelectedCurrency('partial_cost', selected_rates, 'local_partial_cost', 'usd')" type="number" step="0.000000001" class="input" name="partial_cost" autocomplete="off" :placeholder="`Enter Partial Cost in ${form_data.currency != null && form_data.currency != '' ? form_data.currency.name : 'Country Currency'}`" v-model="form_data.local_partial_cost">
							</div>
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
								<div class="actions inline centered nmb">
									<div class="cancel button pointer" @click="itemAction('remove', index)">
										<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24"  fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
										<span>Remove</span>
									</div>
									<div class="info button ml ten pointer" @click="itemAction('add')" v-if="index+1 == form_data.reference.length">
										<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
										<span>Add reference</span>
									</div>
								</div>
							</li>
							<li v-if="form_data.reference.length == 0">
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
				csr_policy: false,
				csr_local_examples: false,
				acknowledgement: false,
				reference: [],
			},
			form_data: {
				publish: false,
				name: null,
				country_code: null,
				flag: null,
				currency: null,
				currency_symbol: null,
				region: '',
				death: null,
				csr_local_examples: null,
				csr_policy: null,
				acknowledgement: null,
				cigarettes_consumed: null,
				cigarettes_consumed_unit: null,
				economic_cost: null,
				economic_cost_currency: null,
				cigarettes_sticks: null,
				company: [],
				company_sequence: [],
				reference: [],

				// usd only
				marine_cost_per_ton: null,
				waste_cost_per_ton: null,
				marine_pollution: null,
				waste_management: null,
				partial_cost: null,

				// local currency
				local_marine_cost_per_ton: null,
				local_waste_cost_per_ton: null,
				local_marine_pollution: null,
				local_waste_management: null,
				local_partial_cost: null,
			},
			companies: [],
			rates: [],
			selected_rates: 1,
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
						me.validateWysiwyg(me, ['csr_local_examples'])
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
						form_data.append('country_code', me.form_data.country_code)
						form_data.append('currency', me.form_data.currency.id)
						form_data.append('currency_symbol', me.form_data.currency_symbol != null ? me.form_data.currency_symbol : '')
						form_data.append('region', me.form_data.region)
						form_data.append('death', me.form_data.death)
						form_data.append('csr_local_examples', me.form_data.csr_local_examples)
						form_data.append('csr_policy', me.form_data.csr_policy != null && me.form_data.csr_policy != "" ? me.form_data.csr_policy : '')
						form_data.append('acknowledgement', me.form_data.acknowledgement != null && me.form_data.acknowledgement != "" ? me.form_data.acknowledgement : '')
						form_data.append('marine_pollution', me.form_data.marine_pollution)
						form_data.append('waste_management', me.form_data.waste_management)
						form_data.append('cigarettes_consumed', me.form_data.cigarettes_consumed)
						form_data.append('cigarettes_consumed_unit', me.form_data.cigarettes_consumed_unit != null && me.form_data.cigarettes_consumed_unit != "" ? me.form_data.cigarettes_consumed_unit : '')
						form_data.append('economic_cost', me.form_data.economic_cost)
						form_data.append('economic_cost_currency', me.form_data.economic_cost_currency != null && me.form_data.economic_cost_currency != "" ? me.form_data.economic_cost_currency : '')
						form_data.append('cigarettes_sticks', me.form_data.cigarettes_sticks != null && me.form_data.cigarettes_sticks != "" ? me.form_data.cigarettes_sticks : '')
						form_data.append('marine_cost_per_ton', me.form_data.marine_cost_per_ton != null && me.form_data.marine_cost_per_ton != "" ? me.form_data.marine_cost_per_ton : '')
						form_data.append('waste_cost_per_ton', me.form_data.waste_cost_per_ton != null && me.form_data.waste_cost_per_ton != "" ? me.form_data.waste_cost_per_ton : '')
						form_data.append('partial_cost', me.form_data.partial_cost)

						me.form_data.company.forEach((item, index) => {
							form_data.append('company[]', item.id)
							form_data.append('company_sequence[]', index+1)
						})

						me.form_data.reference.forEach((item, index) => {
							form_data.append('reference[]', item.content)
							form_data.append('reference_sequence[]', item.sequence)
						})

						me.$axios.post('v1/admin/country/create', form_data).then(res => {
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
			},
			getCurrency() {
				const me = this
				me.$axios.post('v1/admin/currency-rate/get-all-currency?all=true').then(res => {
					me.rates = res.data.res
				}).catch(err => {
					me.toggleModalStatus({ type: 'catcher', status: true, item: { errors: err.response.data.errors } })
				}).then(() => {
					setTimeout( () => {
						me.toggleModalStatus({ type: 'loader', status: false })
						me.loaded = true
					}, 500)
				})
			},
			setDefaultCurrency() {
				const me  = this
				me.selected_rates = me.form_data.currency != null ? me.form_data.currency.amount : 1
				setTimeout(() => {
					me.convertAllAmount()
				}, 200)
			},
			convertAllAmount() {
				const me = this
				me.convertSelectedCurrency('local_marine_cost_per_ton', me.selected_rates, 'marine_cost_per_ton')
				me.convertSelectedCurrency('local_waste_cost_per_ton', me.selected_rates, 'waste_cost_per_ton')
				me.convertSelectedCurrency('local_marine_pollution', me.selected_rates, 'marine_pollution')
				me.convertSelectedCurrency('local_waste_management', me.selected_rates, 'waste_management')
				me.convertSelectedCurrency('local_partial_cost', me.selected_rates, 'partial_cost')
			},
			convertSelectedCurrency(value, currency_rate, to_convert, type = 'local') {
				const me = this
				var converted = 0
				switch (type) {
					case 'local':
						if (me.form_data[to_convert] != undefined) {
							if (me.form_data[to_convert] != null && me.form_data[to_convert] != '') {
								converted = Number(me.form_data[to_convert]) * Number(currency_rate)
				
								me.form_data[value] = Math.round(Number(converted.toString().match(/^\d+(?:\.\d{0,2})?/)))
							}
							else {
								me.form_data[value] = null
							}
						}
						break;
					case 'usd':
						if (me.form_data[to_convert] != undefined) {
							if (me.form_data[to_convert] != null && me.form_data[to_convert] != '') {
								converted = Number(me.form_data[to_convert]) / Number(currency_rate)
				
								me.form_data[value] = Number(converted.toString().match(/^\d+(?:\.\d{0,2})?/))
							}
							else {
								me.form_data[value] = null
							}
						}
						break;
				}
			}
		},
		mounted () {
			const me = this
			me.toggleModalStatus({ type: 'loader', status: true })
			me.getCurrency()
		},
		asyncData ({ $axios, store }) {
			store.commit('global/settings/populateTitle', { title: 'Country' })

			return $axios.$post('v1/admin/company/get-all-company?all=true').then(({ res }) => {
				return {
					companies: res
				}
			}).catch(({ response: { data: { errors } } }) => {
				store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: errors } })
			})
		}
	}
</script>
