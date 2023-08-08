// // main.js
// console.log('JS ENLAZADO');
// document.addEventListener('DOMContentLoaded', () => {
//   const cardContainer = document.getElementById('card-serum-container');

//   // Fetch data from MongoDB (using Handlebars template)
//   fetch('http://localhost:8082/products')
//     .then(response => response.json())
//     .then(data => {
//       // The 'data' variable contains the MongoDB data
//       console.log(data);

//       // Define your Handlebars template
//       const source = `
//         <div class="card-container"> <!-- Agregamos el contenedor de las tarjetas -->
//           {{#each products}}
//             <div class="card">
//               <!-- Contenido de la tarjeta -->
//             </div>
//           {{/each}}
//         </div>
//       `;

//       // Compile the Handlebars template
//       const template = Handlebars.compile(source);

//       // Render the template with the data
//       const html = template({ products: data });

//       // Append the rendered HTML to the card container
//       cardContainer.innerHTML = html;
//     })
//     .catch(error => {
//       console.error('Error fetching data from MongoDB:', error);
//     });
// });
