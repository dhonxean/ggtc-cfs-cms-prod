<template lang="html">
	<div id="dashboard" v-if="loaded">

		<div class="actions">
			<div class="success button pointer">
				<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
				<span>Add Item</span>
			</div>
		</div>

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
			loaded: false
		}),
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		},
		asyncData ({ store }) {
			store.commit('global/settings/populateTitle', { title: 'Table' })
		}
	}
</script>
