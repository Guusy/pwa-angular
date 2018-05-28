import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {NoteService} from '../services/note.service';
import { MatSnackBar} from '@angular/material';
import {MatDialog} from '@angular/material';
import {ConfirmDialog} from '../dialog/dialog.component';
import {AuthService} from '../services/auth.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Homer App';
  panelOpenState = false;
  categorias: any = ['Trabajo', 'Personal' ] ;
  nota: any = {};
  notas: any = [];
  constructor(private swUpdate: SwUpdate,
              private noteService: NoteService,
              public snackBar: MatSnackBar,
              public authService: AuthService,
              public dialog: MatDialog) {
    this.noteService.getNotes().valueChanges()
      .subscribe((fbNotas) => {
        this.notas = fbNotas;
        console.log(this.notas);
      });
  }
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }
  guardarNota() {
    if (this.nota.id) {
      this.nota.id = Date.now();

    }
    this.noteService.createNote(this.nota).
    then(() => {
      this.nota = {};
        this.mostarSnackBar('Nota Creada !' );

    })
      .catch(error => console.log(error));
  }
  seleccionarNota(nota) {
    this.nota = nota;
  }
  eliminarNota(id) {
    const dialogRef = this.dialog.open(ConfirmDialog);

    dialogRef.afterClosed().subscribe(yes => {
      if(yes){
        this.noteService.deleteNote(id)
          .then(() => {
            this.mostarSnackBar('Nota eliminada !');
          });
      }

    });

  }
  login(){
  this.authService.loginFacebook();
  }
  mostarSnackBar(message: string) {
    this.snackBar.open(message, null, {
      duration: 2000,
    });
  }
}



