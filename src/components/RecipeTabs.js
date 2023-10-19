// import React, { useState } from 'react';
// import { Tabs, Tab } from '@mui/material';
// import { useTheme } from '@mui/material/styles';

// const RecipeTabs = ({ categories, onCategoryChange }) => {
//   const [value, setValue] = useState(0);
//   const theme = useTheme();

//   const handleChange = (event, newValue) => {
//     setValue(newValue);
//     onCategoryChange(categories[newValue]);
//   };

//   return (
//     <div style={{
//       display: 'flex',
//       justifyContent: 'center',
//       margin: '15px 0px'
//     }}>
//       <Tabs value={value} onChange={handleChange} aria-label="recipe categories tabs">
//         {categories.map((category, index) => (
//           <Tab key={index} label={category} />
//         ))}
//       </Tabs>
//     </div>
//   );
// };

// export default RecipeTabs;
