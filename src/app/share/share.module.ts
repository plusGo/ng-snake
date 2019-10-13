import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatButtonModule, MatCardModule, MatDialogModule, MatListModule, MatSnackBarModule} from '@angular/material';
import {SuccessModalComponent} from './success-modal/success-modal.component';


@NgModule({
  declarations: [SuccessModalComponent],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    MatSnackBarModule,
    MatDialogModule
  ],
  exports: [
    MatDialogModule,
    MatSnackBarModule,
    MatButtonModule,
    MatCardModule,
    MatListModule,
    SuccessModalComponent
  ],
  entryComponents: [SuccessModalComponent]
})
export class ShareModule {
}
