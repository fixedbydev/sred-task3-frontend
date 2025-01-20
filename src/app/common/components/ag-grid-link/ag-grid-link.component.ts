import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-link',
  imports: [],
  templateUrl: './ag-grid-link.component.html',
  styleUrl: './ag-grid-link.component.scss'
})
export class AgGridLinkComponent {
  public params!: ICellRendererParams;
  public url: string = '';

  agInit(params: ICellRendererParams): void {
    this.params = params;
    this.url = params.value;  // Assuming the 'url' field exists in your row data
  }

  // This function will be called when the component is destroyed
  refresh(params: ICellRendererParams): boolean {
    this.agInit(params);
    return true;
  }
}
