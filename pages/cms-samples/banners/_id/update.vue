<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/banners" class="cancel button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				<span>Back</span>
			</nuxt-link>
			<!-- <nuxt-link to="/banners/create" class="success button pointer ml ten">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
				<span>Add Another</span>
			</nuxt-link> -->
		</div>

		<ValidationObserver tag="div" ref="form">
			<form id="form" class="form mb seventy" @submit.prevent="submit()">
				<div class="box mb">
					<div class="top_box">
						<h2>Information</h2>
					</div>
					<div class="bottom_box">
						<ValidationProvider tag="div" class="group bordered" name="name" :rules="{ required: true }" v-slot="{ errors }">
							<label for="product_name">Name *</label>
							<input type="text" class="input" name="product_name" autocomplete="off" placeholder="Enter name" v-model="record.product_name">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
						<div class="group bordered">
							<label for="banner_description">Description *</label>
							<quill-editor
								class="editor banner_description"
								:value="form_data.banner_description"
								@change="updateWysiwyg($event, 'banner_description', true)"
								@update="updateWysiwyg($event, 'banner_description', true)"
							/>
							<transition name="slide"><span class="validate" v-if="validation.banner_description">The Description field is required</span></transition>
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
								:parent="record.id"
								:data="record.images"
								:input_name="'file'"
							/>
						</div>
					</div>
				</div>
				<div class="buttons fixed">
					<nuxt-link to="/banners" class="cancel button half_width btn lg">Cancel</nuxt-link>
					<button type="submit" class="success button half_width btn lg pointer">Submit</button>
				</div>
			</form>
		</ValidationObserver>
	</div>
</template>

<script>
	export default {
		components: {
			ImageHandlerContainer: () => import('~/components/file/ImageHandlerContainer')
		},
		data: () => ({
			loaded: false,
			record: null,
			validation: {
				banner_description: false
			},
			form_data: {
				banner_description: ''
			}
		}),
		methods: {
			submit () {
				this.$refs.form.validate().then(success => {
					if (!success) {
						this.validateWysiwyg(this, ['banner_description'])
						this.$scrollTo('.validate', {
							offset: -250
						})
						return
					} else {
						this.toggleModalStatus({ type: 'loader', status: true })

						let form_data = new FormData(document.getElementById('form'))
						form_data.append('_method', 'PATCH')
						form_data.append('banner_description', this.form_data.banner_description)

						this.$axios.$post('dummies/banner-data', form_data).then(data => {
							this.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been updated!' })
							this.$nuxt.refresh()
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
			}, 500)
		},
		asyncData ({ $axios, store }) {
			store.commit('global/settings/populateTitle', { title: 'Banners' })

			return $axios.$get('dummies/banner-data').then(({ bannerData }) => {
				return {
					record: bannerData,
					form_data: {
						banner_description: bannerData.banner_description
					}
				}
			}).catch(({ response: { data: { errors } } }) => {
				store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: errors } })
			})
		}
	}
</script>
