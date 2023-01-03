import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  products = [];
  categorisedProducts = [];
  filteredProducts = [];

  productTabs = [
    {
      label: 'All',
      icon: 'star',
    },
  ];
  selectedProductTab = 'all';

  productSearchForm = this.formBuilder.group({
    query: '',
  });

  constructor(private formBuilder: FormBuilder) {}

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
    this.categorisedProducts = this.products;
  }

  changeProductTab(productTab: any): void {
    this.selectedProductTab = productTab['tab']['textLabel'].toLowerCase();

    if (productTab['index'] === 0) {
      this.categorisedProducts = this.products;
    } else {
      this.categorisedProducts = this.products.filter(
        (product: { ['category']: string }) =>
          product['category'] === this.selectedProductTab
      );
    }
    this.filteredProducts = this.categorisedProducts;
  }

  searchProduct(): void {
    let searchQuery: unknown =
      this.productSearchForm.value['query']?.toLowerCase();

    if (this.selectedProductTab === 'all') {
      this.categorisedProducts = this.products.filter(
        (product: { ['title']: string }) =>
          product['title'].toLowerCase().startsWith(searchQuery as string)
      );
    } else {
      this.categorisedProducts = this.filteredProducts.filter(
        (product: { ['category']: string; ['title']: string }) =>
          product['category'].toLowerCase() === this.selectedProductTab &&
          product['title'].toLowerCase().startsWith(searchQuery as string)
      );
    }
  }

  public ngOnInit(): void {
    this.getProducts();
  }
}
