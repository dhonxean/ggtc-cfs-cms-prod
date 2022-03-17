<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/products" class="cancel button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				<span>Back</span>
			</nuxt-link>
		</div>

		<ValidationObserver tag="div" ref="form">
			<form id="form" class="form mb seventy" @submit.prevent="submit()">
				<div class="box mb">
					<div class="top_box">
						<h2>Information</h2>
					</div>
					<div class="bottom_box">
						<div class="group_inline two">
							<ValidationProvider tag="div" class="group bordered nmb" name="name" :rules="{ required: true }" v-slot="{ errors }">
								<label for="product_name">Name *</label>
								<input type="text" class="input" name="product_name" autocomplete="off" placeholder="Enter name" v-model="form_data.product_name">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group bordered nmb" name="price" :rules="{ required: true, regex: '^-?([0]{1}\.{1}[0-9]+|[1-9]{1}[0-9]*\.{1}[0-9]+|[0-9]+|0)$' }" v-slot="{ errors }">
								<label for="product_price">Price *</label>
								<input type="text" class="input" name="product_price" autocomplete="off" placeholder="Enter price" v-model="form_data.product_price">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
						<ValidationProvider tag="div" class="group bordered multi" name="tags" :rules="{ required: true }" v-slot="{ errors }">
							<label for="tags">Tags *</label>
							<multiselect
								placeholder="Search a tags"
								id="tags"
								label="name"
								track-by="id"
								:options="tags"
								:multiple="true"
								:close-on-select="true"
								:hide-selected="true"
								v-model="form_data.tags">
							</multiselect>
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
						<div class="group bordered">
							<label for="product_description">Description *</label>
							<quill-editor
								class="editor product_description"
								:value="form_data.product_description"
								@change="updateWysiwyg($event, 'product_description')"
							/>
							<transition name="slide"><span class="validate" v-if="validation.product_description">The Description field is required</span></transition>
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
								:input_name="'file'"
							/>
						</div>
					</div>
				</div>
				<div class="buttons fixed">
					<nuxt-link to="/products" class="cancel button half_width btn lg">Cancel</nuxt-link>
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
			tags: [],
			validation: {
				product_description: false
			},
			form_data: {
				product_name: '',
				product_price: '',
				product_description: '',
				tags: []
			}
		}),
		methods: {
			submit () {
				this.$refs.form.validate().then(success => {
					if (!success) {
						this.validateWysiwyg(this, ['product_description'])
						this.$scrollTo('.validate', {
							offset: -250
						})
						return
					} else {
						this.toggleModalStatus({ type: 'loader', status: true })

						let form_data = new FormData(document.getElementById('form'))
						form_data.append('product_description', this.form_data.product_description)
						if (this.form_data.tags.length > 0){
							this.form_data.tags.forEach((item, index) => {
								form_data.append('tag[]', item.id)
							})
						}

						this.$axios.$post('dummies/products', form_data).then(({ product }) => {
							this.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
							this.$router.push(`/products/${product.id}/update`)
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
			store.commit('global/settings/populateTitle', { title: 'Products' })

			return $axios.$get('dummies/tags').then(({ tags }) => {
				let temp_tags = []
				for (let i = 0, len = tags.length; i < len; i++) {
					let item = {
						id: tags[i].id,
						name: tags[i].name
					}
					temp_tags[i] = item
				}
				return {
					tags: temp_tags
				}
			}).catch(({ response: { data: { errors } } }) => {
				store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: errors } })
			})
		}
	}
</script>
