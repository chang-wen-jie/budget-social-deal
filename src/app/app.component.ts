import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'vouchers';
  products: any;
  filteredProducts: any;
  
  async getProducts() {
    let url = 'https://dummyjson.com/products'
    let obj = await (await fetch(url)).json();
    this.products = obj['products'];
  }

  test(selectedTab: any) {
    let filter = selectedTab['tab']['textLabel'];
    this.filteredProducts = this.products.filter((product: { ['category']: string }) => product['category'] === filter);
  }


  public ngOnInit(): void {
    this.getProducts();
  }
}