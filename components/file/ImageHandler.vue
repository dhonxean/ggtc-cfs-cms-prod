<template>
	<ValidationObserver tag="div" v-if="enabled" :vid="`image_form_${unique}`">
		<ValidationProvider tag="div" :class="[ 'group', (showTags) ? '' : ($parent.multiple) ? '' : 'nmb' ]" name="file" :vid="`image_form_${unique}.${input_name}[]`" ref="provider" v-slot="{ errors, validate }" :rules="file_rules">
			<input type="file" class="action_image" accept=".jpeg, .jpg, .png" :id="`${input_name}${unique}`" :name="`${input_name}[]`" ref="file" @change="getFile($event)">
			<label class="action_image_label" :for="`${input_name}${unique}`">Choose File</label>
			<div v-if="$parent.showCloser && multiple" class="action_image_remove" @click="removeImage($event, unique, item.id, parent)">Remove</div>
			<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
		</ValidationProvider>

		<input type="hidden" :name="`${input_name}_id[]`" v-model="dataImage.id">
		<input type="hidden" :name="`${input_name}_category[]`" v-model="category">

		<div class="form_tags_group" v-if="showTags">
			<div class="preview_group">
				<img :id="`preview_${input_name}_${unique}`" :src="`${(item != null) ? item.path : ''}`" />
			</div>
			<div class="tags_group">
				<ValidationProvider tag="div" class="group bordered" name="title" :rules="{ required: true, regex: '^[a-zA-Z0-9\-_ |\_]*$', max: 50 }" :vid="`image_form_${unique}.${input_name}[]`" v-slot="{ errors }">
					<label :for="`image_title${unique}`">Title <span>*</span></label>
					<input type="text" :name="`${input_name}_title[]`" :id="`image_title${unique}`" autocomplete="off" class="input" v-model="dataImage.title">
					<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
				</ValidationProvider>
				<ValidationProvider tag="div" :class="[ 'group bordered', (show_sequence) ? '' : (show_image_mode || show_image_caption) ? '' : 'nmb' ]" name="alt" :vid="`image_form_${unique}.file_alt[]`" :rules="{ required: true, regex: '^[a-zA-Z0-9\_\-]*$', max: 50 }" v-slot="{ errors }">
					<label :for="`image_alt${unique}`">Alt <span>*</span></label>
					<input type="text" :name="`${input_name}_alt[]`" :id="`image_alt_${unique}`" autocomplete="off" class="input" v-model="dataImage.alt">
					<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
				</ValidationProvider>
				<template v-if="show_sequence">
					<ValidationProvider tag="div" :class="[ 'group bordered', (!show_image_mode || !show_image_caption) ? '' : 'nmb' ]" name="sequence" :rules="{ required: true, numeric: true, min_value: 1, max_value: 99 }" :vid="`image_form_${unique}.file_sequence[]`" v-slot="{ errors }">
						<label :for="`image_sequence${unique}`">Sequence <span>*</span></label>
						<input type="text" :name="`${input_name}_sequence[]`" :id="`image_sequence_${unique}`" autocomplete="off" class="input" v-model="dataImage.sequence">
						<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
					</ValidationProvider>
				</template>
				<template v-if="show_image_caption">
					<ValidationProvider tag="div" :class="[ 'group bordered', (show_image_mode) ? '' : 'nmb' ]" name="caption" :rules="{ required: true }" :vid="`image_form_${unique}.file_caption[]`" v-slot="{ errors }">
						<label :for="`image_caption${unique}`">Caption <span>*</span></label>
						<textarea class="input" rows="8" :name="`${input_name}_caption[]`" v-model="dataImage.caption"></textarea>
						<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
					</ValidationProvider>
				</template>
				<template v-if="show_image_mode">
					<ValidationProvider tag="div" class="group select bordered" :name="`${image_label} Mode`" :rules="{ required: true }" :vid="`image_form_${unique}.file_mode[]`" v-slot="{ errors }">
						<label  :for="`image_mode_${unique}`">Mode <span>*</span></label>
						<select class="input" :name="`${inpute_name}_mode[]`" :id="`image_mode_${unique}`" v-model="dataImage.mode">
							<option value="" disabled selected>Select a mode</option>
							<option value="dark">Dark</option>
							<option value="light">Light</option>
						</select>
						<div class="dd"></div>
						<transition name="slide"><span class="validate" v-if="errors.length > 0">{{ errors[0] }}</span></transition>
					</ValidationProvider>
				</template>
			</div>
		</div>
		<!-- Delete Confirmation -->
		<delete-confirmation
			ref="confirmation"
			:item="'image'"
			:for_asset="true"
			:api="api"
		/>
	</ValidationObserver>
