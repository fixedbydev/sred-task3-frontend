import { Component, OnDestroy, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AuthService } from './common/services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { AllCommunityModule, ModuleRegistry } from 'ag-grid-community';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatProgressSpinnerModule, DashboardComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  isLoading = signal<boolean>(false);
  unsubscribe: Subject<any> = new Subject();

  constructor(
    private _authService: AuthService
  ) {
    ModuleRegistry.registerModules([AllCommunityModule]);
  }

  ngOnInit(): void {
    this._authService.showLoader$.pipe(takeUntil(this.unsubscribe)).subscribe(isLoading => {
      this.isLoading.set(isLoading);
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this.unsubscribe.next(null);
    this.unsubscribe.complete();
  }
}