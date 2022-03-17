<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/projects" class="cancel button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				<span>Back</span>
			</nuxt-link>
		</div>

		<ValidationObserver tag="form" ref="form" id="form" class="form mb seventy" @submit.prevent="submit()">
			<div class="box mb">
				<div class="top_box">
					<h2>Information</h2>
				</div>
				<div class="bottom_box">
					<ValidationProvider tag="div" class="group bordered" name="name" :rules="{ required: true }" v-slot="{ errors }">
						<label for="name">Name *</label>
						<input type="text" class="input" name="name" autocomplete="off" placeholder="Enter name" v-model="form_data.name">
						<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
					</ValidationProvider>
					<div class="group_inline two">
						<ValidationProvider tag="div" class="group bordered nmb" name="year" :rules="{ required: true }" v-slot="{ errors }">
							<label for="location">Location *</label>
							<input type="text" class="input" name="location" autocomplete="off" placeholder="Enter location" v-model="form_data.location">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
						<ValidationProvider tag="div" class="group select bordered nmb" name="continent" :rules="{ required: true }" v-slot="{ errors }">
							<label for="continent">Continent *</label>
							<select class="input" name="continent" autocomplete="off"v-model="form_data.continent">
								<option value="" disabled selected>Select continent</option>
								<option :value="continent.code" v-for="(continent, key) in continents" :key="key">{{ continent.name }}</option>
							</select>
							<div class="dd"></div>
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
					</div>
					<div class="group bordered nmb">
						<label for="overview">Overview *</label>
						<quill-editor
							class="editor overview"
							:value="form_data.overview"
							@change="updateWysiwyg($event, 'overview')"
						/>
						<div class="disclaimer">
							<p class="violator">Remaining <b>{{ char_limit.overview.value }}</b> characters.</p>
						</div>
						<transition name="slide"><span class="validate" v-if="validation.overview">{{ validation.overview }}</span></transition>
					</div>
				</div>
			</div>
			<div class="box mb">
				<div class="top_box">
					<h2>Asset</h2>
				</div>
				<div class="bottom_box">
					<div class="group nmb">
						<image-handler-container
							:image_label="'Main Image'"
							:input_name="'main_image'"
							:category="'main_image'"
						/>
					</div>
				</div>
			</div>
			<gallery
				:image_input_name="'gallery'"
			/>
			<div class="buttons fixed">
				<nuxt-link to="/projects" class="cancel button half_width btn lg">Cancel</nuxt-link>
				<button type="submit" class="success button half_width btn lg pointer">Submit</button>
			</div>
		</ValidationObserver>
	</div>
</template>

<script>
	export default {
		components: {
			ImageHandlerContainer: () => import('~/components/file/ImageHandlerContainer'),
			Gallery: () => import('~/components/gallery/Gallery')
		},
		data: () => ({
			loaded: false,
			validation: {
				overview: null
			},
			char_limit: {
				overview: {
					value: 300,
					total: 300
				}
			},
			form_data: {
				name: '',
				overview: '<p> Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>',
				continent: '',
				location: ''
			},
			continents: [
				{
					name: 'Africa',
					code: 'AF'
				},
				{
					name: 'Antarctica',
					code: 'AN'
				},
				{
					name: 'Asia',
					code: 'AS'
				},
				{
					name: 'Europe',
					code: 'EU'
				},
				{
					name: 'North America',
					code: 'NA'
				},
				{
					name: 'Oceania',
					code: 'OC'
				},
				{
					name: 'South America',
					code: 'SA'
				}
			]
		}),
		methods: {
			submit () {
				this.$refs.form.validate().then(success => {
					if (!success) {
						this.validateWysiwyg(this, ['overview'])
						this.$scrollTo('.validate', {
							offset: -250
						})
						return
					} else {
						this.toggleModalStatus({ type: 'loader', status: true })

						let form_data = new FormData(document.getElementById('form'))
						form_data.append('overview', this.form_data.overview)

						this.$axios.$post('projects/create', form_data).then(({ res }) => {
							this.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
							this.$router.push(`/projects/${res.id}/update`)
						}).catch(err => {
							this.toggleModalStatus({ type: 'catcher', status: true, item: { errors: err.response.data.errors } })
						}).then(() => {
							setTimeout( () => {
								this.toggleModalStatus({ type: 'loader', status: false })
							}, 500)
						})
					}
					this.$nextTick(() => {
						this.$refs.form.reset()
					})
				})
			}
		},
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true

				setTimeout(() => {
					this.wysiwygPopulateCharLimit(this, ['overview'])
				}, 250)
			}, 500)
		},
		asyncData ({ store }) {
			store.commit('global/settings/populateTitle', { title: 'Projects' })
		}
	}
</script>
