<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<nuxt-link to="/country/create" class="success button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
				<span>Add Country</span>
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
						<form class="content_middle form">
							<div :class="[ 'group bordered', (form.sample.length > 0) ? 'filled' : '' ]">
								<label for="sample">Input</label>
								<input type="text" class="input search" name="sample" autocomplete="off" v-model="form.sample">
							</div>
							<div :class="[ 'group select bordered', (form.sample_v2.length > 0) ? 'filled' : '' ]">
								<label for="sample_v2">Select</label>
								<select class="input" name="sample_v2" v-model="form.sample_v2">
									<option value="test" v-for="n in 5">Test</option>
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
						<div class="label pointer asc">
							Full Name
						</div>
					</th>
					<th class="stick sort">
						<div class="label pointer desc">
							Gender
						</div>
					</th>
					<th class="stick sort">
						<div class="label pointer">
							Birthday
						</div>
					</th>
					<th class="stick sort">
						<div class="label pointer">
							Contact Number
						</div>
					</th>
					<th class="stick sort">
						<div class="label pointer">
							Email Address
						</div>
					</th>
					<th class="stick">
						<div class="label">
							Action
						</div>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="(data, key) in 20" :key="key">
					<td>
						<div class="name pointer">
							Juan Dela Cruz
						</div>
					</td>
					<td>Male</td>
					<td>{{ $moment().format('MMM DD, YYYY') }}</td>
					<td>09012345678</td>
					<td>juandelacruz@gmail.com</td>
					<td class="buttons" width="210px">
						<div class="wrapper">
							<div class="item info pointer">
								<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" class="icon"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
								<span>Edit</span>
							</div>
							<div class="item ml cancel pointer">
								<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" class="icon"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
								<span>Delete</span>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false,
			filter: false,
			form: {
				sample: '',
				sample_v2: ''
			},
			records: [],
		}),
		methods: {

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
			store.commit('global/settings/populateTitle', { title: 'Country' })

			return $axios.$post('admin/country/get-country').then(({ res }) => {
				return {
					records: res
				}
			}).catch(({ response: { data: { errors } } }) => {
				store.commit('global/modal/toggleModalStatus', { type: 'catcher', status: true, item: { errors: errors } })
			})
		}
	}
</script>
