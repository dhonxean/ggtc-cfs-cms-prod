import Vue from 'vue'
import VueQuillEditor from 'vue-quill-editor'
import Quill from 'quill'

import ImageResize from 'quill-image-resize-vue'
import VideoResize from 'quill-video-resize-module2'

let Parchment = Quill.import('parchment'),
	BaseImageFormat = Quill.import('formats/image')

const ImageFormatAttributesList = [
	'alt',
	'height',
	'width',
	'style'
]

class ImageFormat extends BaseImageFormat {
	static formats(domNode) {
		return ImageFormatAttributesList.reduce(function(formats, attribute) {
			if (domNode.hasAttribute(attribute)) {
				formats[attribute] = domNode.getAttribute(attribute)
			}
			return formats
		}, {})
	}
	format(name, value) {
		if (ImageFormatAttributesList.indexOf(name) > -1) {
			if (value) {
				this.domNode.setAttribute(name, value)
			} else {
				this.domNode.removeAttribute(name)
			}
		} else {
			super.format(name, value)
		}
	}
}

Quill.register(ImageFormat, true)
Quill.register('modules/imageResize', ImageResize)
Quill.register('modules/VideoResize', VideoResize)

import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

Vue.use(VueQuillEditor, {
	modules: {
		imageResize: {},
		VideoResize: {
			modules: [ 'Resize', 'DisplaySize', 'Toolbar' ],
			tagName: 'iframe', // iframe | video
		},
		toolbar: [
			['bold', 'italic', 'underline', 'strike'],
			['blockquote', 'code-block'],
			[{ 'header': 1 }, { 'header': 2 }],
			[{ 'list': 'ordered' }, { 'list': 'bullet' }],
			[{ 'script': 'sub' }, { 'script': 'super' }],
			[{ 'indent': '-1' }, { 'indent': '+1' }],
			[{ 'direction': 'rtl' }],
			[{ 'size': ['small', false, 'large', 'huge'] }],
			[{ 'header': [1, 2, 3, 4, 5, 6, false] }],
			[{ 'color': [] }, { 'background': [] }],
			[{ 'align': [] }],
			['link', 'image', 'video']
		]
	}
})
