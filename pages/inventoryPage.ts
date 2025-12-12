import { Locator, expect } from "playwright/test";
import { Page } from "playwright-core";
import { BasePage } from "./basePage";
import { ProductItemComponent } from "../utility/components/productItemCoponent";
import data from '../utility/data/products.json' assert { type: 'json' };
import { FooterComponent } from "../utility/components/footerComponent";
import { HeaderComponent } from "../utility/components/headerComponent";

export class InventoryPage extends BasePage{
  
  readonly locatorHeaderTitle: Locator;
  readonly locatorHeaderFilterSelect: Locator;
  readonly items: ProductItemComponent[];
  readonly footer: FooterComponent;
  readonly header: HeaderComponent;

  constructor(page: Page) {
    super(page, "/inventory.html");  
    
    this.locatorHeaderTitle = page.getByTestId('title');
    this.locatorHeaderFilterSelect = page.getByTestId('product-sort-container');

    this.footer = new FooterComponent(this.page);
    this.header = new HeaderComponent(this.page);
    this.items = new Array<ProductItemComponent>();
    
    for(const prod of data.az){
      this.items.push(new ProductItemComponent(this.page, prod))
    }
  }

  validateDefaultLayout = async () => {
    await expect(this.locatorHeaderFilterSelect).toBeVisible();
    await expect(this.locatorHeaderTitle).toBeVisible();
    
    for(const item of this.items){
      await item.validateDefaultUX ();
    }

    await this.header.validateDefaultLayout();
    await this.footer.validateDefaultLayout();
  }
}