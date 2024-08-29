import React, { useContext, useEffect, useState } from "react";
import style from "./ProductDetails.module.css";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { WishlistContext } from "../../Context/WishListContext";

export default function ProductDetails() {
  let { id, category } = useParams();
  const [productDetails, setProductDetails] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(null);

  let { addProductToCart, setCartCount } = useContext(CartContext);
  const { wishlist, addToWishlist, removeFromWishlist , getWishData } =
    useContext(WishlistContext);
  async function addProductBridge(productId) {
    let finalRes = await addProductToCart(productId);

    if (finalRes.data.status === "success") {
      setCartCount(finalRes.data.numOfCartItems);
      toast.success(finalRes.data.message, {
        duration: 1000,
        position: "top-right",
      });
    } else {
      toast.error(finalRes.data.message);
    }
  }

  var settings = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
  };

  var settings2 = {
    dots: true,
    infinite: true,
    speed: 1500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
  };

  function getProductDetails(id) {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }

  function getRelatedProducts(category) {
    axios
      .get("https://ecommerce.routemisr.com/api/v1/products")
      .then(({ data }) => {
        let allData = data.data;
        let related = allData.filter(
          (product) => product.category.name == category
        );
        setRelatedProducts(related);
        console.log(relatedProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const [isInWishlist, setIsInWishlist] = useState({}); 
  useEffect(() => {
    const updatedIsInWishlist = {};
    wishlist?.forEach((product) => {
      updatedIsInWishlist[product._id] = true;
    });
    setIsInWishlist(updatedIsInWishlist);
  }, [wishlist]);
  function handleWishlistToggle(product) {
    if (isInWishlist[product._id]) {
      removeFromWishlist(product._id);
      setIsInWishlist((prevState) => ({
        ...prevState,
        [product._id]: false,
      }));
    } else {
      addToWishlist(product);
      setIsInWishlist((prevState) => ({
        ...prevState,
        [product._id]: true,
      }));
    }
  }



  useEffect(() => {
    setIsLoading(true);

    getProductDetails(id);
    getRelatedProducts(category);
  }, [id]);

  return (
    <>
      {isLoading ? (
        <div className="loader-container">
          <div className="loader"></div>
        </div>
      ) : null}
      <h2 className="mx-auto text-3xl text-center my-16 font-bold border-b-2 pb-2 border-blue-500 w-fit">
        Product Details
      </h2>
      <div className="flex p-8 max-w-5xl mx-auto gap-8 justify-center my-10">
        <div className="w-1/2">
          <Slider {...settings}>
            {productDetails?.images?.map((imgSrc) => (
              <img
                src={imgSrc}
                alt={productDetails?.title}
                className="w-full h-auto rounded-lg shadow-lg"
                key={productDetails.id}
              />
            ))}
          </Slider>
        </div>
        <div className="flex-1 self-center">
          <h1 className="text-3xl font-bold mb-4">{productDetails?.title}</h1>
          <p className="text-lg mb-6">{productDetails?.description}</p>
          <div className="text-xl font-semibold mb-6 flex justify-between">
            <div>{productDetails?.price}$</div>
            <div className="text-yellow-400 flex justify-end">
              <span className="text-black me-1">
                {productDetails.ratingsAverage}
              </span>
              <i className="fa-solid fa-star flex self-center"></i>
            </div>
          </div>
          <button
                  onClick={() => handleWishlistToggle(productDetails)}
                  className=" px-2 py-5 m-auto flex justify-between"
                >
                  <i
                    className="fa-solid fa-heart self-center pe-2"
                    style={{
                      color: isInWishlist[productDetails._id] ? "red" : "black",
                    }}
                  ></i>
                  <span className="text-sm">
                    {isInWishlist[productDetails._id] ? "Remove From Wishlist" : "Add to Wishlist"}
                  </span>
                </button>
          <div className={style.button}>
            <div className={style.buttonLayer} />
            <button onClick={() => addProductBridge(productDetails._id)}>
              Add To Cart
            </button>
          </div>
        </div>
      </div>

      <h2 className="mx-auto text-3xl text-center my-10 font-bold border-b-2 pb-2 border-blue-500 w-fit">
        You May Also Like
      </h2>
      <div className="container">
        <Slider {...settings2}>
          {relatedProducts.map((product) => (
            <div className="inner w-1/6 px-2 mb-4" key={product._id}>
              <div className={`${style.productCard}`}>
                <Link
                  to={`/productdetails/${product.category.name}/${product.id}`}
                >
                  <div className={style.logoCart}>
                    <i className="bx bx-shopping-bag" />
                  </div>
                  <div className={style.mainImages}>
                    <img src={product.imageCover} alt="Product Image" />
                  </div>
                  <div className={`${style.shoeDetails} mt-3 px-3`}>
                    <span className={style.shoeName}>
                      {product.title.split(" ").slice(0, 2).join(" ")}
                    </span>
                    <p className="text-gray-200">{product.category.name}</p>
                    <div className="text-yellow-400 flex justify-end">
                      <span className="text-black me-1">
                        {product.ratingsAverage}
                      </span>
                      <i className="fa-solid fa-star flex self-center"></i>
                    </div>
                  </div>
                  <div className={style.price}>
                    <span className={style.priceNum}>{product.price} EGP</span>
                  </div>
                </Link>
                <button
                  onClick={() => handleWishlistToggle(product)}
                  className=" px-2 py-5 m-auto flex justify-between"
                >
                  <i
                    className="fa-solid fa-heart self-center pe-2"
                    style={{
                      color: isInWishlist[product._id] ? "red" : "black",
                    }}
                  ></i>
                  <span className="text-sm">
                    {isInWishlist[product._id] ? "Remove From Wishlist" : "Add to Wishlist"}
                  </span>
                </button>
                
                <div className={style.buttonContainer}>
                  <div className={style.button}>
                    <div className={style.buttonLayer} />
                    <button onClick={() => addProductBridge(product._id)}>
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </>
  );
}
