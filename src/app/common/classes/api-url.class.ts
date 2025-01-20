import { environment } from "../../../environments/environment";

export class ApiUrl {
    static BASE_URL = environment.apiUrl;
    static AUTH_URL = this.BASE_URL + 'auth/airtable';
    static LOGOUT_URL = this.BASE_URL + 'auth/logout';
    static GET_PROFILE_URL = this.BASE_URL + 'airtable/profile';
    static SYNC_AIR_TABLE_DATA_URL = this.BASE_URL + 'airtable/sync';
    static VALIDATE_COOKIE_URL = this.BASE_URL + 'airtable/validate-cookie';
    static FETCH_COOKIE_URL = this.BASE_URL + 'airtable/fetch-cookie';
    static GET_INTEGRATION_LOOKUP_URL = this.BASE_URL + 'airtable/integrations';
    static GET_ENTITY_LOOKUP_URL = this.BASE_URL + 'airtable/collections';
    static GET_RAW_DATA_URL = this.BASE_URL + 'airtable/raw-data';
    static GLOBAL_SEARCH = this.BASE_URL + 'airtable/global-search';
    static GET_ALL_DETAILS_BY_USER_NAME_URL = this.BASE_URL + 'airtable/repo-relationships';
}