<template>
	<div :class="[ 'form_image_group', ($refs.showTags) ? 'mb' : '' ]">
		<label>{{ image_label }} <span>{{ (required) ? '*' : '' }}</span> <strong v-if="dimension.imageWidth != 0">( Max: 2MB: Dimension: {{ dimension.imageWidth }} x {{ dimension.imageHeight }} )</strong></label>
		<image-handler
			v-for="(image, key) in images"
			ref="imagePicker"
			:key="key"
			:unique="(image.id == 0 || image.id) ? image.id : image"
			:item="image"
			:image_label="image_label"
			:show_image_mode="show_image_mode"
			:show_image_caption="show_image_caption"
			:show_sequence="show_sequence"
			:category="category"
			:parent="parent"
			:table_name="table_name"
			:required="required"
			:dimension="dimension"
			:input_name="input_name"
		/>
		<!-- <button type="button" class="action_image_add" v-if="multiple" @click="addImage()">Add Image</button> -->
	</div>
</template>

<script>
	export default {
		props: {
			input_name: {
				type: String,
				default: 'file'
			},
			image_label: {
				type: String,
				default: 'Image'
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
			multiple: {
				type: Boolean,
				default: false
			},
			required: {
				type: Boolean,
				default: true
			},
			data: {
				type: Object/Array,
				default: ''
			},
			parent: {
				type: Number,
				default: 0
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
			ImageHandler: () => import('~/components/file/ImageHandler')
		},
		data: () => ({
			table_name: 'images',
			files: [],
			images: [0],
			ctr: 0,
			showCloser: false
		}),
		methods: {
			addImage () {
				this.ctr += 1
				this.images.push(this.ctr)
				this.determineIfShowCloser()
			},
			determineIfShowCloser () {
				let enabledCount = 0
				setTimeout(() => {
					this.$refs.imagePicker.forEach((item, index) => {
						if (item.enabled == true) {
							enabledCount++
						}
					})
					this.showCloser = (enabledCount > 1) ? true : false
				}, 10)
			}
		},
		mounted () {
			let ctr = 0
			setInterval( () => {
				if (ctr < 1 && this.data != '') {
					this.images = this.data
					this.data.forEach((item, index) => {
						this.files.push(null)
					})
					ctr++
				}
				this.determineIfShowCloser()
			}, 500)
		}
	}
</script>
