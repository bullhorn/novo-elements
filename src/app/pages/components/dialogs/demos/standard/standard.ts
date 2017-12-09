import { Component, Inject } from '@angular/core';
import { NovoDialog, NovoDialogRef, NOVO_DIALOG_DATA } from '../../../../../../platform';

@Component({
  selector: 'dialog-data-example-dialog',
  template: `
    <novo-card class="example-card">
      <header theme="white">
        <novo-icon>bull</novo-icon>
        <h1>bul·ly</h1>
        <small>ˈ/bo͝olē/ informal</small>
        <novo-action icon="times" (click)="close()"></novo-action>
      </header>
      <img novo-card-image src="/assets/bully-ng.png" alt="Photo of a Bully the Bullhorn Developer Mascot">
      <main>
        <div caption>adjective</div>
        <div>
          <strong>adjective: </strong> bully | NORTH AMERICAN |
          <em>informal</em>
        </div>
        <p>
          1. very good; first-rate.
          <em>"the statue really looked bully"</em>
        </p>
        <div caption>exclamation</div>
        <div>
          <strong>exclamation</strong>: bully</div>
        <p>
          1. an expression of admiration or approval.
          <em>"he got away—bully for him"</em>
        </p>
      </main>
      <footer>
        <button theme="dialogue">LIKE</button>
        <button theme="dialogue">SHARE</button>
      </footer>
    </novo-card>
  `,
})
export class ExampleDialogComponent {
  constructor(public dialogRef: NovoDialogRef<ExampleDialogComponent>, @Inject(NOVO_DIALOG_DATA) public data: any) { }

  public close(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'demo-dialog-standard',
  templateUrl: './standard.html',
})
export class DemoDialogStandardComponent {
  constructor(public dialog: NovoDialog) { }

  public openDialog(): void {
    this.dialog.open(ExampleDialogComponent, {
      data: {
        animal: 'bully',
      },
    });
  }

  public openAlert(): void {
    this.dialog.openAlert({
      message: 'This is how simple it is to create an alert with this wrapper service.',
      // disableClose: true | false, // defaults to false
      title: 'Alert', // OPTIONAL, hides if not provided
      closeButton: 'Close', // OPTIONAL, defaults to 'CLOSE'
    });
  }

  public openConfirm(): void {
    this.dialog.openConfirm({
      title: 'Confirm', // OPTIONAL, hides if not provided
      message: 'This is how simple it is to create a confirm with this wrapper service. Do you agree?',
      // disableClose: true | false, // defaults to false
      cancelButton: 'Disagree', // OPTIONAL, defaults to 'CANCEL'
      acceptButton: 'Agree', // OPTIONAL, defaults to 'ACCEPT'
    }).afterClosed().subscribe((accept: boolean) => {
      if (accept) {
        // DO SOMETHING
      } else {
        // DO SOMETHING ELSE
      }
    });
  }
  public openNotification(): void {
    this.dialog.openNotification({
      type: 'warning',
      title: 'This action will delete 25 records.', // OPTIONAL, hides if not provided
      message: 'Are you sure you wish to continue?',
      // disableClose: true | false, // defaults to false
      buttons: ['Disagree', 'Agree'], // OPTIONAL, defaults to 'CANCEL'
    }).afterClosed().subscribe((choice: string) => {
      if (choice) {
        alert(`You chose: ${choice}`);
      }
    });
  }
}
