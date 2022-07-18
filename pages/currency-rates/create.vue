<template>
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/company" class="cancel button pointer">
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
							<input type="text" class="input" name="name" autocomplete="off" placeholder="Enter company name" v-model="form_data.name">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
						<ValidationProvider tag="div" class="group bordered" name="Amount per 1 USD" :rules="{ required: true }" v-slot="{ errors }">
							<label for="amount">Amount per 1 USD (2 decimals only)*</label>
							<input type="number" step="0.01" class="input" name="amount" autocomplete="off" placeholder="Enter amount per 1 USD" v-model="form_data.amount">
							<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
						</ValidationProvider>
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
		data: ({ $moment }) => ({
			loaded: false,
			form_data: {
				name: null,
				amount: null,
			},
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
						let form_data = new FormData()

						form_data.append('name', me.form_data.name)
						form_data.append('amount', me.form_data.amount)

						me.$axios.post('v1/admin/currency-rate/create', form_data).then(res => {
							me.$store.dispatch('global/toast/addToast', { type: 'success', message: 'Item has been added!' })
							me.$router.push(`/currency-rates/${res.data.res.id}/update`)
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
		asyncData ({ $axios, store }) {
			store.commit('global/settings/populateTitle', { title: 'Currency Rates' })

		}
	}
</script>
