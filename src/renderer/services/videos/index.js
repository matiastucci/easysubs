let videos = []

function set (v) {
  videos = v
}

function get () {
  return videos
}

function clear () {
  videos = []
}

function allowedExtensions () {
  return ['mp4', 'avi', 'mkv', 'wmv', 'm4v']
}

export default {
  get,
  set,
  clear,
  allowedExtensions
}
