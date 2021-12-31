//##############################
// Tasks
//##############################
const task = {
	views: true,
	styles: true,
	scripts: true,
	fonts: true,
	images: true,
	sprites: true,
	favicon: true,
}

//##############################
// Paths
//##############################
const source = 'src';
const compiled = 'build';

//##############################
// FTP Settings
//##############################
let ftpConfig = {
	folder: `test`, // Folder on the server
	host: '',       // Address
	user: '',       // Username
	password: '',   // Password
	parallel: 5,    // Number of concurrent streams
};

//##############################
// Server
//##############################
const srv = {
	port: 3300,
	path: path.dest,
	open: false,
	notify: false,
};

//##############################
// Pretty
//##############################
const pretty = {
	indent_size: 4,
	indent_char: ' ',
	unformatted: ['code', 'pre', 'em', 'strong', 'i', 'b', 'br', 'span'],
};

//##############################
// Image quality
//##############################
const quality = {
	jpeg: 80,
	png: [0.8, 0.9],
	webp: 80,
};

//##############################
// Exports
//##############################
export { task };
export { path };
export { srv };
export { pretty };
export { quality };
