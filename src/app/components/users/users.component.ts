import { Component, inject, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { HeaderComponent } from '../header/header.component';
import { InputTextModule } from 'primeng/inputtext';
import { BehaviorSubject, combineLatest, map, Observable } from 'rxjs';
import { AsyncPipe, NgFor } from '@angular/common';

@Component({
  selector: 'app-users',
  imports: [
    TableModule,
    CardModule,
    HeaderComponent,
    InputTextModule,
    AsyncPipe,
    NgFor,
  ],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
})
export class UsersComponent implements OnInit {
  private readonly userService = inject(UserService);
  searchTerm$ = new BehaviorSubject<string>('');
  users$!: Observable<any>;

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

  onSearch(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.searchTerm$.next(value);
  }
}
