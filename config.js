//? ### Manifest
const manifest = {
	name:        '',
	shortname:   '',
	description: 'Taskrunner based on gulp + webpack',
	devName:     'H3JILgaH4uk',
	devUrl:      'https://github.com/H3JILgaH4uk',
	version:     1.0,
	lang:        'ru-RU',
	bg:          '#fff',
	themeColor:  '#000',
	display:     'standalone',
	orientation: 'portrait',
	url:         '/',
	icons: {
		android:      true,
		appleIcon:    true,
		appleStartup: false,
		coast:        false,
		favicons:     true,
		firefox:      false,
		windows:      false,
		yandex:       false,
	}
}

//? ### Tasks
const task = {
	markup:    true,
	styles:    true,
	scripts:   true,
	fonts:     true,
	images:    true,
	sprites:   {
		images:  false,
		icons:   true,
		eIcons:  false
	},
	favicon:   true,
	resources: true,
}

//? ### Server settings
const serverSettings = {
	port:   3300,
	open:   false,
	notify: false,
}

export { manifest };
export { task };
export { serverSettings };