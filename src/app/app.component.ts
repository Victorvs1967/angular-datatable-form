import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { DialogBoxComponent } from './components/dialog-box/dialog-box.component';
import { user } from './model/user.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  name: string = '';
  
  columnsToDisplay: string[] = ["userName", "email", "actions"];
  
  public USER_DATA: user[] = [];
  public newUser = { userName: "Victor", email: "victor@mail.me" };
  public dataArray: any;

  constructor(public dialog: MatDialog) {
    this.dataArray = new MatTableDataSource<user>([ ...this.USER_DATA ])
  }

  addUser() {
    const newUsersArray = this.USER_DATA;
    newUsersArray.push(this.newUser);
    this.dataArray = [ ...newUsersArray ];
    this.newUser = { userName: "Nata", email: "nata@mail.me" };
  }

  openDialog(user: user) {
    let dialogRef = this.dialog.open(DialogBoxComponent, {
      width: '250px',
      data: { name: this.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.name = result;
      if (this.name != undefined) {
        if (this.name == "") {
          Swal.fire('Username cannot be empty..!');
        } else {
          user.userName = this.name;
          const newUserArray = this.USER_DATA;
          this.dataArray = [ ...newUserArray ];
          Swal.fire('Updated successfully..!');
        }
      }
    });
  }

  delete(user: user) {
    this.USER_DATA = this.USER_DATA.filter((value, key) => value.email != user.email);
    this.dataArray = [ ...this.USER_DATA ];
    Swal.fire('Deleted successfully..!');
  }

}
