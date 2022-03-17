<template lang="html">
	<div id="dashboard" v-if="loaded">
		<div class="form box mb">
			<div class="top_box">
				<h2>Default</h2>
				<div class="description" v-html="form.editor"></div>
			</div>
			<div class="bottom_box">
				<div class="group bordered filled">
					<label for="date">Date *</label>
					<v-ctk v-model="form.date" :format="'YYYY-MM-DD'" :only-date="true" :no-button="true" :formatted="'YYYY-MM-DD'" :no-label="true" :color="'#FF9000'" :id="'date'" :name="'date'" :label="'Select date'"></v-ctk>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: ({ $moment }) => ({
			loaded: false,
			form: {
				date: $moment().format('YYYY-MM-DD')
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
			store.commit('global/settings/populateTitle', { title: 'Date/Time Picker' })
		}
	}
</script>
