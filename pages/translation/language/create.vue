<template>
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/translation/language" class="cancel button pointer">
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
						<ValidationProvider tag="div" class="group bordered" name="name" :rules="{ required: true }" v-slot="{ errors }">
							<label for="name">Name *</label>
							<input type="text" class="input" name="name" autocomplete="off" placeholder="Enter language name" v-model="form_data.name">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
						<ValidationProvider tag="div" class="group bordered" name="language code" :rules="{ required: true }" v-slot="{ errors }">
							<label for="code">Language Code *</label>
							<input type="text" class="input" name="code" autocomplete="off" placeholder="Enter language code" v-model="form_data.code">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
					</div>
				</div>
				<div class="box">
					<div class="top_box">
						<h2>Asset</h2>
					</div>
					<div class="bottom_box nmb">
						<div class="group nmb">
							<image-handler-container
								:image_label="'Flag'"
								:input_name="'flag'"
								:category="'flag'"
							/>
						</div>
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
		},
		data: ({ $moment }) => ({
			loaded: false,
			form_data: {
				name: null,
				code: null,
			},
			enabled: false,
		}),	
		methods: {
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

						me.$axios.post('v2/admin/language/create', form_data).then(res => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
							me.$router.push(`/translation/language/${res.data.res.id}/update`)
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
			if (!me.enabled) {
				me.$nuxt.error({ statusCode: 404, message: 'Page not found' })
			}
			me.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				me.toggleModalStatus({ type: 'loader', status: false })
				me.loaded = true
			}, 500)
		},
		asyncData ({ $axios, store, $auth }) {
			let enabled = false
			if ($auth.user.role_id == 1) {
				enabled = true
			}
			store.commit('global/settings/populateTitle', { title: 'Language' })
			return {
				enabled: enabled
			}
		}
	}
</script>
