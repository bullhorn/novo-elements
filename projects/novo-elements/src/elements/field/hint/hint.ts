// NG2
import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'novo-hint',
  templateUrl: './hint.html',
  styleUrls: ['./hint.scss'],
})
export class NovoHintElement implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): any {}
}
