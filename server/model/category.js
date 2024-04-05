const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const categoryDetails = 
{
    createCategory: async ({name, description, status}) => {
    
        return prisma.category.create({  
          data: {
            name, 
            description, 
            status, 
          
          }
        });
      },


      getCategoryById: async (category_id) => {
        return prisma.category.findUnique({
            where: {
                  id:Number(category_id)
            }
                  
        });
    },

    getAllCategory: async () => {
      return prisma.category.findMany();
  },

    updateCategory: async (category_id, data) => {
        return prisma.category.update({
            where: { 
                  id:Number(category_id)
                 },
            data
        });
    },

    deleteCategory: async (category_id) => {
        return prisma.category.delete({
            where: { 
              id: Number(category_id) 
            }
        });
    }
}



module.exports = categoryDetails;



