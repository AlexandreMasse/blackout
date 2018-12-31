import MobileDetect from "mobile-detect"

const md = new MobileDetect(window.navigator.userAgent)

const getOs = () => {
  const os = md.os()
  switch (os) {
    case "AndroidOS": return "Android"
    case "iOS": return "iOS"
    default: return null
  }
}

export const getPhoneData = () => {
  const data = {
    os: null,
    osVersionNumber: null,
    osReleaseDate: null,
    height: null,
    width: null,
    operator: null,
    score: null,
  }

  data.os = getOs()

  data.osVersionNumber = data.os ? md.version(data.os) : null

  //TODO: releaseDate

  data.width = window.innerWidth

  data.height = window.innerHeight

  //TODO: operator




  console.table({
    Mobile: md.version("Mobile"),
    Android: md.version("Android"),
    Version: md.version("Version"),
    Build: md.version("Build"),
    Iphone: md.version("iphone"),
  }

  );

  return data
}

