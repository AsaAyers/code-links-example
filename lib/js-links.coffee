{CompositeDisposable} = require 'atom'

jsProcessor = require('./javascript-processor.js')

module.exports = JsLinks =

    activate: (state) ->
        console.log('activated js-links')

    provideJavascriptLinks: ->
        return jsProcessor
