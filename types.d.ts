import { GoogleApis, sheets_v4 } from 'googleapis';

export interface BaseSheetToDataOptions {
  spreadsheetId: sheets_v4.Params$Resource$Spreadsheets$Get['spreadsheetId'];
}

export interface AuthSheetToDataOptions extends BaseSheetToDataOptions {
  auth: sheets_v4.Params$Resource$Spreadsheets$Get['auth'];
}

export interface ClientSheetToDataOptions extends BaseSheetToDataOptions {
  client: sheets_v4.Sheets;
}

export interface GoogleSheetToDataOptions extends BaseSheetToDataOptions {
  google: GoogleApis;
}

export type SheetToDataOptions =
  | AuthSheetToDataOptions
  | ClientSheetToDataOptions
  | GoogleSheetToDataOptions;

declare function sheetToData({
  auth,
  client,
  spreadsheetId,
  google,
}: SheetToDataOptions): Promise<unknown>;

export { sheetToData };
