import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-options',
  templateUrl: './options.component.html',
  styleUrls: ['./options.component.scss'],
})
export class OptionsComponent implements OnInit {
  
  @Output() onClose = new EventEmitter<boolean>()
  @Output() onAction = new EventEmitter<boolean>()

  @Input() modal = {}

  constructor() { }

  ngOnInit() {}

  closeModal(){
    this.onClose.emit(false)
  }

  normalSignUp(){
    this.onAction.emit(false)
  }

}
