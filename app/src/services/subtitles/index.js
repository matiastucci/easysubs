const OS 	 = require('opensubtitles-api')
const http = require('http')
const fs 	 = require('fs')

const OpenSubtitles = new OS({
  useragent: 'EasysubsNJ',
  ssl: true,
})

function get(id, filename, fpath, filesize) {
  return OpenSubtitles.search({
    sublanguageid: 'eng',
    path: fpath,
    filename,
    filesize,
    extensions: ['srt'],
  })
  .then(sub => {
    const hasUrl = Object.keys(sub).length
    sub.file = { id, name, path: fpath, hasUrl }
    return sub
  })
}

function getName(videoName) {
  // TODO: use saved subtitle format
  return `${videoName}.srt`
  // return `${path.parse(videoName).name}.srt`
}

function download(id, url, name) {
  // TODO: check if url is duplicated. Sometimes
	// OpenSubtitles is returning wrong sub in a TV Show
  const file = fs.createWriteStream(name)
  return new Promise(resolve => {
    http.get(url, response => {
      response.pipe(file)
      resolve('ready')
    })
  })
}

export default {
  get,
  getName,
  download,
}
