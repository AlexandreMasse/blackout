import MobileDetect from "mobile-detect"
import osReleaseDates from "./osReleaseDate"

const md = new MobileDetect(window.navigator.userAgent)

// OS

const getOs = () => {
  const os = md.os()
  switch (os) {
    case "AndroidOS": return "Android"
    case "iOS": return "iOS"
    default: return null
  }
}

// Version Number

const getOsVersionNumber = (os) => os ? md.version(os) : null

// Release Date

const getOsReleaseDate = (os, osVersionNumber) => {



  const currentOsReleaseDates = osReleaseDates[os]

  const versionNumberKeys = Object.keys(currentOsReleaseDates)

  // round with one digit after dot
  const osVersionNumberRoundedString = (Math.floor(osVersionNumber * 10) / 10).toFixed(1);
  const osVersionNumberRounded = Number(osVersionNumberRoundedString)

  const firstVersionString = versionNumberKeys[0]
  const lastVersionString = versionNumberKeys[versionNumberKeys.length - 1]

  const firstVersionNumber = Number(versionNumberKeys[0])
  const lastVersionNumber = Number(versionNumberKeys[versionNumberKeys.length - 1])

  if (osVersionNumberRounded <= firstVersionNumber) { // inferior
    return currentOsReleaseDates[firstVersionString]
  } else if (
    osVersionNumberRounded > firstVersionNumber &&
    osVersionNumberRounded < lastVersionNumber
  ) { // in
    if(versionNumberKeys.includes(osVersionNumberRoundedString)) { // include
      return currentOsReleaseDates[osVersionNumberRoundedString]
    } else { // not include
      const beforeVersions = versionNumberKeys.filter((version) => version <= osVersionNumberRounded)
      return currentOsReleaseDates[beforeVersions[beforeVersions.length -1]]
    }
  } else { //superior
    return currentOsReleaseDates[lastVersionString]
  }
}

// Operator
export const getOperator = async () => {
  const defaultOperator = {
    "ip": "Inconnu",
    "hostname": "Inconnu",
    "city": "Inconnu",
    "region": "Inconnu",
    "country": "Inconnu",
    "loc": "Inconnu",
    "postal": "Inconnu",
    "org": "Inconnu"
  }

  return await fetch('http://ipinfo.io/json')
      .then(res => {
        if(res.ok) {
          return res.json()
        } else {
          console.log('Error to fetch http://ipinfo.io/json : ', res)
          return defaultOperator
        }
      })
      .catch(err => {
        console.log('Error to fetch http://ipinfo.io/json : ', err)
        return defaultOperator
      })
}

// Score

const getScore = (data) => {

  // Date

  const getDateTime = (date) => {
    const dateParts = date.split("/");
    const dateObject = new Date(+dateParts[2], dateParts[1] - 1, +dateParts[0]);
    return dateObject.getTime();
  }

  const minDate = Object.values(osReleaseDates.iOS)[0]
  const maxDate = Object.values(osReleaseDates.iOS)[Object.values(osReleaseDates.iOS).length - 1]
  const minDateTime = getDateTime(minDate)
  const maxDateTime = getDateTime(maxDate)
  const releaseDateTime = getDateTime(data.osReleaseDate)
  const dateScore = (releaseDateTime - minDateTime) / (maxDateTime - minDateTime)


  // Operator

  let operatorScore = 0.5

  const operators = {
    orange:{
      name:"orange",
      score: "1"
    },
     bouygues:{
      name:"bouygues",
      score: "0.75"
    },
    sfr:{
      name:"sfr",
      score: "0.5"
    },
    free:{
      name:"free",
      score: "0.25"
    }
  }

  const regexOperator = (operator) => RegExp(operator, "i")
  for (let operator in operators) {
    const operatorName = operators[operator].name
    if(regexOperator(operatorName).test(data.operator.org)) {
      operatorScore = operators[operator].score
    }
  }

  // Dimensions

  const minDimension = 320 * 480
  const maxDimension = 412 * 847
  const currentDimension = data.width * data.height
  const dimensionScore = (currentDimension - minDimension) / (maxDimension - minDimension)

  // Coefficient for result

  const dateCoef = 10
  const operatorCoef = 5
  const dimensionCoef = 7

  return dateCoef * dateScore + operatorCoef * operatorScore + dimensionCoef * dimensionScore
}


// Main function

export const getPhoneData = async () => {
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

  data.operator = await getOperator()

  data.score = getScore(data)

  return data
}

