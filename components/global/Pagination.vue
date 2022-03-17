<template>
	<div id="pagination" v-if="last > 1">
		<div :class="`next pointer ${(current == 1) ? 'disabled' : ''}`" @click="getPage(null, current, last, 'prev')">
			<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
		</div>

		<div class="text">Page</div>

		<div class="page_number">
			<input type="number" class="input" v-model="page_number" :max="last" @blur="getPage($event)">
		</div>

		<div class="text">of {{ last }}</div>

		<div :class="`prev pointer ${(current == last) ? 'disabled' : ''}`" @click="getPage(null, current, last, 'next')">
			<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
		</div>
	</div>
</template>

<script>
	export default {
		props: {
			api_route: {
				type: String,
				required: true
			},
			current: {
				type: Number,
				default: 1
			},
			last: {
				type: Number,
				default: 1
			},
			query_params: {
				type: String,
				default: null
			}
		},
		data: () => ({
			page_number: 1
		}),
		methods: {
			getPage (event = null, current = null, last = null, type = null) {
				const me = this
				let call_api = true
				if (!event) {
					me.page_number = (type == 'prev') ? me.page_number - 1 : me.page_number + 1
					if (me.page_number > me.last) {
						call_api = false
					}
				} else {
					let target = parseInt(event.target.value)
					if (target != 0) {
						if (target <= me.last) {
							me.page_number = parseInt(event.target.value)
						} else {
							call_api = false
						}
					} else {
						call_api = false
					}
				}

				me.page_number = parseInt(me.page_number)

				let url = (me.query_params) ? `${me.api_route}?page=${me.page_number}${me.query_params}` : `${me.api_route}?page=${me.page_number}`

				if (call_api) {
					me.toggleModalStatus({ type: 'loader', status: true })

					if (me.$parent.has_search) {
						me.$axios.$post(url, me.$parent.form).then(({ res }) => {
							me.$parent.records = res
						}).catch(err => {
							me.toggleModalStatus({ type: 'catcher', status: true, item: { errors: err.response.data.errors } })
						}).then(() => {
							setTimeout( () => {
								me.toggleModalStatus({ type: 'loader', status: false })
							}, 500)
						})
					} else {
						me.$axios.$get(url).then(({ res }) => {
							me.$parent.records = res
						}).catch(err => {
							me.toggleModalStatus({ type: 'catcher', status: true, item: { errors: err.response.data.errors } })
						}).then(() => {
							setTimeout( () => {
								me.toggleModalStatus({ type: 'loader', status: false })
							}, 500)
						})
					}
				}
			}
		}
	}
</script>
