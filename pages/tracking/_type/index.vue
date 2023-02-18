<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/tracking" class="cancel button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
				<span>Back</span>
			</nuxt-link>
		</div>

		<table class="table">
			<thead>
				<tr>
					<template v-if="$route.params.type == 'sign-up'">
						<th class="stick">
							<div class="label">
								Name
							</div>
						</th>
						<th class="stick">
							<div class="label">
								Email Address
							</div>
						</th>
					</template>
					<th class="stick">
						<div class="label">
							Country
						</div>
					</th>
					<th class="stick">
						<div class="label">
							Created At
						</div>
					</th>
				</tr>
			</thead>
			<tbody v-if="records.data.length > 0">
				<tr v-for="(data, key) in records.data" :key="key">
					<template v-if="$route.params.type == 'sign-up'">
						<td>{{ data.name}}</td>
						<td>{{ data.email}}</td>
					</template>
					<td>{{ data.country ? data.country.name : 'N/A'}}</td>
					<td>{{ $moment(data.created_at).format('MMM DD YYYY') }}</td>
				</tr>
			</tbody>
			<tbody class="no_results" v-else>
				<tr>
					<td colspan="6">No Result(s) Found.</td>
				</tr>
			</tbody>
		</table>

		<div class="bottom_box">
			<pagination :api_route="records.path" :current="records.current_page" :last="records.last_page" />
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false,
			filter: false,
			records: [],
		}),
		methods: {

		},
		mounted () {
			const me = this
			console.log(me.records)
			me.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				me.toggleModalStatus({ type: 'loader', status: false })
				me.loaded = true
			}, 500)
		},
		asyncData ({ $axios, store, params }) {
			store.commit('global/settings/populateTitle', { title: 'Tracking' })
			return $axios.$get(`v1/admin/tracking/list?type=${params.type}`).then(({ res }) => {
				return {
					records: res
				}
			}).catch(({ response: { data: { errors } } }) => {
				store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: errors } })
			})
		}
	}
</script>
