function handler(event) {
    var request = event.request
    var supportedCountries = ['pt', 'de'] // List of supported supported
    var defaultCountryCode = 'en'
    var newURI;

    console.log(event)
    if(request.uri.substr(3,1) != '/') {
        var headers = request.headers // get request headers

        if(headers['cloudfront-viewer-country']) {
            var countryCode = headers['cloudfront-viewer-country'].value.toLowerCase()

            if(supportedCountries.includes(countryCode)) {
                newURI = '/' + countryCode + request.uri
            } else {
                newURI = '/' + defaultCountryCode + request.uri
            }
        }

        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                'location': { 'value': newURI}
            }
        }
    }

    return request
}