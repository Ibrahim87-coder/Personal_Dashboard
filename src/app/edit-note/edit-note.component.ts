import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Note } from '../shared/note.model';
import { NoteService } from '../shared/note.service';

@Component({
  selector: 'app-edit-note',
  templateUrl: './edit-note.component.html',
  styleUrls: ['./edit-note.component.scss']
})
export class EditNoteComponent implements OnInit {

  constructor(private noteService : NoteService ,private route:ActivatedRoute, private router : Router) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap)=>{
      const idParam = paramMap.get('id')
      console.log(idParam)

      const note = this.noteService.getNote(idParam!);
      console.log("This is the note");
      console.log(note);

    })
  }
  onFormSubmit(form: NgForm){

    if(form.invalid) return alert("Please enter a Note Title ( !! Title must be at least 3 characters ) !!")
    const note = new Note(form.value.title,form.value.content)
    this.noteService.addNote(note)
    this.router.navigateByUrl("/notes")
  }
}
