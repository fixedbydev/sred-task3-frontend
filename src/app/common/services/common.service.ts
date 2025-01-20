import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable({
    providedIn: 'root'
})
export class CommonService {

    constructor(private router: Router) { }

    navigateToCustomPage(urlToNavigate: string, additionalData = null, queryParams = null) {
        const route = [urlToNavigate];
        if (additionalData) {
            route.push(additionalData);
        }
        if (queryParams) {
            this.router.navigate(route, { queryParams: queryParams });
        } else {
            this.router.navigate(route);
        }
    }
}