import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AgGridCommonComponent } from '../../common/components/ag-grid-common/ag-grid-common.component';
import { MatSelectModule } from '@angular/material/select';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { ApiService } from '../../common/services/api.service';
import { MatInputModule } from '@angular/material/input';
import { forkJoin } from 'rxjs';
import { MatButtonModule } from '@angular/material/button';
import { AllDetailsComponent } from "../../common/components/all-details/all-details.component";


@Component({
  selector: 'app-main',
  imports: [MatExpansionModule, AgGridCommonComponent, MatSelectModule, FormsModule, ReactiveFormsModule, MatInputModule, MatButtonModule, AllDetailsComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent implements OnInit {

  entityLookup: string[] = [];
  integrationLookup: any[] = [];

  filterFormGroup: UntypedFormGroup = new UntypedFormGroup({
    collection: new UntypedFormControl('projects'),
    searchText: new UntypedFormControl(''),
  })

  rowData: any[] = [];
  newGlobalSearchData!: any;

  constructor(
    private _apiService: ApiService
  ) { }


  ngOnInit(): void {
    this._apiService.getEntityLookup().subscribe(res => {
      this.entityLookup = res?.collections || [];
      this.filterFormGroup.patchValue({
        collection: this.entityLookup[0],
      })
      this.onEntityChange();
    })
  }

  onEntityChange() {
    const collection = this.filterFormGroup.get('collection')?.value;
    const tPayload = {
      collection,
      page: 1,
      limit: 99999
    };
    this._apiService.getMainList(tPayload).subscribe({ next: (res) => this.rowData = res?.docs });
  }

  onNewGlobalSearch() {
    const searchText = this.filterFormGroup.get('searchText')?.value;
    if(searchText) {
      this._apiService.globalSearch(searchText).subscribe({ next: (res) => {
        this.newGlobalSearchData = res;
      }});
    }
  }
}
