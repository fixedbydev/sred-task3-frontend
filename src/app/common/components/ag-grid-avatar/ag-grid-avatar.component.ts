import { Component } from '@angular/core';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-ag-grid-avatar',
  imports: [],
  templateUrl: './ag-grid-avatar.component.html',
  styleUrl: './ag-grid-avatar.component.scss'
})
export class AgGridAvatarComponent {
  public params!: ICellRendererParams;
  public avatarUrl: string = '';
  public userName: string = '';
  

  agInit(params: ICellRendererParams): void {
    this.params = params;
    // Assuming the 'avatar' and 'name' fields exist in your row data
    this.avatarUrl = params?.value;  // Replace with the correct field for avatar image URL
  }

  // This function will be called when the component is destroyed
  refresh(params: ICellRendererParams): boolean {
    this.agInit(params);
    return true;
  }
}
