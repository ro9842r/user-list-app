import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-details-user',
  imports: [DialogModule, ButtonModule],
  templateUrl: './details-user.component.html',
  styleUrl: './details-user.component.scss',
})
export class DetailsUserComponent {
  data: any;
  constructor(public config: DynamicDialogConfig) {
    this.data = this.config.data.user;
    console.log(this.data);
  }
}
