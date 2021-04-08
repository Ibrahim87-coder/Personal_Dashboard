import { Injectable, OnDestroy } from '@angular/core';
import { fromEvent, Subscription } from 'rxjs';
import { Note } from './note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService implements OnDestroy{
  notes: Note[] = [
  ];

  storageListenSub?: Subscription
  event?:StorageEvent
  constructor() {
    this.loadState();
    this.storageListenSub= fromEvent(window,'storage').subscribe(()=>{
      if(this.event?.key==='notes') this.loadState()
    })
  }


  ngOnDestroy(){
    if(this.storageListenSub) this.storageListenSub.unsubscribe()
  }

  getNotes() {
    return this.notes;
  }
  
  getNote(id: string) {
    return this.notes.find((n) => n.id === id);
  }

  addNote(note: Note) {
    this.notes = this.notes
    this.notes.push(note);

    this.saveState();
  }

  updateNote(id: string, updatedFields: Partial<Note>) {
    const note = this.getNote(id);
    Object.assign(note, updatedFields);

    
    this.saveState();
  }

  deleteNote(id: string) {
    const noteIndex = this.notes.findIndex((n) => n.id === id);
    if (noteIndex == -1) return;

    this.notes.splice(noteIndex, 1);

    
    this.saveState();
  }

  saveState(){
    localStorage.setItem('notes',JSON.stringify(this.notes))
  }

  loadState(){
    try {
      const noteInStorage = JSON.parse(localStorage.getItem('notes')!)
      // if(!noteInStorage)return

      this.notes.length = 0
      this.notes.push(...noteInStorage)
    } catch (e) {
      console.log("error")
      console.log(e)
    }
   
  }
}
