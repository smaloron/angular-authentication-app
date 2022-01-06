import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-select-user',
  templateUrl: './select-user.component.html',
  styleUrls: ['./select-user.component.css']
})
export class SelectUserComponent implements OnInit {

  @Input() label: string = 'Responsable';
  @Input() user: string = '';
  @Output() userChange = new EventEmitter();
  

  constructor(public security: AuthenticationService) { }

  ngOnInit(): void {
  }

  onUserSelect(): void {
    this.userChange.emit(this.user);
  }

}
