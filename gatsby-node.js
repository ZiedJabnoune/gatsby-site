/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

exports.createPages = async ({ actions: { createPage }, graphql }) => {
    createPage({
        path: "/no-data/",
        component: require.resolve("./src/templates/no-data.js")
    });
    createPage({
        path: '/with-context/',
        component: require.resolve('./src/templates/with-context.js'),
        context: {
            name: "zied"
        }
    });
    const products = require('./data/products.json')
    products.forEach(product => {
        createPage({
            path: `/products/${product.slug}`,
            component: require.resolve('./src/templates/product.js'),
            context: {
                title: product.title,
                description: product.description,
                price: product.price,
                image: product.image
            }
        })
    });

    await graphql(`
    {
        allProductsGraphqlJson {
          edges {
            node {
              slug
            }
          }
        }
      }      
    `).then(result => {
        result.data.allProductsGraphqlJson.edges.forEach(edge => {
            const product = edge.node
            createPage({
                path:`/products/graphql/${product.slug}`,
                component : require.resolve('./src/templates/product-graphql.js'),
                context : {
                    slug : product.slug
                }
            })
        })
    })
}
