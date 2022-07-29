<template>
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/resources/year" class="cancel button pointer">
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
							<div id="switch" :class="(form_data.featured) ? 'success toggled' : 'cancel'">
								<label for="switch_featured" @click="toggle('featured')"></label>
								<input
									type="checkbox"
									name="switch_featured"
									id="switch_featured"
									:checked="form_data.featured"
								/>
								<span>Featured</span>
							</div>
						</div>
					</div>
					<div class="bottom_box">
						<ValidationProvider tag="div" class="group bordered" name="year" :rules="{ required: true, integer: true, min: 4, max:4 }" v-slot="{ errors }">
							<label for="year">Year *</label>
							<input type="number" class="input" name="year" autocomplete="off" placeholder="Enter year" v-model="form_data.year">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
					</div>
				</div>
				<div class="box mb">
					<div class="top_box">
						<h2>Year Image</h2>
					</div>
					<div class="bottom_box nmb">
						<div class="group">
							<image-handler-container
								:image_label="'Web view'"
								:input_name="'web_image'"
								:category="'web_image'"
							/>
						</div>
						<div class="group nmb">
							<image-handler-container
								:image_label="'Mobile view'"
								:input_name="'mobile_image'"
								:category="'mobile_image'"
								:data="[1]"
							/>
						</div>
					</div>
				</div>
				<div class="buttons fixed">
					<nuxt-link to="/resources/year" class="cancel button half_width btn lg">Cancel</nuxt-link>
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
		},
		data: ({ $moment }) => ({
			loaded: false,
			form_data: {
				year: null,
				featured: false,
			},
		}),	
		methods: {
			toggle (type) {
				this.form_data[type] ^= true
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
						let form_data = new FormData(document.getElementById('form'))

						form_data.append('featured', me.form_data.featured ? 1 : 0)

						me.$axios.post('v1/admin/resources/year/create', form_data).then(res => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
							me.$router.push(`/resources/year/${res.data.res.id}/update`)
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
		asyncData ({ $axios, store, $auth }) {
			store.commit('global/settings/populateTitle', { title: 'Year' })
		}
	}
</script>
