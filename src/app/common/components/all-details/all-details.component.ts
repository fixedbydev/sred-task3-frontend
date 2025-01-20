import { Component, Input } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AgGridCommonComponent } from '../ag-grid-common/ag-grid-common.component';

@Component({
  selector: 'app-all-details',
  imports: [MatExpansionModule, AgGridCommonComponent],
  templateUrl: './all-details.component.html',
  styleUrl: './all-details.component.scss'
})
export class AllDetailsComponent {

  @Input('commits') commits: any;
  @Input('issues') issues: any;
  @Input('pullRequests') pullRequests: any;
}