</template>

<script>
	import DeleteConfirmation from '~/components/file/modal/DeleteConfirmation'

	export default {
		props: {
			input_name: {
				type: String,
				default: 'file'
			},
			required: {
				type: Boolean,
				default: true
			},
			show_image_mode: {
				type: Boolean,
				default: false
			},
			show_image_caption: {
				type: Boolean,
				default: false
			},
			show_sequence: {
				type: Boolean,
				default: false
			},
			item: {
				default: 0
			},
			unique: {
				type: Number
			},
			parent: {
				type: Number,
				default: 0
			},
			table_name: {
				type: String,
				default: 'images'
			},
			image_label: {
				type: String,
				default: 'Image'
			},
			category: {
				type: String,
				default: 'image'
			},
			dimension: {
				type: Object,
				default: function () {
					return {
						imageWidth: 0,
						imageHeight: 0
					}
				}
			}
		},
		components: {
			DeleteConfirmation
		},
		data () {
			return {
				file_rules: { required: true },
				api: '',
				showTags: false,
				enabled: true,
				dataImage: {
					id: 0,
					title: '',
					alt: '',
					sequence: 0,
					mode: 'dark'
				},
				populated: false,
				image_interval: null
			}
		},
		methods: {
			getFile (event) {
				this.$refs.provider.validate(event).then(success => {
					if (success) {
						let element = event.target
						if (element.files[0]) {
							element.nextElementSibling.innerText = element.files[0].name
							this.showTags = true
							this.$parent.files[this.unique] = this.$refs.file.files[0]
						}
						if (element.files && element.files[0]) {
							let reader = new FileReader()
							reader.onload = () => {
								let image = document.getElementById(`preview_${this.input_name}_${this.unique}`)
								image.src = reader.result
							}
							setTimeout( () => {
								reader.readAsDataURL(element.files[0])
								if (this.$parent.$parent.collapsible) {
									let target = document.getElementById('item_1')
									target.style.height = `${target.scrollHeight}px`
								}
							}, 10)
						}
					}
				})
			},
			removeImage (event, unique, key, parent) {
				let me = this
				this.$parent.files.forEach((file, index) => {
					if (unique == index) {
						this.$parent.files.splice(index, 1)
					}
				})
				if (this.item == 0) {
					this.enabled = false
					this.$parent.determineIfShowCloser()
				} else {
					setTimeout( () => {
						this.api = `images/${key}`
						this.$refs.confirmation.opened = true
					}, 10)
				}
			},
			checkRules () {
				if (this.required) {
					if (this.dimension.imageWidth == 0) {
						this.file_rules = { required: (this.dataImage.id) ? false : true, image: true, ext: ['jpeg', 'jpg', 'png', 'svg'], size: 20000 }
					} else {
						this.file_rules = { required: (this.dataImage.id) ? false : true, image: true, ext: ['jpeg', 'jpg', 'png', 'svg'], size: 20000, dimensions: [this.dimension.imageWidth, this.dimension.imageHeight] }
					}
				} else {
					if (this.dimension.imageWidth == 0) {
						this.file_rules = { image: true, ext: ['jpeg', 'jpg', 'png', 'svg'], size: 20000 }
					} else {
						this.file_rules = { image: true, ext: ['jpeg', 'jpg', 'png', 'svg'], size: 20000, dimensions: [this.dimension.imageWidth, this.dimension.imageHeight] }
					}
				}

				if (this.item) {
					this.populated = true
				}
			}
		},
		mounted () {
			this.image_interval = setInterval( () => {
				if (!this.populated) {
					if (this.item) {
						this.dataImage.id = (this.item.id != null) ? this.item.id : 0
						this.dataImage.title = (this.item.title) ? this.item.title : ''
						this.dataImage.alt = (this.item.alt) ? this.item.alt : ''
						this.dataImage.sequence = (this.item.sequence) ? this.item.sequence : 0
						this.dataImage.caption = (this.item.caption) ? this.item.caption : ''
						this.dataImage.mode = (this.item.file_mode) ? this.item.file_mode : 'dark'
						this.showTags = (this.item && this.item.id) ? true : false
					}
					this.checkRules()
				} else {
					clearInterval(this.image_interval)
				}
			}, 500)
		}
	}
</script>
