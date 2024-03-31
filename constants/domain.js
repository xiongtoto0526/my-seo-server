const getDomain = (req) => {
    const host = req.get('host')
    if (isLocal(host)) {
        return "https://dev.webpilotai.com/rupee/v1"
    }
    else if (isDev(host)) {
        return "https://dev.webpilotai.com/rupee/v1"
    }
    return "https://api.webpilotai.com/rupee/v1"
}

const isLocal = (host) => {
    return host === 'localhost:3000' || '127.0.0.1:3000';
}

const isDev = (host) => {
    return host === 'dev.webpilotai.com';
}

module.exports = {
    getDomain,
    isLocal,
    isDev
};