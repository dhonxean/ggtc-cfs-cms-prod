<template>
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/banner" class="cancel button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				<span>Back</span>
			</nuxt-link>
			<nuxt-link to="/banner/create" class="success ml ten button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
				<span>Add Another</span>
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
								<select class="input" name="type" v-model="form_data.type">
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
				<div class="box mb">
					<div class="top_box">
						<h2>Banner Image</h2>
					</div>
					<div class="bottom_box nmb">
						<div class="group">
							<image-handler-container
								:image_label="'Web view'"
								:input_name="'web_image'"
								:category="'web_image'"
								:parent="record.id"
								:data="form_data.web_image"
							/>
						</div>
						<div class="group nmb">
							<image-handler-container
								:image_label="'Mobile view'"
								:input_name="'mobile_image'"
								:category="'mobile_image'"
								:parent="record.id"
								:data="form_data.mobile_image"
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

						<div class="mb" v-if="record.banner_file">
							<div :class="[ (changed) ? 'cancel' : 'primary', 'button pointer' ]" @click="changed ^= true">{{ (changed) ? 'Cancel' : 'Change File' }}</div>
						</div>

						<div class="bottom_box">
							<div class="group bordered filled" v-if="record.banner_file && !changed">
								<div class="input">
									<a :href="record.banner_file.file_path" target="_blank">{{ record.banner_file.file_path }}</a>
								</div>
							</div>
							<asset-container
								:extensions="['pdf', 'docx', 'doc', 'pptx', 'xlsx', 'jpeg', 'jpg', 'png']"
								:division="'whole'"
								:columns="''"
								:multiple="false"
								:type="'file'"
								v-else
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
			record: [],
			changed: false,
			form_data: {
				title: null,
				type: '',
				link: null,
				has_download_button: false,
				download_label: null,
				publish: false,
				web_image: [],
				mobile_image: [],
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
						form_data.append('published', me.form_data.publish ? 1 : 0)
						form_data.append('has_download', me.form_data.has_download_button ? 1 : 0)

						me.$axios.$post(`v1/admin/banner/update/${me.$route.params.slug}`, form_data).then(({ res }) => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been updated!' })
							me.changed = false
							me.$nuxt.refresh()
						}).catch(({ response: { data: { errors } } }) => {
							me.toggleModalStatus({ type: 'catcher', status: true, item: { errors: errors } })
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
			store.commit('global/settings/populateTitle', { title: 'Banner' })

			return $axios.$get(`v1/admin/banner/info/${params.slug}`).then(({ res }) => {
				let banner = res,
					web_image = [],
					mobile_image = []
				
				banner.images.forEach((item, index) => {
					switch (item.category) {
						case 'web_image':
							web_image.push(item)
							break
						case 'mobile_image':
							mobile_image.push(item)
							break
					}
				})

				return {
					record: res,
					form_data: {
						title: res.title,
						type: res.type,
						link: res.link,
						has_download_button: res.has_download ? true : false,
						download_label: res.download_label,
						publish: res.published ? true : false,
						web_image: web_image,
						mobile_image: mobile_image,
					}
				}
			}).catch(({ response: { data: { errors } } }) => {
				error({ statusCode: 404, message: 'Page not found' })
			})
		}
	}
</script>
