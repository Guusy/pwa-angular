import {Component, OnInit} from '@angular/core';
import {SwUpdate} from '@angular/service-worker';
import {NoteService} from '../services/note.service';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Homer App';
  panelOpenState: boolean = false;
  categorias: any = ['Trabajo', 'Personal' ] ;
  nota: any = {};
  constructor(private swUpdate: SwUpdate, private noteService: NoteService,public snackBar: MatSnackBar) {

  }
  ngOnInit(): void {
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        window.location.reload();
      });
    }
  }
  guardarNota(){
    this.nota.id = Date.now();
    this.noteService.createNote(this.nota).
    then(()=>{
      this.nota ={};

        this.snackBar.open("Nota Creada !", null, {
          duration: 2000,
        });
    })
      .catch(error=>console.log(error))
  }
}
