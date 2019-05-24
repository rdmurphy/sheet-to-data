const { strict: assert } = require('assert');
const { google } = require('googleapis');
const { sheetToData } = require('../');

const expectedOutput = require('./expected/output');

const spreadsheetId =
  process.env.SPREADSHEET_ID || '13gffPNK63xOhqrr8sX51Dth8fYOq9s8xFS4WbWfueHo';

describe('@newswire/sheet-to-data', () => {
  let auth;

  before(async () => {
    auth = await google.auth.getClient({
      scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly'],
    });
  });

  it('should return a valid JavaScript object', async () => {
    const actual = await sheetToData({
      spreadsheetId,
      auth,
    });

    assert.deepStrictEqual(actual, expectedOutput);
  });
});
