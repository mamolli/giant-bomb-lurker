const API_KEY = "GB_API_KEY" // token injected/replaced by builder with env var: GB_API_KEY

// helper to provide statless append of param to url
const appendQueryParams = (url, params) => {
  const urlObj = new URL(url)
  for (let param in params) {
    urlObj.searchParams.set(param, params[param])
  }
  return urlObj.toString()
}

export const giantBombFetch = (apiPath, opts = null) => {
  // basic wrapper over javascript's fetch function in context of Giant Bomb API
  const authQueryParam = `api_key=${API_KEY}`
  
  const sanitizedApiPath = apiPath.charAt(0) === "/" ? apiPath.substring(1) : apiPath
  const proxyUrl = `http://localhost:8010/proxy/api/${sanitizedApiPath}`
  // json format is less clunky in js, default format is xml
  const proxyAuthUrl = appendQueryParams(proxyUrl, {"api_key": API_KEY, "format": "json"})

  const responseJson = fetch(proxyAuthUrl, opts)
    .then(r => {
      if (!r.ok) {
        if (r.status === 401) {
          throw "401 Unauthroized, check credentials"
        }
        else {
          throw `${r.status} returned`
        }
      }
      else {
        return r.json()
      }
    })
    .catch(e => { alert(`Problem contacting Giant Bomb API: ${e}`) })

  return responseJson
}

export const searchGamesByString = (searchString) => {
  return giantBombFetch(`/search/?query=${searchString}&resources=game`).then(r => r.results)
}
