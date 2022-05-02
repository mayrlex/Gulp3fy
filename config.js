//? ### Task controls
const task = {
	markup:    true,
	styles:    true,
	scripts:   true,
	fonts:     false,
	images:    true,
	sprites:   true,
	favicon:   true,
	resources: true,
}

//? ### Server settings
const serverSettings = {
	port:   3300,
	open:   false,
	notify: false,
}

//? ### Manifest Settings
const manifest = {
	name:        'Gulp3fy',
	shortname:   'G3',
	description: 'Taskrunner based on gulp + webpack',
	devName:     'H3JILgaH4uk',
	devUrl:      'https://github.com/H3JILgaH4uk',
	version:     1.0,
	lang:        'ru-RU',
	bg:          '#fff',
	themeColor:  '#fff',
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

//? ### FTP Settings
// folder:   Folder on the server
// host:     Address
// user:     Username
// password: Password
// parallel: Count of parallel streams

const ftpSettings = {
	folder:   `test`,
	host:     '',
	user:     '',
	password: '',
	parallel: 5,
};

//? ### Styles settings
const stylesSettings = {
	sass: {
		outputStyle:         'expanded',
	},

	autoprefixer: {
		grid:                true,
		cascade:             true,
		overrideBrowserlist: 'last 5 version',
	},

	cleanlvl:                1,
}

//? ### Imagemin settings
const imageminSettings = {
	progressive:       true,
	svg: {
		removeViewBox: false,
	},

	interlaced:        true,
	optimizationLevel: 3,
}

//? ### Sprite settings
const spriteSettings = {
	example: {
		sprite:       true,
		icons:        true,
		unresetIcons: true,
	},

	removeAttrs: {
		sprite:       ['class', 'data-name'],
		icons:        ['class', 'data-name', 'fill.*', 'stroke.*'],
		unresetIcons: ['class', 'data-name'],
	}
}

export { task };
export { serverSettings };
export { manifest };
export { ftpSettings };
export { imageminSettings };
export { stylesSettings };
export { spriteSettings };