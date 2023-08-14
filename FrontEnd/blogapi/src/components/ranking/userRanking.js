// import React, { useState, useEffect } from 'react';
// import axiosInstance from './axios';

// const App = () => {
//     const [users, setUsers] = useState([]);
//     const [sortingField, setSortingField] = useState('num_view'); // Mặc định sắp xếp theo num_view

//     useEffect(() => {
//         axiosInstance.get(`/api/user/ranking/?ordering=${sortingField}`)
//             .then((response) => response.json())
//             .then((data) => {
//                 setUsers(data);
//             })
//             .catch((error) => {
//                 console.error('Error fetching data:', error);
//             });
//     }, [sortingField]);

//     return (
//         <div>
//             <h1>User Ranking</h1>
//             <table>
//                 <thead>
//                     <tr>
//                         <th>User Name</th>
//                         <th>Number of Posts</th>
//                         <th>Number of Views</th>
//                         <th>Number of Likes</th>
//                         <th>Number of Comments</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {users.map((user) => (
//                         <tr key={user.user_name}>
//                             <td>{user.user_name}</td>
//                             <td>{user.num_post}</td>
//                             <td>{user.num_view}</td>
//                             <td>{user.num_like}</td>
//                             <td>{user.num_comment}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default App;
