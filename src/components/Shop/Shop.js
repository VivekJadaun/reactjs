import React from "react";

import Product from '../Product/Product';
import Cart from '../Cart/Cart';

import { products } from "../../constants/app-defaults"; 

export default class Shop extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      productsInCart: [],
    };
  }

  addToCart = (event) => {
    const selectedProduct = event.target.closest('[data-behaviour="product-item"]').getAttribute('data-product-id');
    const { productsInCart } = this.state;
    this.setState({ productsInCart: productsInCart.concat([selectedProduct])});
  }

  removeFromCart = (event) => {
    const selectedProduct = event.target.closest('[data-behaviour="product-item"]').getAttribute('data-product-id');
    const { productsInCart } = this.state;
    this.setState({ productsInCart: productsInCart.filter((product) => product !== selectedProduct)});
  }

  renderProducts = () => products.map((product) => <Product {...product} 
      key={product.id} 
      buyerAction={this.addToCart}
      inCart={this.state.productsInCart.includes(product.id)} 
    />);

  renderCart = () => (<Cart
    products={products.filter(({id: productId}) => this.state.productsInCart.includes(productId))} 
    buyerAction={this.removeFromCart}
  />);

  render = () => {
    const styles = {overflowY: "auto", height: "700px"};
    return (
      <div className="d-flex container-fluid">
        <div className="col-8 " style={styles} tabindex="0">
          { this.renderProducts() }
        </div>
        <div className="col-4" style={styles}>
          { this.renderCart() }
        </div>
      </div>
    );
  }	
}