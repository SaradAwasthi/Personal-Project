import axios from 'axios';

export  class MiraklProductPrice {
//   constructor() {

//   }
  async getProductDetails(productId: any) {
    try {
      const prodDetail = await axios.post('https://mirake-product-price-f4b4o225iq-ue.a.run.app/product-prices/',
        {
          "product_ids": productId
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'secure'
          }
        })

    
      return prodDetail.data
    } catch (err) {
      console.log('Failed to fetch mirakl product detail: ' + err);
      return { err };
    }
  }
}
