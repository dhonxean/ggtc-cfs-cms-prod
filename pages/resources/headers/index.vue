<template>
	<div id="dashboard" v-if="loaded">
		<ValidationObserver tag="div" ref="form">
			<form id="form" class="form mb seventy" @submit.prevent="submit()">
				<div class="box mb">
					<div class="top_box">
						<h2>Resources Headers</h2>
					</div>
					<div class="bottom_box">
						<ValidationProvider tag="div" class="group bordered" name="title" :rules="{ required: true }" v-slot="{ errors }">
							<label for="title">Title *</label>
							<input type="text" class="input" name="title" autocomplete="off" placeholder="Enter title" v-model="form_data.title">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
						<div class="group bordered">
							<label for="description">Description *</label>
							<quill-editor
								class="editor description"
								:value="form_data.description"
								@change="updateWysiwyg($event, 'description')"
							/>
							<transition name="slide"><span class="validate" v-if="validation.description">The Description field is required</span></transition>
						</div>
					</div>
				</div>
				<div class="buttons fixed">
					<nuxt-link to="/resources/headers" class="cancel button half_width btn lg">Cancel</nuxt-link>
					<button type="submit" class="success button half_width btn lg pointer">Submit</button>
				</div>
			</form>
		</ValidationObserver>
	</div>
</template>

<script>
	export default {
		data: ({ $moment }) => ({
			loaded: false,
			validation: {
				description: false,
			},
			form_data: {
				title: null,
				description: null,
			},
		}),	
		methods: {
			submit () {
				const me = this
				me.$refs.form.validate().then(success => {
					if (!success) {
						me.validateWysiwyg(me, ['description'])
						me.$scrollTo('.validate', {
							offset: -250
						})
						return
					} else {
						me.toggleModalStatus({ type: 'loader', status: true })
						let form_data = new FormData(document.getElementById('form'))
						form_data.append('description', me.form_data.description)
						me.$axios.post('v1/admin/resources/content/create-update', form_data).then(res => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
							me.$nuxt.refresh()
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
			store.commit('global/settings/populateTitle', { title: 'Headers' })

			return $axios.$get(`v1/admin/resources/content/info`).then(({ res }) => {
				let title = res != null ? res.title : null
				let description = res != null ? res.description : null
				return {
					form_data: {
						title: title,
						description: description,
					}
				}
			}).catch(({ response: { data: { errors } } }) => {
				error({ statusCode: 404, message: 'Page not found' })
			})
		}
	}
</script>
