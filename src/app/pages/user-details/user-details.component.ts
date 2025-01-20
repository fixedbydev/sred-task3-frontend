import { Component } from '@angular/core';
import { AllDetailsComponent } from '../../common/components/all-details/all-details.component';
import { ApiService } from '../../common/services/api.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user-details',
  imports: [AllDetailsComponent],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss'
})
export class UserDetailsComponent {

  data: any = [];

  constructor(
    private _apiService: ApiService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      if (params['userName']) {
        this.getAllDetailsByUserName(params['userName']);
      }
    })
  }
  
  getAllDetailsByUserName(repoId: string) {
    this._apiService.getAllDetailsByUserName(repoId).subscribe({
      next: res => {
        this.data = res
      }
    })
  }
  
}
