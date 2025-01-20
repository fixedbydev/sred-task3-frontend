import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef } from 'ag-grid-community';
import { MatIconModule } from '@angular/material/icon';
import { PasswordComponent } from '../password/password.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-common-child-grid',
  imports: [MatExpansionModule, AgGridAngular, MatIconModule, MatButtonModule],
  templateUrl: './common-child-grid.component.html',
  styleUrl: './common-child-grid.component.scss'
})
export class CommonChildGridComponent implements OnInit {

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<PasswordComponent>,
  ) { }
  ngOnInit(): void {
    this.populateColDef(this.data?.rowData)
  }

  populateColDef(rowData: any) {
    this.colDefs = []
    if (rowData?.[0]) {
      Object.keys(rowData?.[0]).map(key => {
        let obj: ColDef = { field: key, headerName: key };
        this.colDefs.push(obj);
      })
      this.colDefs = [...this.colDefs];
    }
  }

  onClose() {
    this.dialogRef.close(false)
  }
}
