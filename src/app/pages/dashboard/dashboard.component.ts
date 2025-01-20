import { Component, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../../common/services/auth.service';
import { IUserModel } from '../../common/models/user.model';
import { CommonService } from '../../common/services/common.service';
import { RouteUrl } from '../../common/classes/route-url.class';
import { ApiService } from '../../common/services/api.service';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { PasswordComponent } from '../../common/components/password/password.component';

@Component({
  selector: 'app-dashboard',
  imports: [MatExpansionModule, MatIconModule, MatButtonModule, CommonModule, MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  isUserLoggedIn = signal<boolean>(false);
  user = signal<IUserModel | null>(null);

  constructor(
    private _authService: AuthService,
    private _apiService: ApiService,
    private _commonService: CommonService,
    private _location: Location,
    private route: ActivatedRoute,
    private _matDialog: MatDialog
  ) {
    
    this.route.queryParams.subscribe(params => {
      if (params['accessToken']) {
        this._authService.setAuthToken(params['accessToken']);
        this._commonService.navigateToCustomPage(RouteUrl.MAIN_URL);
        this.verifyUser();
      }
    })
  }

  ngOnInit(): void {
    this.verifyUser();
  }

  verifyUser() {
    this.isUserLoggedIn.set(this._authService.isUserLoggedIn());
    if (this.isUserLoggedIn()) {
      if (this._location.path() === '') {
        this._commonService.navigateToCustomPage(RouteUrl.MAIN_URL);
      }
      this.getProfile();
    } else if(!this._location.path().includes('accessToken')) {
      if (this._location.path()) {
        this._commonService.navigateToCustomPage('');
      }
    }
  }

  getProfile() {
    this._apiService.getProfile().subscribe({
      next: (res) => {
        this.user.set(res);
      }
    })
  }

  onSync(event: any) {
    event.stopPropagation();
    this._apiService.validateCookie().subscribe(res=> {
      if(res.flag) {
        this._apiService.syncAirTableData().subscribe(res=> {
          this.getProfile();
        });
      } else {
        const dialogRef = this._matDialog.open(PasswordComponent, {disableClose: true})
        dialogRef.afterClosed().subscribe(isCookieVerified=> {
          if(isCookieVerified) {
            this._apiService.syncAirTableData().subscribe(res=> {
              this.getProfile();
            });
          }
        })
      }
    })
  }

  onConnect() {
    this._apiService.connectWithAirTable();
  }

  onRemove() {
    this._apiService.logout().subscribe({
      next: (res) => {
        this._authService.deleteAuthToken();
        this.isUserLoggedIn.set(false);
        this._commonService.navigateToCustomPage('');
      }
    })
  }
}
