var express = require('express')
var path = require('path')
var serveStatic = require('serve-static')

var app = express()

app.use(serveStatic(path.join('/Users/mahmoudtayem/Documents/Liferay/angular/guest-actions/componentLibrary')))
app.listen(3434)
