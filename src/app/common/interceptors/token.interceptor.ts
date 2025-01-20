import { HttpInterceptorFn } from "@angular/common/http";
import { inject, NgZone } from "@angular/core";
import { catchError, finalize, tap } from "rxjs";
import { AuthService } from "../services/auth.service";
import { MatSnackBar } from '@angular/material/snack-bar';

export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
    const _authService = inject(AuthService)
    const zone = inject(NgZone)
    const _snackBar = inject(MatSnackBar);
    let authToken = _authService.getAuthToken();
    if (authToken) {
        _authService.showLoader$.next(true);
        return next(req.clone({ setHeaders: { Authorization: `${authToken}` } })).pipe(
            catchError((error, caught) => {
                _authService.showLoader$.next(false);
                zone.run(() => {
                    _snackBar.open(error?.message || 'Internal Server Error!', '', { duration: 5000 });
                });
                throw error;
            }),
            finalize(() => {
                _authService.showLoader$.next(false);
            })
        )
    } else {
        _authService.deleteAuthToken();
        throw new Error('Request forbidden! No access token available.');
    }
}