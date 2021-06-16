import React from "react";

export default class Cart extends React.PureComponent {
  render = () => {
    const { products, buyerAction } = this.props;
    const cartTotal = products.reduce((accumulator, { price }) => accumulator + price, 0);

    return (
      <div>
        <div className="text-left ">Cart : ${cartTotal}</div>
        {
          products.map(({ id: productId, name, price, preview, variant }) => (
            <div className="border-2 border-top border-dark text-dark"  data-product-id={productId} data-behaviour="product-item">
              <div class="card mx-2 my-2">
                <div class="row g-0">
                  <div class="col-md-4" style={{maxWidth: "100px"}}>
                    <img src={preview} className="img-thumbnail" />
                  </div>
                  <div class="col-md-8">
                    <div class="card-body">
                      <h5 class="card-title">{name}</h5>
                      <p class="card-text">{price} {variant}</p>
                      <p class="text-danger btn" onClick={buyerAction}>REMOVE</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        }
      </div>
    );
  } 
}