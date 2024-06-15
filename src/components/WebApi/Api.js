export default {

   //Doctor

   doctorSignUp: "http://localhost:3000/doctor/sign-up",
   doctorSignIn: "http://localhost:3000/doctor/sign-in",
   doctorProfileUpdate: "http://localhost:3000/doctor/update-profile",
   changePassword: 'http://localhost:3000/doctor/change-password',
   addProfilePicture: 'http://localhost:3000/doctor/add-profile-picture',
   addDoctorDetails: 'http://localhost:3000/doctor/add-doctor-details',
   getDoctorDetails: 'http://localhost:3000/doctor/get-doctor-details',


   //Admin

   adminSignIn: 'http://localhost:3000/admin/sign-in',
   getPendingDoctor: 'http://localhost:3000/admin/get-pending-doctor',
   approveDoctorRequestAccept: 'http://localhost:3000/admin/approve-doctor-request-accept',
   approveDoctorRequestReject: 'http://localhost:3000/admin/approve-doctor-request-reject',

   //User

   userSignUp: "http://localhost:3000/user/signup",
   userSignIn: "http://localhost:3000/user/signin",
   getAllProduct: "http://localhost:3000/product/getall",
   addToCart: "http://localhost:3000/cart/add-to-cart",
   getCart: "http://localhost:3000/cart/getCart",

   //Product

   addOneProduct: "http://localhost:3000/product/addone",
   getAllProduct: 'http://localhost:3000/product/getall',


   //Category

   getCategory: "http://localhost:3000/category/get-category",
   addOneCategory: "http://localhost:3000/category/addone",
   saveInBulkCategory: "http://localhost:3000/category/save-in-bulk",
   deleteCategory: 'http://localhost:3000/category/delete-category',

   //Cart

   addToCart: 'http://localhost:3000/cart/add-to-cart',
   showCart: 'http://localhost:3000/cart/getCart',
   updateQuantiy: "http://localhost:3000/cart/product-quantity",
   removeFromCart: "http://localhost:3000/cart/removeCart",

   //Order 
   addOrder: 'http://localhost:3000/order/add-order',
   getOrderDetails: 'http://localhost:3000/order/get-order-details',

   //Yoga
   getAllYoga: "http://localhost:3000/yoga/getAll",
   deleteYoga: "http://localhost:3000/yoga/removeYogaByName?yogaName",
   deleteYogaById: "http://localhost:3000/yoga/removeYogaById",

   AddYoga: "http://localhost:3000/yoga/addYoga",
   BulkAddYoga: "http://localhost:3000/yoga/add-in-bulk-yoga",
   UpdateYogaByName: "http://localhost:3000/yoga/updateYogaByName?yogaName",

   UpdateYogaById: "http://localhost:3000/yoga/updateYogaById",

   getCategory: "http://localhost:3000/category/get-category",
   getReviewForYoga:'http://localhost:3000/yoga/get-review-for-yoga',
   addRateAndReviewUserYoga:"http://localhost:3000/yoga/add-yoga-review",
   getReviewForYogaByUser:"http://localhost:3000/yoga/getYogaReview",
   updateYogaReviewAndRating:"http://localhost:3000/yoga/updateYogaReview",
   //Review  And Rating 

   addRateAndReviewUser: "http://localhost:3000/rate-review/add-user-review-and-rating",
   getProductReviewAndRating: "http://localhost:3000/rate-review/get-product-review",
   updateReviewAndRating:'http://localhost:3000/rate-review/change-review'
}