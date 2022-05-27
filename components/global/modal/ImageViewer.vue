<template>
	<transition name="fade">
		<div id="image_popup">
			<div class="image_popup_container">
				<div class="image_popup_content">
					<div class="image_popup_wrapper">
						<div class="image_popup_image_container">
							<div class="image">
								{{ getItem.path }}
								<img :src="`/static-translation/sections/${getItem.path}.png`" alt="">
							</div>
						</div>
					</div>
					<div class="image_popup_button">
						<button type="button" class="popup_close" @click="toggleModalStatus({ type: 'image_viewer', status: false })">
							<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
								<path d="M12 10.6L6.6 5.2 5.2 6.6l5.4 5.4-5.4 5.4 1.4 1.4 5.4-5.4 5.4 5.4 1.4-1.4-5.4-5.4 5.4-5.4-1.4-1.4-5.4 5.4z">
								</path>
							</svg>
						</button>
					</div>
				</div>
			</div>
		</div>
	</transition>
</template>

<script>
	import { mapGetters } from 'vuex'

	export default {
		computed: {
			...mapGetters({
				getItem: 'global/modal/getItem'
			})
		},
		methods: {
			
		},
		mounted () {
			document.body.classList.add('no_scroll')
		}
	}
</script>
<style lang="stylus" scoped>
	#image_popup
		.image_popup_container
			background-color: rgba(30, 30, 30, 0.9)
			z-index: 3001 
			position: fixed
			left: 0
			bottom: 0
			top: 0
			right: 0
			align-items: center
			display: flex
			justify-content: center
			transition: all .3s ease
			.image_popup_content
				transition: all .3s ease
				padding: 60px 0
				position: absolute
				top: 0
				left: 0
				right: 0
				bottom: 0
				overflow: hidden
				margin: 0
				.image_popup_wrapper
					width: 100%
					height: 100%
					position: relative
					padding: 0
					margin: 0
					.image_popup_image_container
						margin-right: 0
						width: 100%
						top: 0
						bottom: 0
						left: 0
						right: 0
						z-index: 100
						position: absolute
						display: flex
						padding: 0
						margin: 0
						.image
							top: 50%
							left: 50%
							transition: all 0.3s ease 0s
							transform: translate3d(calc(-50% + 0px), calc(-50% + 0px), 0px) scale3d(1, 1, 1)
							position: absolute
							height: 100%
							width: 100%
							display: flex
							justify-content: center
							img
								max-width: 100%
								max-height: 100%
								z-index: 9999
								cursor: pointer
								object-fit: contain
				.image_popup_button
					position: absolute
					top: 0
					right: 0
					.popup_close
						width: 44px
						height: 44px
						padding: 10px
						background: transparent
						border: 0
						border-radius: 0
						box-shadow: none
						cursor: pointer
						margin: 0
						padding: 9px
						position: relative
						svg
							width: 100%
							height: 100%
							path
								fill: #ffffff
</style>