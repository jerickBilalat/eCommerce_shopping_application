
import React, { Component } from 'react';
import ProductList from "./productList";
import Widgets from "../sideWidgets";
import Layout from "../layout/defaultLayout";

import { connect } from 'react-redux';
import {getBrands, getWoods, fetchProducts} from '../../actions/productActions';

class ProductListPage extends Component {

  state = {
    grid:'',
    limit:6,
    skip:0,
    filters:{
      brand:[],
      frets:[],
      wood:[],
      price:[]
    }
  }

  componentDidMount(){
    this.props.dispatch(getBrands());
    this.props.dispatch(getWoods());

    this.props.dispatch(fetchProducts(
        this.state.skip,
        this.state.limit,
        this.state.filters
    ))
  }

  loadMoreProducts = () => {
    const newSkip = this.state.skip + this.state.limit;

    this.props
      .dispatch(
        fetchProducts(
          newSkip,
          this.state.limit,
          this.state.filters,
          this.props.products.toShop
        )
      )
      .then(() => {
        this.setState({
          skip: newSkip
        });
      });
  }

  render() {
    const {products} = this.props;
    const {limit} = this.state;
    
    return (
      <Layout >
        <div className="row">
          <div className="col-sm-12">
            <p className="with-border">Filter ></p>
          </div>
          <div className="col-md-9 col-sm-7">
            <div className="row extra-gutter-right">
              <ProductList toShop={products.toShop} toShopSize={products.toShopSize} limit={limit} loadMoreProducts={this.loadMoreProducts}/>
            </div>
          </div>
          <div className="col-md-3 col-sm-5">
            <Widgets />
            <div className="clearfix"></div>
            <div className="margin-bottom-40"></div>
          </div>
        </div>
      </Layout>
    );
  }
}

const mapStateToProps = state => {
  
  return {
    products: state.products
  };
};

export default connect(mapStateToProps)(ProductListPage);