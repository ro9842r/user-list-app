import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from '../header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { FirstLetterPipe } from '../../pipes/first-letter.pipe';
import { ButtonModule } from 'primeng/button';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DetailsUserComponent } from '../dialogs/details-user/details-user.component';
import { DialogModule } from 'primeng/dialog';
import { User } from '../models/user.model';
@Component({
  selector: 'app-users',
  imports: [
    TableModule,
    CardModule,
    HeaderComponent,
    InputTextModule,
    AsyncPipe,
    NgFor,
    AvatarModule,
    AvatarGroupModule,
    FirstLetterPipe,
    ButtonModule,
    DynamicDialogModule,
    DialogModule,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  providers: [DialogService],
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UserService);
  searchTerm$ = new BehaviorSubject<string>('');
  users$!: Observable<any>;
  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  ngOnInit(): void {
    this.users$ = combineLatest([
      this.userService.getUsers(),
      this.searchTerm$,
    ]).pipe(
      map(([users, searchterm]) =>
        users.filter((user) =>
          user.name.toLowerCase().includes(searchterm.toLowerCase())
        )
      )
    );
  }

  show(user: User) {
    this.ref = this.dialogService.open(DetailsUserComponent, {
      header: 'More Details',
      width: '50vw',
      modal: true,
      closable: true,
      closeOnEscape: true,
      breakpoints: {
        '960px': '75vw',
        '640px': '90vw',
      },
      data: {
        user,
      },
    });
  }

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(value);
  }
}
