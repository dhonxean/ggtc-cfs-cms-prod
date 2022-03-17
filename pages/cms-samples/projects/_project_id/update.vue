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
						<input type="text" class="input" name="name" autocomplete="off" placeholder="Enter name" v-model="record.name">
						<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
					</ValidationProvider>
					<div class="group_inline two">
						<ValidationProvider tag="div" class="group bordered nmb" name="year" :rules="{ required: true }" v-slot="{ errors }">
							<label for="location">Location *</label>
							<input type="text" class="input" name="location" autocomplete="off" placeholder="Enter location" v-model="record.location">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
						<ValidationProvider tag="div" class="group select bordered nmb" name="continent" :rules="{ required: true }" v-slot="{ errors }">
							<label for="continent">Continent *</label>
							<select class="input" name="continent" autocomplete="off"v-model="record.continent">
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
							@change="updateWysiwyg($event, 'overview', true)"
						/>
						<transition name="slide"><span class="validate" v-if="validation.overview">The overview field is required</span></transition>
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
							:parent="record.id"
							:data="form_data.main_images"
						/>
					</div>
				</div>
			</div>

			<gallery
				:image_input_name="'gallery'"
				:records="form_data.gallery"
				:update="true"
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
			record: null,
			char_limit: {
				overview: {
					value: 300,
					total: 300
				}
			},
			form_data: {
				main_images: [],
				gallery: [],
				overview: ''
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

				this.wysiwygPopulateCharLimit(this, ['overview'])
			}, 500)
		},
		asyncData ({ store, $axios, params }) {
			store.commit('global/settings/populateTitle', { title: 'Projects' })

			return $axios.$get(`projects/view/${params.project_id}`).then(({ res }) => {
				let main_images = [],
					gallery = []
				res.images.forEach((item, i) => {
					switch (item.category) {
						case 'main_image':
							main_images.push(item)
							break
						case 'gallery':
							gallery.push({
								id: item.id,
								show: true,
								type: 'image',
								record: item,
								sequence: item.sequence
							})
							break
					}
				})

				res.videos.forEach((item, i) => {
					gallery.push({
						id: item.id,
						show: true,
						type: 'video',
						record: {
							url: item.url,
							type: item.type,
							sequence: item.sequence,
							image: [
								{
									id: 0
								}
							]
						},
						sequence: item.sequence
					})
				})

				gallery.sort((a, b) => parseInt(a.sequence) - parseInt(b.sequence))

				return {
					record: res,
					form_data: {
						gallery: gallery,
						main_images: main_images,
						overview: res.overview
					}
				}
			}).catch(({ response: { data: { errors } } }) => {
				store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: errors } })
			})
		}
	}
</script>
