import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridOptions } from 'ag-grid-community';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonChildGridComponent } from '../common-child-grid/common-child-grid.component';

@Component({
  selector: 'app-ag-grid-common',
  imports: [MatExpansionModule, AgGridAngular, MatDialogModule],
  templateUrl: './ag-grid-common.component.html',
  styleUrl: './ag-grid-common.component.scss'
})
export class AgGridCommonComponent implements OnChanges {

  @Input('rowData') rowData!: any[];
  @Input('defColDefs') defColDefs!: any;

  colDefs: ColDef[] = [];
  defaultColDef: ColDef = {
    flex: 1,
    filter: true,
    floatingFilter: true,
    minWidth: 200,
    rowGroup: true,
    enableValue: true,// allow every column to be aggregated
    enableRowGroup: true, // allow every column to be grouped
    enablePivot: true,// allow every column to be pivoted
  };
  gridOptions: GridOptions<any> = {
    sideBar: true,
    rowGroupPanelShow: 'always'
  };

  constructor(
    private _matDialog: MatDialog
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['rowData'].currentValue) {
      this.populateColDef();
    }
  }

  populateColDef() {
    this.colDefs = []
    if (this.rowData?.[0]) {
      Object.keys(this.rowData?.[0]).map(key => {
        let obj: ColDef = { field: key, headerName: key };
        // if (key.endsWith('avatar_url')) {
        //   obj.cellRenderer = AgGridAvatarComponent;
        // } else if (key.endsWith('_url')) {
        //   obj.cellRenderer = AgGridLinkComponent;
        // } else if(key.endsWith('_at') || key.endsWith('At')) {
        //   obj.filter = 'agDateColumnFilter';
        //   obj.filterParams = {
        //     comparator: (filterLocalDateAtMidnight: Date, cellValue: string) => {
        //       const dateAsString = cellValue;
        //       if (dateAsString == null) return -1;
        //       const cellDate = new Date(cellValue);
        //       cellDate.setHours(0,0,0,0);
        //       if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
        //         return 0;
        //       }
        //       if (cellDate < filterLocalDateAtMidnight) {
        //         return -1;
        //       }
        //       if (cellDate > filterLocalDateAtMidnight) {
        //         return 1;
        //       }
        //       return 0;
        //     },
        //   }
        // }

        // if(key.includes('login')) {
        //   obj.onCellClicked = (event: any) => {
        //     if (event?.data?.[key]) {
        //       window.open(RouteUrl.USER_DETAIL_URL + event.data[key], '_blank')
        //     }
        //   }
        //   obj.cellStyle = { 'color': 'blue', 'text-decoration': 'underline', 'cursor': 'pointer' }
        // }

        if (key === 'fields' || key === 'views') {
          obj.cellRenderer = () => {
            return `<span>view</span>`
          };
            obj.cellStyle = { 'color': 'blue', 'text-decoration': 'underline', 'cursor': 'pointer' }
          obj.onCellClicked = (event: any) => {
            if (event?.data?.[key]?.length) {
              this._matDialog.open(CommonChildGridComponent, {disableClose: true, data: {rowData: event?.data?.[key]}});
            }
          }
        }
        if (this.defColDefs?.[key]) {
          obj = { ...obj, ...this.defColDefs[key] }
        }
        
        this.colDefs.push(obj);
      })
      this.colDefs = [...this.colDefs];
    }
  }

}