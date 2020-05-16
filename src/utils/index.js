const toggleFullScreen = () => {
    let doc = window.document;
    let docEl = doc.documentElement;
    let requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen;
    let cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen;
    if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        requestFullScreen.call(docEl);
    } else {
        cancelFullScreen.call(doc);
    }
};

const firstUpper = (txt) => {
    return txt.charAt(0).toUpperCase() + txt.slice(1)
}

const generatePasswor = () => {
    var length = 8,
        charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    for (var i = 0, n = charset.length; i < length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

const formatError = (e) => {
    let msg = e.response.data.message+'\n\r'
    for(let err in e.response.data.errors)
    {
        msg += err;
        for(let detail in e.response.data.errors[err]){
            msg += ' '+e.response.data.errors[err][detail]+'\n\r'
        }
    }
    return msg;
}

export default {
  toggleFullScreen, firstUpper, generatePasswor, formatError
};
