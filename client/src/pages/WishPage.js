import React, { useState, useEffect } from "react";
import Layout from "./../components/Layout/Layout";
import { useWish } from "../context/wish";
import { useAuth } from "../context/auth";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/cart";
import toast from "react-hot-toast";

const WishPage = () => {
    const navigate = useNavigate();
  const [auth, setAuth] = useAuth();
  const [wish, setWish] = useWish();
  const [cart, setCart] = useCart();

  
  


  //detele item
  const removeWishItem = (pid) => {
    try {
      let myWish = [...wish];
      let index = myWish.findIndex((item) => item._id === pid);
      myWish.splice(index, 1);
      setWish(myWish);
      localStorage.setItem("wish", JSON.stringify(myWish));
    } catch (error) {
      console.log(error);
    }
  };

  

  
  return (
    <Layout>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h1 className="text-center bg-light p-2 mb-1">
              {`Wishlist ${auth?.token && auth?.user?.name}`}
            </h1>
            <h4 className="text-center">
            {wish?.length
                ? `You Have ${wish.length} items in your wish ${
                    auth?.token ? "" : ""
                  }`
                : " Your Wish Is Empty"}
            </h4>
          </div>
        </div>
        <div className="row">
          <div className="col-md-8">
            {wish?.map((p) => (
              <div className="row mb-2 p-3 card flex-row" key={p._id}>
                <div className="col-md-4">
                  <img
                    src={`/api/v1/product/product-photo/${p._id}`}
                    className="card-img-top"
                    alt={p.name}
                    width="100px"
                    height={"100px"}
                  />
                </div>
                <div className="col-md-8">
                  <p>{p.name}</p>
                  <p>{p.description.substring(0, 30)}</p>
                  <p>Price : ${p.price}</p>
                  <button
                    className="btn btn-danger"
                    onClick={() => removeWishItem(p._id)}
                  >
                    Remove
                        </button>                       
                  <button
                    className="btn btn-primary ms-1"
                    onClick={() => navigate(`/product/${p.slug}`)}
                  >
                    More Details
                  </button>
                  <button
                    className="btn btn-secondary ms-1"
                    onClick={() => {
                      setCart([...cart, p]);
                      localStorage.setItem(
                        "cart",
                        JSON.stringify([...cart, p])
                      );
                      toast.success("Item Added to cart");
                    }}
                  >
                    ADD TO CART
                  </button>
                </div>
              </div>
            ))}
          </div>
          
              
            </div>
          </div>
        
      
    </Layout>
  );
};

export default WishPage;