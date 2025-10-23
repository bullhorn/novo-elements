// NG2
import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
    selector: 'novo-error',
    templateUrl: './error.html',
    styleUrls: ['./error.scss'],
    standalone: false
})
export class NovoErrorElement implements OnInit {
  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): any {}
}
