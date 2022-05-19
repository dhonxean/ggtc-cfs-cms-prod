export default () => ({
	links: [
		{
			name: 'Dashboard',
			slug: '/dashboard',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#FF9000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>'
		},
		{
			name: 'Company',
			slug: '/company',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#FF9000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><polyline points="21 8 21 21 3 21 3 8"></polyline><rect x="1" y="3" width="22" height="5"></rect><line x1="10" y1="12" x2="14" y2="12"></line></svg>',
		},
		{
			name: 'Country',
			slug: '/country',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>',
		},
		{
			name: 'Currency Rates',
			slug: '/currency-rates',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>',
		},
		{
			name: 'Translation',
			slug: '/translation',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><rect x="2" y="2" width="20" height="8" rx="2" ry="2"></rect><rect x="2" y="14" width="20" height="8" rx="2" ry="2"></rect><line x1="6" y1="6" x2="6.01" y2="6"></line><line x1="6" y1="18" x2="6.01" y2="18"></line></svg>',
			subs: [
				{
					name: 'Language',
					slug: '/translation/language',
					icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#0084B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"></circle></svg>'
				},
				{
					name: 'World Country',
					slug: '/translation/world-country',
				}
			]
		},
		{
			name: 'Import',
			slug: '/import',
			icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"></path><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path></svg>',
			subs: [
				{
					name: 'Country',
					slug: '/import/country',
					icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" viewBox="0 0 24 24" fill="none" stroke="#0084B0" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="icon"><circle cx="12" cy="12" r="10"></circle></svg>'
				},
			]
		},
	],
	toggled: false
})
