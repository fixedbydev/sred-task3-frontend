import { Injectable } from "@angular/core";
import { ApiUrl } from "../classes/api-url.class";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUserModel } from "../models/user.model";

@Injectable({
    providedIn: 'root'
})

export class ApiService {

    constructor(
        private http: HttpClient
    ) { }

    getProfile(): Observable<IUserModel> {
        const url = ApiUrl.GET_PROFILE_URL;
        return this.http.get<IUserModel>(url)
    }

    syncAirTableData() {
        const url = ApiUrl.SYNC_AIR_TABLE_DATA_URL;
        return this.http.post(url, {});
    }

    validateCookie() {
        const url = ApiUrl.VALIDATE_COOKIE_URL;
        return this.http.get<{flag: boolean}>(url);
    }

    fetchCookie(tPayload: { password: string }) {
        const url = ApiUrl.FETCH_COOKIE_URL;
        return this.http.post(url, tPayload);
    }

    logout() {
        const url = ApiUrl.LOGOUT_URL;
        return this.http.get(url);
    }

    connectWithAirTable() {
        const url = ApiUrl.AUTH_URL;
        window.open(url, '_self');
    }

    getIntegrationLookup() {
        const url = ApiUrl.GET_INTEGRATION_LOOKUP_URL;
        return this.http.get<any>(url)
    }

    getEntityLookup() {
        const url = ApiUrl.GET_ENTITY_LOOKUP_URL;
        return this.http.get<any>(url)
    }

    getMainList(tPayload: any) {
        const url = `${ApiUrl.GET_RAW_DATA_URL}?page=${tPayload.page}&limit=${tPayload.limit}&collection=${tPayload.collection}`;
        return this.http.get<any>(url)
    }

    globalSearch(searchText: string) {
        const url = `${ApiUrl.GLOBAL_SEARCH}?search=${searchText}`;
        return this.http.get<any[]>(url)
    }

    getAllDetailsByUserName(userName: string | null) {
        const url = `${ApiUrl.GET_ALL_DETAILS_BY_USER_NAME_URL}?search=${userName}`;
        return this.http.get<any>(url)
    }
}
