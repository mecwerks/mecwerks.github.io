const { readFileSync, writeFileSync } = require('fs');

// inputfile: outputfile
const nodeLibs = {
    'animejs/lib/anime.min.js': `scripts/anime.min.js`
};

module.exports = function(eleventyConfig) {
    eleventyConfig.addPassthroughCopy("css/**.css");
    eleventyConfig.addPassthroughCopy("scripts/**.js");

    // Copy files from nodejs cache packages.
    eleventyConfig.on('eleventy.after', async ({ dir, results, runMode, outputMode }) => {
        for(const key of Object.keys(nodeLibs)) {
            const buffer = readFileSync(require.resolve(key));
            writeFileSync(dir.output + `/` + nodeLibs[key], buffer);
        }
    });

    return {
        dir: {
            input: 'views',
            output: '_site',
            data: '_data',
        }
    }
};