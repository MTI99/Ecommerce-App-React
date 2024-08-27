// import React, { useContext, useEffect, useState } from 'react'
// import style from './BrandDetails.module.css'
// import { Link, useParams } from 'react-router-dom';
// import { CartContext } from '../../Context/CartContext';
// import axios from 'axios';




// export default function BrandDetails() {

//   let { id  } = useParams();
//   const [brandDetails, setBrandstDetails] = useState([]);
//   const [isLoading, setIsLoading] = useState(null);

//   let { addProductToCart , setCartCount } = useContext(CartContext);

//   // async function addProductBridge(productId) {

//   //   let finalRes = await addProductToCart(productId);

//   //   if (finalRes.data.status === "success") {
//   //     setCartCount(finalRes.data)
//   //     toast.success(finalRes.data.message , { 
//   //       duration:1000,
//   //       position:"top-right"
//   //     });
//   //   } else {
//   //     toast.error(finalRes.data.message);
//   //   }
//   // }

//   var settings = {
//     dots: true,
//     infinite: true,
//     speed: 1500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//   };

//   var settings2 = {
//     dots: true,
//     infinite: true,
//     speed: 1500,
//     slidesToShow: 4,
//     slidesToScroll: 2,
//     autoplay: true,
//   };

//   function getBrandsDetails(id) {
//     axios
//       .get(`https://ecommerce.routemisr.com/api/v1/brands/${id}`)
//       .then(({ data }) => {
//         setBrandstDetails(data.data);
//         setIsLoading(false);

//       })
//       .catch((error) => {
//         console.log(error);
//         setIsLoading(false);
//       });
//   }
// useEffect(() => {
//   getBrandsDetails(id)
// }, [])


//     console.log(brandDetails);
//   return <>
//   <div className="container my-10 flex h-full align-middle">

//             <div className="inner w-fit px-2 mb-4 m-auto" key={brandDetails._id}>
//               <div className={`${style.productCard}`}>
//                 <Link
//                   to={`/productdetails/${brandDetails.name}/${brandDetails._id}`}
//                 >
//                   <div className={style.logoCart}>
//                     <i className="bx bx-shopping-bag" />
//                   </div>
//                   <div className={style.mainImages}>
//                     <img src={brandDetails.image} alt="Product Image" />
//                   </div>
//                   <div className={`${style.shoeDetails} mt-3 px-3`}>
//                     <span className={style.shoeName}>
//                       {brandDetails.name}
//                     </span>
//                     <p className="text-gray-200">{brandDetails.name}</p>

//                   </div>
//                 </Link>

//               </div>
//             </div>
//   </div>

//     </>
  
// }
