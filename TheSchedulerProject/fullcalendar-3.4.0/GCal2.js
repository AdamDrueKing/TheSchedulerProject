var apiKey = 'AIzaSyAsOIuikEWJisvhZ-XctdMiikl0v2LUUfw';

var CLIENT_ID = '564506460648-knam6scga0e8i8ohtfs0246nnl4ffu39.apps.googleusercontent.com';

var DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

var SCOPES = "https://www.googleapis.com/auth/calendar";

var authorizeButton = document.getElementById('authorize-button');
var signoutButton = document.getElementById('signout-button');

function handleClientLoad() {
    // Loads the client library and the auth2 library together for efficiency.
    // Loading the auth2 library is optional here since `gapi.client.init` function will load
    // it if not already loaded. Loading it upfront can save one network request.
    gapi.load('client:auth2', initClient);
}

function initClient() {
    // Initialize the client with API key and People API, and initialize OAuth with an
    // OAuth 2.0 client ID and scopes (space delimited string) to request access.
    gapi.client.init({
        apiKey: apiKey, 
        discoveryDocs: DISCOVERY_DOCS,
        clientId: CLIENT_ID,
        scope: SCOPES
    }).then(function () {
        // Listen for sign-in state changes.
        gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);

        // Handle the initial sign-in state.
        updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
        authorizeButton.onclick = handleAuthClick;
        signoutButton.onclick = handleSignoutClick;
    });
}


function updateSigninStatus(isSignedIn) {
    // When signin status changes, this function is called.
    // If the signin status is changed to signedIn, we make an API call.
    if (isSignedIn) {
        authorizeButton.style.display = 'none';
        signoutButton.style.display = 'block';
        makeApiCall();
    }
    else {
        authorizeButton.style.display = 'block';
        signoutButton.style.display = 'none';
    }
}

function handleAuthClick(event) {
    gapi.auth2.getAuthInstance().signIn();
}

/**
 *  Sign out the user upon button click.
 */
function handleSignoutClick(event) {
    gapi.auth2.getAuthInstance().signOut();
}

function makeApiCall() {
    // Make an API call to the People API, and print the user's given name.
    gapi.client.people.people.get({
        'resourceName': 'people/me',
        'requestMask.includeField': 'person.names'
    }).then(function (response) {
        console.log('Hello, ' + response.result.names[0].givenName);
    }, function (reason) {
        console.log('Error: ' + reason.result.error.message);
    });
}
