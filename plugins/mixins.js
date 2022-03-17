import Vue from 'vue'
import { mapMutations } from 'vuex'

Vue.mixin({
	methods: {
		...mapMutations({
			toggleModalStatus: 'global/modal/toggleModalStatus'
		}),
		async validateToken (...routes) {
			let authenticated = await (this.$auth.user) ? true : false

			if (!routes.includes(this.$route.path)) {
				if (authenticated) {
					this.$store.commit('global/settings/userAuthentication', { status: true })
				}
			} else {
				if (authenticated) {
					this.$router.push('/dashboard')
				}
			}

			if (!authenticated) {
				if (this.$route.fullPath != routes[0]) {
					await this.$auth.logout().then(res => {
						if (this.$route.fullPath != routes[0]) {
							this.$router.push(routes[0])
						}
					})
				}
			}
		},
		updateWysiwyg (editor, type, update = false) {
			if (update) {
				this.form_data[type] = document.querySelector(`.editor.${type} .ql-editor`).innerHTML
			} else {
				this.form_data[type] = editor.html
			}
			this.wysiwygErrorBag(this, type)
		},
		validateWysiwyg (page, wysiwygs) {
			wysiwygs.forEach((wysiwyg, key) => {
				this.wysiwygErrorBag(page, wysiwyg)
			})
		},
		wysiwygErrorBag (page, type) {
			let text = document.querySelector(`.editor.${type} .ql-editor`).textContent

			page.validation[type] = (page.form_data[type].length <= 0) ? `The ${type} field is required` : null
			if (page.char_limit[type]) {
				page.char_limit[type].value = page.char_limit[type].total
			}
			if (!page.validation[type]) {
				if (page.char_limit[type]) {
					page.char_limit[type].value = (page.char_limit[type].total - text.length <= 0) ? 0 : page.char_limit[type].total - text.length
					page.validation[type] = (page.form_data[type].length < page.char_limit[type].total) ? null : `Max ${page.char_limit[type].total} characters limit only`
				}
			}
		},
		wysiwygPopulateCharLimit (page, wysiwygs) {
			wysiwygs.forEach((wysiwyg, key) => {
				let text = document.querySelector(`.editor.${wysiwyg} .ql-editor`).textContent
				if (page.char_limit[type]) {
					page.char_limit[wysiwyg].value = (page.char_limit[wysiwyg].total - text.length <= 0) ? 0 : page.char_limit[wysiwyg].total - text.length
				}
			})
		},
		/**
		 * check if the input field has value
		 * which is the length is greater the 0
		 * @param  {[object]} event [input event]
		 */
		checkValue (event) {
			let target = event.target
			if (target.value.length > 0) {
				target.classList.add('filled')
			} else {
				target.classList.remove('filled')
			}
		},
		parseInputToDate (target) {
			let lastValue = ''
			let value = target.split('-').join('')
			if (value.length > 0) {
				value = value.match(new RegExp('.{1,4}', 'g')).join('-')
				let valueArrayChecker = value.split('-')
				if (valueArrayChecker[1]) {
					if (valueArrayChecker[1].length > 0) {
						value = value.split('-')
						lastValue = `${value[0]}-`
						lastValue += value[1].match(new RegExp('.{1,2}', 'g')).join('-')
					}
				} else {
					lastValue = value
				}
			}
			return lastValue
		},
		randomCode () {
			return Math.random().toString(36).substring(5).toUpperCase()
		},
		randomString () {
			return Math.random().toString(36).substring(2)
		},
		totalCount (value, decimal = false) {
			let count = 0
			if (value) {
				count = (decimal) ? parseFloat(value).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") : parseFloat(value).toFixed().toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
			}
			return count
		},
		toJSON (data) {
			if (data) {
				return JSON.parse(JSON.stringify(Object.fromEntries(data)))
			}
		},
		parser (data) {
			if (data) {
				return JSON.parse(data)
			}
		},
		replacer (data) {
			if (data) {
				return data.replace(/\-/g, ' ')
			}
		},
		convertToSlug (data) {
			let slug = ''
			if (data.match(/[!@#$%^&*(){}:;"’'<>?,./|“”]|\`|\~|\=|\-|\+|\_|\[|\]|\\/g)) {
				slug = data.toLowerCase().replace(/[!@#$%^&*(){}:;"'’<>?,./|“”]|\`|\~|\=|\-|\+|\_|\[|\]|\\/g, '').replace(/\s/g, '-')
			} else {
				slug = data.toLowerCase().replace(/\s/g, '-')
			}
			return slug
		}
	}
})