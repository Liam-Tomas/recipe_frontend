// // import React, { useEffect, useState } from 'react';
// // import Recipe from './Recipe';

// // function RecipeList({ searchTerm }) {
// //     const [searchResults, setSearchResults] = useState([]);

// //     useEffect(() => {
// //         if (searchTerm) {
// //             fetch(`http://localhost:3000/recipes?query=${searchTerm}`)
// //                 .then((response) => response.json())
// //                 .then((data) => {
// //                     setSearchResults(data.recipes);
// //                 })
// //                 .catch((error) => {
// //                     console.error('Error:', error);
// //                 });
// //         } else {
// //             setSearchResults([]);
// //         }
// //     }, [searchTerm]);

// //     return (
// //         <div>
// //             {searchResults.length > 0 ? (
// //                 <div style={{
// //                     margin:'25px'
// //                 }}>
// //                     {/* <h2>Search Results:</h2> */}
// //                     <ul className="recipe-list" style={{
// //                         display: 'grid',
// //                         gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
// //                         listStyle: 'none',
// //                         padding: '0',
// //                         margin: '0',
// //                         gap: '20px',
// //                     }}>
// //                         {searchResults.map((recipe) => (
// //                             <Recipe key={recipe.id} recipe={recipe} />
// //                         ))}
// //                     </ul>
// //                 </div>
// //             ) : (
// //                 <p>No results found.</p>
// //             )}
// //         </div>
// //     );
// // }

// // export default RecipeList;

// import React, { useEffect, useState } from 'react';
// import Recipe from './Recipe';

// function RecipeList({ searchTerm }) {
//   const [searchResults, setSearchResults] = useState([]);

//   useEffect(() => {
//     if (searchTerm) {
//       fetch(`http://localhost:3000/recipes/search?query=${searchTerm}`)
//         .then((response) => response.json())
//         .then((data) => {
//           setSearchResults(data.recipes);
//         })
//         .catch((error) => {
//           console.error('Error:', error);
//         });
//     } else {
//       setSearchResults([]);
//     }
//   }, [searchTerm]);

//   return (
//     <div>
//       {searchResults && searchResults.length > 0 ? (
//         <div style={{ margin: '25px' }}>
//           <ul
//             className="recipe-list"
//             style={{
//               display: 'grid',
//               gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//               listStyle: 'none',
//               padding: '0',
//               margin: '0',
//               gap: '20px',
//             }}
//           >
//             {searchResults.map((recipe) => (
//               <Recipe key={recipe.id} recipe={recipe} />
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <p>No results found.</p>
//       )}
//     </div>
//   );
// }

// export default RecipeList;
