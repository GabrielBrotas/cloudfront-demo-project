function handler(event) {
    var request = event.request
    var supportedCountries = ['br', 'en'] // List of supported supported
    var newURI;
    
    console.log(event)
    if(request.uri == '/' || request.uri == '') {
        var headers = request.headers // get request headers

        if(headers['cloudfront-viewer-country']) {
            var countryCode = headers['cloudfront-viewer-country'].value.toLowerCase()
            if(supportedCountries.includes(countryCode)) {
                newURI = request.uri + '?lang=' + countryCode
            } else {
                newURI = request.uri
            }
        }

        return {
            statusCode: 302,
            statusDescription: 'Found',
            headers: {
                'location': { 'value': newURI },
                'country-code': { 'value': countryCode }
            }
        }
    }

    return request
}