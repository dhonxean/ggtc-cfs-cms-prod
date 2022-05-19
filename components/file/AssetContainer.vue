<template lang="html">
	<ValidationObserver tag="div" class="group">
		<ValidationProvider name="File" ref="provider" v-slot="{ errors, validate }" :rules="{ required: required, image: (type == 'image') ? true : false, size: 200000, ext: extensions}">
			<div class="file">
				<input type="file" :name="file_name" :id="`files${unique}`" :multiple="multiple" :accept="populateExtensions" class="o_hidden" @change="getFiles($event)">
				<label :for="`files${unique}`" @dragover.prevent @dragenter.prevent @drop.prevent="dropFiles($event)">
					<p>Drag a {{ type }} here<br>
					or <b class="pointer">browse</b> to upload.</p>
				</label>
			</div>
			<div :class="[ 'preview_image', columns, (populateFiles.length > 3) ? 'scrollable' : '' ]" v-if="files.length > 0">
				<div :class="[ 'preview', division, (type == 'file') ? 'big' : '' ]" v-for="(data, key) in populateFiles" :key="key" :data-vv-scope="`file_form_${key}`">
					<img src="" :id="`preview_image${key}`" v-if="type == 'image'" />
					<div class="image_close" @click="removeTempFiles(key)">×</div>
					<div class="item mb twenty">
						<span v-line-clamp="1">{{ data.name }}</span>
					</div>
				</div>
			</div>
			<div class="disclaimer">
				<div class="violator">Drag and drop {{ type }}.<br>
				Maximum, file size is 20MB<br>
				Supported file formats: {{ populateExtensions }}</div>
			</div>
			<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
		</ValidationProvider>
	</ValidationObserver>
</template>

<script>
	export default {
		props: {
			unique: {
				type: Number,
				default: 0
			},
			multiple: {
				type: Boolean,
				default: true
			},
			required: {
				type: Boolean,
				default: true
			},
			file_name: {
				type: String,
				default: 'file[]'
			},
			type: {
				type: String,
				default: 'image'
			},
			columns: {
				type: String,
				default: 'four'
			},
			division: {
				type: String,
				default: ''
			},
			extensions: {
				type: Array/Object,
				default: () => {
					return ['jpeg', 'jpg', 'png']
				}
			}
		},
		data: () => ({
			files: []
		}),
		computed: {
			populateFiles () {
				let result
				result = this.files
				return result
			},
			populateExtensions () {
				let result = ''
				this.extensions.forEach((item, key) => {
					if (key != (this.extensions.length - 1)) {
						result += `.${item}, `
					} else {
						result += `.${item}`
					}
				})

				return result
			}
		},
		methods: {
			removeTempFiles (unique) {
					const data_transfer = new DataTransfer(),
					target_file = document.getElementById(`files${this.unique}`),
					{ files } = target_file

				for (let i = 0; i < files.length; i++) {
					const file = files[i]
					if (unique !== i) data_transfer.items.add(file)
					target_file.files = data_transfer.files
					this.files = target_file.files
					this.$parent.files = target_file.files
				}

				if (this.type == 'image') {
					let element = document.getElementById(`files${this.unique}`)
					for (let i = 0; i < element.files.length; i++) {

						let reader = new FileReader()
						reader.onload = function () {
							let image = document.getElementById(`preview_image${i}`)
							image.src = reader.result
						}
						reader.readAsDataURL(element.files[i])
					}
				}
			},
			/**
			 * manipulate files
			 */
			getFiles (event) {
				this.$refs.provider.validate(event).then(success => {
					if (success) {
						let element = document.getElementById(`files${this.unique}`)

						if (event.target.files.length > 0) {
							this.files = []
							this.$parent.files = []
							for (let i = 0; i < element.files.length; i++) {

								this.files.push(element.files[i])

								if (this.type == 'image') {
									let reader = new FileReader()
									reader.onload = function () {
										let image = document.getElementById(`preview_image${i}`)
										image.src = reader.result
									}
									reader.readAsDataURL(element.files[i])
								}
							}
						}
					}
				})
			},
			/**
			 * drag and drop event files
			 * @param  {[object]} event [event handler]
			 */
			dropFiles (event) {
				let target = event.dataTransfer.files,
					target_file = document.getElementById(`files${this.unique}`)

				const data_transfer = new DataTransfer()
				let length = (this.multiple) ? target.length : 1

				for (let i = 0; i < length; i++) {
					this.$refs.provider.validate(target[i]).then(success => {
						if (success) {
							data_transfer.items.add(target[i])

							target_file.files = data_transfer.files
							this.files = target_file.files
							this.$parent.files = target_file.files

							if (this.type == 'image') {
								let reader = new FileReader()
								reader.onload = function () {
									let image = document.getElementById(`preview_image${i}`)
									image.src = reader.result
								}
								reader.readAsDataURL(target[i])
							}
						}
					})
				}
			}
		}
	}
</script>
