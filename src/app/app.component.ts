import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products = [];
  filteredProducts = [];
  productTabs = [
    {
      label: 'All',
      icon: 'star',
    },
  ];

  async getProducts() {
    let url = 'https://dummyjson.com/products';
    let obj = await (await fetch(url)).json();
    this.products = obj['products'];

    Object.keys(obj['products']).forEach((k) => {
      let category = obj['products'][k]['category'];
      let icon = '';

      switch (category) {
        case 'smartphones':
          icon = 'phone_iphone';
          break;
        case 'laptops':
          icon = 'laptop_mac';
          break;
        case 'fragrances':
          icon = 'air_freshener';
          break;
        case 'skincare':
          icon = 'sanitizer';
          break;
        case 'groceries':
          icon = 'shopping_cart';
          break;
        case 'home-decoration':
          icon = 'chair';
          break;
      }

      this.productTabs.push({
        label: category.charAt(0).toUpperCase() + category.slice(1),
        icon: icon,
      });
    });

    this.productTabs = this.productTabs.filter(
      (obj, index) =>
        this.productTabs.findIndex((o) => o.label === obj.label) === index
    );

    this.filteredProducts = this.products;
    console.log(this.filteredProducts);
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
