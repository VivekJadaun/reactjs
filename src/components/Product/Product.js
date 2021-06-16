import React from "react";

export default class Product extends React.PureComponent {
  render = () => {
    const { id: productId, name, price, preview, variant, inStock, buyerAction, inCart } = this.props;
    return (
      <div className="border-2 border-dark text-dark" data-product-id={productId} data-behaviour="product-item">
        <div class="card mx-2 my-2">
          <div class="row g-0">
            <div class="col-md-4" style={{maxWidth: "100px"}}>
              <img src={preview} className="img-thumbnail" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title">{name}</h5>
                <p class="card-text">${price} {variant}</p>
                {inStock && 
                  <button className="btn btn-secondary" onClick={buyerAction} disabled={inCart}>
                    ADD TO CART
                  </button>
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } 
}