<template>
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/resources/files" class="cancel button pointer">
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
						<ValidationProvider tag="div" class="group bordered" name="title" :rules="{ required: true }" v-slot="{ errors }">
							<label for="title">Title *</label>
							<input type="text" class="input" name="file_title" autocomplete="off" placeholder="Enter title" v-model="form_data.file_title">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
						<ValidationProvider tag="div" class="group select bordered nmb" name="year" :rules="{ required: true }" v-slot="{ errors }">
							<label for="type">Year *</label>
							<select class="input" name="year_id" v-model="form_data.year_id">
								<option value="" disabled selected>Select a year</option>
								<option :value="item.id" v-for="(item, index) in years" :key="index">{{ item.year }}</option>
							</select>
							<div class="dd"></div>
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
					</div>
				</div>
				<div class="box mb">
					<div class="top_box inline">
						<h2>File</h2>
					</div>
					<div class="bottom_box">
						<div class="bottom_box">
							<asset-container
								:extensions="['pdf']"
								:division="'whole'"
								:columns="''"
								:multiple="false"
								:type="'file'"
							/>
						</div>
					</div>
				</div>
				<div class="buttons fixed">
					<nuxt-link to="/resources/files" class="cancel button half_width btn lg">Cancel</nuxt-link>
					<button type="submit" class="success button half_width btn lg pointer">Submit</button>
				</div>
			</form>
		</ValidationObserver>
	</div>
</template>

<script>
	export default {
		components: {
			AssetContainer: () => import('~/components/file/AssetContainer')
		},
		data: ({ $moment }) => ({
			loaded: false,
			years: [],
			form_data: {
				file_title: null,
				year_id: '',
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

						me.$axios.post('v1/admin/resources/resource/create', form_data).then(res => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
							me.$router.push(`/resources/files/${res.data.res.id}/update`)
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
			store.commit('global/settings/populateTitle', { title: 'Files' })

			return $axios.$get(`v1/admin/resources/year/list`).then(({ res }) => {
				return {
					years: res
				}
			}).catch(({ response: { data: { errors } } }) => {
				error({ statusCode: 404, message: 'Page not found' })
			})
		}
	}
</script>
