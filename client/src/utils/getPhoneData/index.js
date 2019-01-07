import MobileDetect from "mobile-detect"
import osReleaseDates from "./osReleaseDate"

const md = new MobileDetect(window.navigator.userAgent)

const getOs = () => {
  const os = md.os()
  switch (os) {
    case "AndroidOS": return "Android"
    case "iOS": return "iOS"
    default: return null
  }
}

const getOsVersionNumber = (os) => os ? md.version(os) : null

const getOsReleaseDate = (os, osVersionNumber) => {

  // round with one digit after dot
  const osVersionNumberRounded = (Math.floor(osVersionNumber * 10) / 10).toFixed(1);

  const currentOsReleaseDates = osReleaseDates[os]

  const versionNumberKeys = Object.keys(currentOsReleaseDates)

  const firstVersion = versionNumberKeys[0]
  const lastVersion = versionNumberKeys[versionNumberKeys.length - 1]

  if (osVersionNumberRounded <= firstVersion) { // inferior
    return currentOsReleaseDates[firstVersion]
  } else if (
    osVersionNumberRounded > firstVersion &&
    osVersionNumberRounded < lastVersion
  ) { // in
    if(versionNumberKeys.includes(osVersionNumberRounded)) { // include
      return currentOsReleaseDates[osVersionNumberRounded]
    } else { // not include
      const beforeVersions = versionNumberKeys.filter((version) => version <= osVersionNumberRounded)
      return currentOsReleaseDates[beforeVersions[beforeVersions.length -1]]
    }
  } else { //superior
    return currentOsReleaseDates[lastVersion]
  }
}

const getScore = (releaseDate) => {
  const dateParts = releaseDate.split("/");

  // month is 0-based, that's why we need dataParts[1] - 1
  const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);

  return dateObject.getTime()
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

  data.osVersionNumber = getOsVersionNumber(data.os)

  data.osReleaseDate = getOsReleaseDate(data.os, data.osVersionNumber)

  data.width = window.innerWidth

  data.height = window.innerHeight

  //TODO: operator

  //TODO: wip score

  data.score = getScore(data.osReleaseDate)

  return data
}

