import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products: any;
  filteredProducts: any;
  productTabs = [{ label: 'All' }];

  async getProducts() {
    let url = 'https://dummyjson.com/products';
    let obj = await (await fetch(url)).json();
    this.products = obj['products'];

    Object.keys(obj['products']).forEach((k) => {
      let category = obj['products'][k]['category'];
      this.productTabs.push({
        label: category.charAt(0).toUpperCase() + category.slice(1),
      });
    });

    this.productTabs = this.productTabs.filter(
      (obj, index) =>
        this.productTabs.findIndex((o) => o.label === obj.label) === index
    );
    this.filteredProducts = this.products;
  }

  selectTab(selectedTab: any) {
    let tab = selectedTab['tab']['textLabel'].toLowerCase();

    if (selectedTab['index'] === 0) {
      this.filteredProducts = this.products;
    } else {
      this.filteredProducts = this.products.filter(
        (product: { ['category']: string }) => product['category'] === tab
      );
    }
  }

  public ngOnInit(): void {
    this.getProducts();
  }
}
