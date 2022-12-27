import { task }                           from '../../config.js';
import { markupBuild, markupWatch }       from '../tasks/markup.js';
import { stylesBuild, stylesWatch }       from '../tasks/styles.js';
import { scriptsBuild, scriptsWatch }     from '../tasks/scripts.js';
import { imagesBuild, imagesWatch }       from '../tasks/images.js';
import { spritesBuild, spritesWatch }     from '../tasks/sprites.js';
import   fontsBuild                       from '../tasks/fonts.js';
import   faviconsBuild                    from '../tasks/favicon.js';
import { resourcesBuild, resourcesWatch } from '../tasks/resources.js';

const build = [];
const watch = [];
const sprites = task.sprites.images || task.sprites.icons || task.sprites.eIcons;

task.markup    ? [build.push(markupBuild),    watch.push(markupWatch)]    : null;
task.styles    ? [build.push(stylesBuild),    watch.push(stylesWatch)]    : null;
task.scripts   ? [build.push(scriptsBuild),   watch.push(scriptsWatch)]   : null;
task.images    ? [build.push(imagesBuild),    watch.push(imagesWatch)]    : null;
sprites        ? [build.push(spritesBuild),   watch.push(spritesWatch)]   : null;
task.fonts     ?  build.push(fontsBuild)                                  : null;
task.favicon   ?  build.push(faviconsBuild)                               : null;
task.resources ? [build.push(resourcesBuild), watch.push(resourcesWatch)] : null;

export { build };
export { watch };
