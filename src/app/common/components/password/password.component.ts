import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDividerModule } from '@angular/material/divider';
import { ApiService } from '../../services/api.service';
import { ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDialogActions, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-password',
  imports: [MatExpansionModule, MatButtonModule, MatInputModule, ReactiveFormsModule, MatToolbarModule, MatIconModule, MatDialogContent, MatDialogActions, MatDividerModule],
  templateUrl: './password.component.html',
  styleUrl: './password.component.scss'
})
export class PasswordComponent {

  passwordFormGroup: UntypedFormGroup =new UntypedFormGroup({
    password: new UntypedFormControl(null)
  })

  constructor(
    private _apiService: ApiService,
    public dialogRef: MatDialogRef<PasswordComponent>,
  ) { }

  onSubmit() {
    if(this.passwordFormGroup.valid) {
      this._apiService.fetchCookie(this.passwordFormGroup.value).subscribe(res => {
        if(res) {
          this.dialogRef.close(true)
        }
      })
    }
  }

  onClose() {
    this.dialogRef.close(false)
  }
}
