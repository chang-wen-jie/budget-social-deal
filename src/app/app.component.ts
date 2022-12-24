import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vouchers';
  filter: string = 'laptops';
  products: any;
  filteredProducts: any;
  
  async get() {
    let url = 'https://dummyjson.com/products'
    let obj = await (await fetch(url)).json();

    this.products = obj['products'];

    this.filteredProducts = this.products.filter((product: { ['category']: string }) => product['category'] === 'laptops');
    console.log(this.filteredProducts)
  }


  public ngOnInit(): void {
    this.get();
  }
}