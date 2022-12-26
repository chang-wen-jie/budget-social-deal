import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  products: any;
  filteredProducts: any;
  tabs = [
    { label: 'All'},
    { label: 'Smartphones'},
    { label: 'Laptops'},
    { label: 'Fragrances'}
  ];
  test = [{
    label: 'all',
  }];
  
  async getProducts() {
    let url = 'https://dummyjson.com/products'
    let obj = await (await fetch(url)).json();
    this.products = obj['products'];
    Object.keys(obj['products']).forEach((k) => {
      let category = obj['products'][k]['category']
      if (!this.test.includes({label: category})) {
        console.log('test:', this.test[0]);
        this.test.push({label: category});
      }
    })
    this.filteredProducts = this.products;
  }

  selectTab(selectedTab: any) {
    let tab = selectedTab['tab']['textLabel'].toLowerCase();
    if (selectedTab['index'] === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter((product: { ['category']: string }) => product['category'] === tab);
    }
  }

  public ngOnInit(): void {
    this.getProducts();
  }
}
