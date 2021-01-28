module.exports = {
  async teste() {
    let urls = ["https://www.youtube.com/watch?v=fmi3YJ5t7qc","https://www.youtube.com/watch?v=f7JWDLFhR_c","https://www.youtube.com/watch?v=rR1uIN-Mes4","https://www.youtube.com/watch?v=Xb0-cQO19hg","https://www.youtube.com/watch?v=IyRUn0GocEc","https://www.youtube.com/watch?v=8pKjULHzs0s","https://www.youtube.com/watch?v=V7oUDL7E1g4","https://www.youtube.com/watch?v=oUPaJxk6TZ0","https://www.youtube.com/watch?v=HEaIsKm-pao","https://www.youtube.com/watch?v=D3L8IOncLkg"]
    let urlsCodes = []
    let imgsUrls = []

    let i = 0
    let j = 0

    while(i < urls.length) {
      let urlCode = urls[i].substring(urls[i].indexOf("=") + 1)
      urlsCodes.push(urlCode)
      i++
    }

    if(i == urls.length) {
      j = 0
      while(j < urls.length) {
        let imgUrl = `https://img.youtube.com/vi/${urlsCodes[j]}/hqdefault.jpg`
        imgsUrls.push(imgUrl)
        j++
      }
    }

    if(j == imgsUrls.length) {
      return imgsUrls
    }

  }
}