<template lang="html">
	<div id="dashboard" v-if="loaded">
		<div class="form box mb">
			<div class="top_box">
				<h2>Default</h2>
				<div class="description" v-html="form.editor"></div>
			</div>
			<div class="bottom_box">
				<div class="group bordered filled multi">
					<label for="items">Items</label>
					<multiselect placeholder="Search a item" id="items" label="name" track-by="id"
						:options="items"
						:multiple="true"
						:close-on-select="true"
						:hide-selected="true"
						v-model="form.items">
					</multiselect>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false,
			items: [
				{
					id: 1,
					name: 'Sample'
				},
				{
					id: 2,
					name: 'Sample 1'
				},
				{
					id: 3,
					name: 'Sample 2'
				},
				{
					id: 4,
					name: 'Sample 3'
				},
				{
					id: 5,
					name: 'Sample 4'
				},
				{
					id: 6,
					name: 'Sample 5'
				}
			],
			form: {
				items: []
			}
		}),
		mounted () {
			this.toggleModalStatus({ type: 'loader', status: true })
			setTimeout( () => {
				this.toggleModalStatus({ type: 'loader', status: false })
				this.loaded = true
			}, 500)
		},
		asyncData ({ store }) {
			store.commit('global/settings/populateTitle', { title: 'Multiselect' })
		}
	}
</script>
