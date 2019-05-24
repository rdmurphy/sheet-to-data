<h1 align="center">
  @newswire/sheet-to-data
</h1>
<p align="center">
  <a href="https://circleci.com/gh/rdmurphy/sheet-to-data"><img src="https://badgen.net/circleci/github/rdmurphy/sheet-to-data/"></a>
  <a href="https://www.npmjs.org/package/@newswire/sheet-to-data"><img src="https://badgen.net/npm/v/@newswire/sheet-to-data" alt="npm"></a>
  <a href="https://david-dm.org/rdmurphy/sheet-to-data"><img src="https://badgen.net/david/dep/rdmurphy/sheet-to-data" alt="dependencies"></a>
  <a href="https://packagephobia.now.sh/result?p=@newswire/sheet-to-data"><img src="https://badgen.net/packagephobia/install/@newswire/sheet-to-data" alt="install size"></a>
</p>

`@newswire/sheet-to-data` is a simple wrapper around the [Google Sheets API](https://developers.google.com/sheets/api/) for converting the contents of a Google Sheet into a key-value or tabular data structure.

## Key features

- ⚙️ TKTK
- 👩‍🔧 Does not expect any particular method of authenticating with Google — **use the authenticated Google API instance, Google Sheets client or [authentication method](https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization) you are already using**

## Installation

`@newswire/sheet-to-data` requires a version of Node.js **8 or higher**. It is available via `npm`.

```sh
npm install --save-dev @newswire/sheet-to-data
# or
yarn add --dev @newswire/sheet-to-data
```

## Preparing your spreadsheet

TK TK

## Usage

`@newswire/sheet-to-data` exports a single function - `sheetToData`.

```js
const { sheetToData } = require('@newswire/sheet-to-data');
const { google } = require('googleapis');

async function main() {
  // this method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables to establish authentication
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  // pass in the valid authentication and ID of the sheet you want to process
  const results = await sheetToData({ spreadsheetId: '...', auth });

  console.log(results); // `results` is your JavaScript object
}

main().catch(console.error);
```

## Authentication

`sheetToData` has one required parameter — `spreadsheetId`. But the authentication you provide with the Google API may be handled in one of the three ways detailed below.

_Acquiring_ this authentication is beyond the scope of this project's documentation, but two good starting points are [Google's official Node.js quickstart guide for the Google Sheets API](https://developers.google.com/sheets/api/quickstart/nodejs) and the [client library's authentication documentation](https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization).

### 1) Passing authentication

`sheetToData` doesn't limit authentication to only OAuth2 (although it certainly supports it!) and will accept any authenticated client that the Google Sheets API supports.

After establishing authentication [using one of the methods](https://github.com/googleapis/google-api-nodejs-client#authentication-and-authorization) supported by `googleapis`, you can pass this auth directly to `sheetToData` and it'll handle the rest.

```js
const { sheetToData } = require('@newswire/sheet-to-data');
const { google } = require('googleapis');

async function main() {
  // this method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables to establish authentication
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  // pass in the valid authentication, which is used to create a Google Sheets API client internally
  const results = await sheetToData({ spreadsheetId: '...', auth });
}

main().catch(console.error);
```

> (This example uses the [service-to-service authentication](https://github.com/googleapis/google-api-nodejs-client#service-to-service-authentication) method.)

### 2) Passing an authenticated Google Sheets API client

Maybe you've been working with the Google Sheets API and have already set up an authenticated instance of the Google Sheets API client that has access to the sheets you'd like to work with. `sheetToData` will accept that and use it!

```js
const { sheetToData } = require('@newswire/sheet-to-data');
const { google } = require('googleapis');

async function main() {
  // this method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables to establish authentication
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  // create your own Google Sheets API client
  const client = google.sheets({
    version: 'v4',
    auth,
  });

  // pass in the authenticated Google Sheets API client
  const results = await sheetToData({ spreadsheetId: '...', client });
}

main().catch(console.error);
```

> (This example uses the [service-to-service authentication](https://github.com/googleapis/google-api-nodejs-client#service-to-service-authentication) method.)

### 3) Passing an authenticated Google APIs instance

Maybe you've been using multiple Google API services and have [set authentication across all Google APIs globally](https://github.com/googleapis/google-api-nodejs-client#setting-global-or-service-level-auth). `sheetToData` can accept the authenticated `googleApisInstance` and use that to create the Google Sheets API client - no passing of `auth` necessary.

```js
const { sheetToData } = require('@newswire/sheet-to-data');
const { google } = require('googleapis');

async function main() {
  // this method looks for the GCLOUD_PROJECT and GOOGLE_APPLICATION_CREDENTIALS
  // environment variables to establish authentication
  const auth = await google.auth.getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
  });

  // set auth as a global default
  google.options({ auth });

  // pass in the GoogleApisInstance, which will be used to connect to the Google Sheets API
  const results = await sheetToData({ spreadsheetId: '...', google });
}

main().catch(console.error);
```

> (This example uses the [service-to-service authentication](https://github.com/googleapis/google-api-nodejs-client#service-to-service-authentication) method.)

## Contributing

First clone the repo to your local device and install the dependencies.

```sh
yarn
```

After making any changes, you'll need to run the tests. But this is a little tricky because we perform an integration test against a live Google Sheet file. To make the tests work for you locally, you'll need to do a few extra steps.

First make a copy of the test sheet file:

[Click here to make a copy of the test sheet file](https://docs.google.com/spreadsheets/d/13gffPNK63xOhqrr8sX51Dth8fYOq9s8xFS4WbWfueHo/copy)

Once you have the file, you'll need to get its ID and set the correct environment variables so the test runner finds them. To get the ID **look at the URL of the file** in your browser - it is the long string of random characters and numbers near the end.

https://<span></span>docs.google.com/spreadsheets/d/**13gffPNK63xOhqrr8sX51Dth8fYOq9s8xFS4WbWfueHo**/edit

Set the following environmental variables in your shell:

```sh
export SPREADSHEET_ID=<sheet_id>
```

Next you'll need to create a service account (or use an existing one) and give it access to your copy of the sheet. Typically this is done by sharing those files with the email of the service account in the sheet sharing interface.

Finally, we need to tell the test runner how to use the service account authentication to communicate with the API. The best method for doing this is the [service-to-service authentication method](https://github.com/googleapis/google-api-nodejs-client#service-to-service-authentication). Typically this means setting the `GOOGLE_APPLICATION_CREDENTIALS` environmental variable and pointing it at the location of your service account authentication JSON file.

```sh
export GOOGLE_APPLICATION_CREDENTIALS=<path_to_json_file>
```

And... now you're ready to go! You should be able to run the tests.

```sh
yarn test
```

If anyone has any suggestions on how to make this a smoother process, please let me know!

## License

MIT
