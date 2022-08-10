<template>
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/banner" class="cancel button pointer">
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
							<ValidationProvider tag="div" class="group bordered" name="title" :rules="{ required: true }" v-slot="{ errors }">
								<label for="title">Title *</label>
								<input type="text" class="input" name="title" autocomplete="off" placeholder="Enter title" v-model="form_data.title">
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
							<ValidationProvider tag="div" class="group select bordered nmb" name="type" :rules="{ required: true }" v-slot="{ errors }">
								<label for="type">Type *</label>
								<select class="input" name="type" v-model="form_data.type" @change="changeType()">
									<option value="" disabled selected>Select a type</option>
									<option value="bottom">Bottom</option>
									<option value="top">Top</option>
								</select>
								<div class="dd"></div>
								<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
							</ValidationProvider>
						</div>
						<div class="group bordered" name="title">
							<label for="title">Banner Link </label>
							<input type="text" class="input" name="link" autocomplete="off" placeholder="Enter Banner link" v-model="form_data.link">
						</div>
					</div>
				</div>
				<div class="box mb" v-if="show_images">
					<div class="top_box">
						<h2>Banner Image</h2>
					</div>
					<div class="bottom_box nmb">
						<div class="group">
							<image-handler-container
								:image_label="'Web view'"
								:input_name="'web_image'"
								:category="'web_image'"
								:dimension="{imageWidth: dimension.web.width ,imageHeight: dimension.web.length}"
							/>
						</div>
						<div class="group nmb">
							<image-handler-container
								:image_label="'Mobile view'"
								:input_name="'mobile_image'"
								:category="'mobile_image'"
								:data="[1]"
								:dimension="{imageWidth: dimension.mobile.width ,imageHeight: dimension.mobile.length}"
							/>
						</div>
					</div>
				</div>

				<div class="box mb">
					<div class="top_box inline">
						<h2>Has Download Button</h2>
						<div class="top_right">
							<!-- Action Items -->
							<div id="switch" :class="(form_data.has_download_button) ? 'success toggled' : 'cancel'">
								<label for="switch_download" @click="toggle('has_download_button')"></label>
								<input
									type="checkbox"
									name="switch_download"
									id="switch_publish"
									:checked="form_data.has_download_button"
								/>
								<span>Enable</span>
							</div>
						</div>
					</div>
					<div class="bottom_box"  v-if="form_data.has_download_button">
						<ValidationProvider tag="div" class="group bordered" name="button label" :rules="{ required: true }" v-slot="{ errors }">
							<label for="button_label">Button label *</label>
							<input type="text" class="input" name="download_label" autocomplete="off" placeholder="Enter Button label" v-model="form_data.download_label">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>

						<div class="bottom_box">
							<asset-container
								:extensions="['pdf', 'docx', 'doc', 'pptx', 'xlsx', 'jpeg', 'jpg', 'png']"
								:division="'whole'"
								:columns="''"
								:multiple="false"
								:type="'file'"
							/>
						</div>
					</div>
				</div>
				<div class="buttons fixed">
					<nuxt-link to="/banner" class="cancel button half_width btn lg">Cancel</nuxt-link>
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
			form_data: {
				title: null,
				type: '',
				link: null,
				has_download_button: false,
				download_label: null,
				publish: false,
			},
			show_images: false,
			dimension: {
				web: {
					width: null,
					length: null,
				},
				mobile: {
					width: null,
					length: null,
				}
			}
		}),
		methods: {
			toggle (type) {
				this.form_data[type] ^= true
			},
			submit () {
				const me = this
				me.$refs.form.validate().then(success => {
					if (!success || document.querySelectorAll('.validate').length > 0) {
						me.$scrollTo('.validate', {
							offset: -250
						})
						return
					} else {
						me.toggleModalStatus({ type: 'loader', status: true })
						let form_data = new FormData(document.getElementById('form'))

						form_data.append('published', me.form_data.publish ? 1 : 0)
						form_data.append('has_download', me.form_data.has_download_button ? 1 : 0)

						me.$axios.post('v1/admin/banner/create', form_data).then(res => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
							me.$router.push(`/banner/${res.data.res.id}/update`)
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
			changeType() {
				const me = this
				me.show_images = false
				switch (me.form_data.type) {
					case 'top':
						me.dimension.web = {
							width: 1174,
							length: 200
						}
						me.dimension.mobile = {
							width: 333,
							length: 250
						}
						setTimeout(() => {
							me.show_images = true
						}, 500)
						break
					case 'bottom':
						me.dimension.web = {
							width: 1280,
							length: 300
						}
						me.dimension.mobile = {
							width: 375,
							length: 250
						}
						setTimeout(() => {
							me.show_images = true
						}, 500)
						break
				}
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
			store.commit('global/settings/populateTitle', { title: 'Banner' })
		}
	}
</script>
