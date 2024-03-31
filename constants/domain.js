const getDomain = () => {
    if (isLocal()) {
        return "https://dev.webpilotai.com/rupee/v1"
    }
    else if (isDev()) {
        return "https://dev.webpilotai.com/rupee/v1"
    }
    return "https://api.webpilotai.com/rupee/v1"
}

const isLocal = () => {
    return process.env.NODE_ENV === 'local';
}

const isDev = () => {
    return process.env.NODE_ENV === 'development';
}

module.exports = {
    getDomain,
    isLocal,
    isDev
};