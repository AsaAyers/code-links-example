'use 6to5';

// This will open up foo.js
// foo

module.exports = {
    scopes: [
        'source.js',
        'source.js.jsx',
    ],
    processEditor(editor) {
        let results = [];
        // Match either quote, then a `./` followed by anything that isn't the same
        // quote character, until it gets to the closing quote.
        let potentialPaths = /(['"])(\.\.?\/[^\1]*)\1/;
        potentialPaths = /foo/;

        for (let lineNum = 0; lineNum < editor.getLineCount(); lineNum++) {
            let line = editor.lineTextForBufferRow(lineNum);

            let modulePath = (line.match(potentialPaths) || []).pop();
            if (modulePath) {
                let column = line.indexOf(modulePath);
                results.push({
                    // This should probably be handled by core.
                    processor: this,
                    // Range is used by core
                    range: [
                        [lineNum, column],
                        [lineNum, (column + modulePath.length) ]
                    ],
                    // The rest here is up to you. This object will get passed
                    // into followLink so you can lazily resolve names.
                    modulePath,
                    // You don't have to lazily resolve the name though
                    filename: 'foo.js'
                });
            }
        }
        return results;
    },
    followLink(srcFilename, linkData ) {
        return linkData.filename;
    }
};
