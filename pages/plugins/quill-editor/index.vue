<template lang="html">
	<div id="dashboard" v-if="loaded">
		<div class="box mb">
			<div class="top_box">
				<h2>Default</h2>
				<div class="description" v-html="form_data.editor"></div>
			</div>
			<div class="bottom_box">
				<quill-editor
					class="editor"
					v-model="form_data.editor"
					@change="updateWysiwyg($event, 'editor')"
				/>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		data: () => ({
			loaded: false,
			validation: {
				editor: false
			},
			form_data: {
				editor: '<p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>'
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
			store.commit('global/settings/populateTitle', { title: 'Quill Editor' })
		}
	}
</script>
