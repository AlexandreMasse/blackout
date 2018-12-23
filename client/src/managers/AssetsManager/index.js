class AssetsManager {

    debug = () => {
        console.log(window.assets)
    }

    get = (mId) => {
        if (window.assets[mId]) {
            return window.assets[mId]
        } else {
            throw `${mId} does not exist bitch !`;
        }
    }  
}

export default new AssetsManager()

