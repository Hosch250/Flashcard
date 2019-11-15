import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
@Component({
    selector: 'tag-dialog',
    templateUrl: './tag-dialog.component.html',
})
export class TagDialog {
    constructor(public dialogRef: MatDialogRef<TagDialog>) { }
}
