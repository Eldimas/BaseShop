import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { DialogData } from '../categories.component';
import { Product } from 'app/main/products/product.model';

@Component({
  selector: 'app-dialog-edit-cat',
  templateUrl: './dialogEditCat.component.html',
  styleUrls: ['./dialogEditCat.component.scss']
})
export class DialogEditCatComponent implements OnInit {

  newProduct: Product;

  constructor(
    public dialogRef: MatDialogRef<DialogEditCatComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Product) {
      this.newProduct = new Product(data);
    }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  

}
