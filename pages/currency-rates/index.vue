<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/currency-rates/create" class="success button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
				<span>Add Currency</span>
			</nuxt-link>
		</div>

		<div class="action_filter pointer" @click="filter = true">
			<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#FFF" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-filter"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon></svg>
		</div>

		<transition name="fade">
			<div id="filter" v-if="filter">
				<div class="wrapper">
					<div class="content">
						<div class="close pointer" @click="filter = false">×</div>
						<div class="content_top">
							<h2>Filter</h2>
						</div>
						<form class="content_middle form" @submit.prevent="fetchData()">
							<div :class="[ 'group bordered', (form.keyword.length > 0) ? 'filled' : '' ]">
								<label for="sample">Search</label>
								<input type="text" class="input search" name="keyword" autocomplete="off" v-model="form.keyword">
							</div>
							<div :class="[ 'group select bordered', (form.sort_by.length > 0) ? 'filled' : '' ]">
								<label for="sample_v2">Sort By</label>
								<select class="input" name="sort_by" v-model="form.sort_by">
									<option value="name">Curreny Name</option>
									<option value="amount">amount</option>
									<option value="created_at">Created At</option>
								</select>
								<div class="dd"></div>
							</div>
							<div :class="[ 'group select bordered', (form.order_type.length > 0) ? 'filled' : '' ]">
								<label for="sample_v2">Order By</label>
								<select class="input" name="order_type" v-model="form.order_type">
									<option value="asc">Ascending</option>
									<option value="desc">Descending</option>
								</select>
								<div class="dd"></div>
							</div>
							<div class="buttons">
								<button type="submit" class="success button pointer">Search</button>
							</div>
						</form>
					</div>
					<div class="backdrop" @click="filter = false"></div>
				</div>
			</div>
		</transition>

		<table class="table">
			<thead>
				<tr>
					<th class="stick sort">
						<div :class="`label pointer ${sort.name ? 'asc' : 'desc'}`" @click="sort_table('name')">
							Currency Name
						</div>
					</th>
					<th class="stick sort">
						<div :class="`label pointer ${sort.amount ? 'asc' : 'desc'}`" @click="sort_table('amount')">
							Amount
						</div>
					</th>
					<th class="stick sort">
						<div :class="`label pointer ${sort.created_at ? 'asc' : 'desc'}`" @click="sort_table('created_at')">
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
			<tbody v-if="records.data.length > 0">
				<tr v-for="(data, key) in records.data" :key="key">
					<td>
						<nuxt-link :to="`/currency-rates/${data.id}/update`" class="name pointer">
							{{ data.name }}
						</nuxt-link>
					</td>
					<td>{{ data.amount }}</td>
					<td>{{ $moment(data.created_at).format('MMM DD YYYY') }}</td>
					<td class="buttons" width="210px">
						<div class="wrapper">
							<nuxt-link :to="`/currency-rates/${data.id}/update`" class="item info pointer">
								<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" class="icon"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
								<span>Edit</span>
							</nuxt-link>
							<div class="item ml cancel pointer" @click="toggleModalStatus({ type: 'delete_confirmation', status: true, item: { api: `admin/currency-rate/delete/${data.id}`, item_type: 'currency' } })">
								<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" class="icon"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
								<span>Delete</span>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
			<tbody class="no_results" v-else>
				<tr>
					<td colspan="5">No Result(s) Found.</td>
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
			form: {
				keyword: '',
				sort_by: 'name',
				order_type: 'asc',
			},
			sort: {
				name: true, //true = asc | false = desc
				amount: false,
				created_at: false,
			},
			has_search: true,
			records: [],
		}),
		methods: {
			sort_table (sort_name){
				const me = this
				me.sort[sort_name] = !me.sort[sort_name]
				me.form.sort_by = sort_name
				me.form.order_type = me.sort[sort_name] ? 'asc' : 'desc'
				me.fetchData()
			},
			fetchData() {
				const me = this
				me.toggleModalStatus({ type: 'loader', status: true })
				me.$axios.$post('admin/currency-rate/get-all-currency', me.form).then(({ res }) => {
					me.records = res
				}).catch(({ response: { data: { errors } } }) => {
					me.toggleModalStatus({ type: 'catcher', status: true, item: { errors: errors } })
				}).then(() => {
					setTimeout( () => {
						me.toggleModalStatus({ type: 'loader', status: false })
					}, 500)
				})
			}
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
		asyncData ({ $axios, store }) {
			store.commit('global/settings/populateTitle', { title: 'Currency Rates' })
			let form_data = {
				sort_by: 'name',
				order_type: 'asc'
			}
			return $axios.$post('admin/currency-rate/get-all-currency', form_data).then(({ res }) => {
				return {
					records: res
				}
			}).catch(({ response: { data: { errors } } }) => {
				store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: errors } })
			})
		}
	}
</script>
