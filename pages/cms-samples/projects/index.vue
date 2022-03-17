<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/projects/create" class="success button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
				<span>Add Item</span>
			</nuxt-link>
		</div>

		<table class="table">
			<thead>
				<tr>
					<th class="stick">
						<div class="label">
							#
						</div>
					</th>
					<th class="stick">
						<div class="label">
							Name
						</div>
					</th>
					<th class="stick">
						<div class="label">
							Created At
						</div>
					</th>
					<th class="stick">
						<div class="label">
							Action
						</div>
					</th>
				</tr>
			</thead>
			<tbody v-if="records.res.data.length > 0">
				<tr v-for="(item, key) in records.res.data" :key="key">
					<td>{{ key + 1 }}</td>
					<td>
						<nuxt-link class="name" :to="`/projects/${item.id}/update`">
							{{ item.name }}
						</nuxt-link>
					</td>
					<td>{{ $moment(item.created_at).format('MMM DD, YYYY') }}</td>
					<td class="buttons" width="208px">
						<div class="wrapper">
							<nuxt-link :to="`/projects/${item.id}/update`" class="item info pointer">
								<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" class="icon"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
								<span>Edit</span>
							</nuxt-link>
							<div class="item ml cancel pointer" @click="toggleModalStatus({ type: 'delete_confirmation', status: true, item: { api: `projects/delete/${item.id}`, item_type: 'material' } })">
								<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" class="icon"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
								<span>Delete</span>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
			<tbody class="no_results" v-else>
				<tr>
					<td colspan="4">No Result(s) Found.</td>
				</tr>
			</tbody>
		</table>

		<!-- Pagination -->
		<pagination :api_route="records.res.path" :current="records.res.current_page" :last="records.res.last_page" />
	</div>
</template>

<script>
	export default {
		data: () => ({
			records: [],
			loaded: false
		}),
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		},
		asyncData ({ $axios, store }) {
			store.commit('global/settings/populateTitle', { title: 'Projects' })

			return $axios.$get('projects/list').then(data => {
				return {
					records: data
				}
			}).catch(err => {
				store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: err.response.data.errors } })
			})
		}
	}
</script>
