const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const ProductDetails = {
    createProduct: async ({name,status, packsize,mrp,image,categoryId}) => {
    
        return prisma.product.create({  
          data: {
            name, 
            status,
            packsize,
            mrp,
            image,
            categoryId
          }
        });
      },


      getProductById: async (product_id) => {
        return prisma.product.findUnique({
            where: {
                  id:Number(product_id)
            }
                  
        });
    },

    getAllProduct: async () => {
      return prisma.product.findMany();
  },

    updateProduct: async (product_id, data) => {
        return prisma.product.update({
            where: { 
                  id:Number(product_id)
                 },
            data
        });
    },

    deleteProduct: async (product_id) => {
        return prisma.product.delete({
            where: { 
              id: Number(product_id) 
            }
        });
    }
}



module.exports = ProductDetails;



