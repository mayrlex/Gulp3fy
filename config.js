/* eslint-disable import/no-mutable-exports */
/* eslint-disable prefer-const */
//##############################
// Tasks
//##############################
const task = {
	markup:  true,
	styles:  true,
	scripts: true,
	fonts:   false,
	images:  true,
	sprites: true,
	favicon: true,
	files:   false,
}

//##############################
// Server settings
//##############################
const serverConfig = {
	port:   3300,
	open:   false,
	notify: false,
}

//##############################
// Manifest Settings
//##############################

const manifest = {
	name: 'Gulp3fy',
	shortname: 'G3',
	description: 'Taskrunner based on gulp + webpack',
	devName: 'H3JILgaH4uk',
	devUrl: 'https://github.com/H3JILgaH4uk',
	lang: 'RU-ru',
	bg: '#fff',
	themeColor: '#fff',
	display: 'standalone',
	orientation: 'portrait',
	url: '/',
	icons: {
		android: true,
		appleIcon: true,
		appleStartup: false,
		coast: false,
		favicons: true,
		firefox: false,
		windows: false,
		yandex: false,
	}
}

//##############################
// FTP Settings
//##############################
let ftpConfig = {
	folder:   `test`, // Folder on the server
	host:     '',     // Address
	user:     '',     // Username
	password: '',     // Password
	parallel: 5,      // Number of concurrent streams
};

//##############################
// Markup settings
//##############################
const markupConfig = {
	pretty:  true,
	verbose: true,
}

//##############################
// Styles settings
//##############################
const stylesConfig = {
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

//##############################
// Imagemin settings
//##############################
const imgminConfig = {
	progressive:       true,
	svg: {
		removeViewBox: false,
	},
	interlaced:        true,
	optimizationLevel: 3,
}

//##############################
// Sprites settings
//##############################
const spriteConfig = {
	example: {
		mono:  true,
		multi: true,
	},
	removeAttrs: {
		mono:  ['class', 'data-name', 'fill.*', 'stroke.*'],
		multi: ['class', 'data-name'],
	}
}

export { task };
export { serverConfig };
export { manifest };
export { ftpConfig };
export { imgminConfig };
export { markupConfig };
export { stylesConfig };
export { spriteConfig };