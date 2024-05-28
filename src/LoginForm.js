// // import React, { useState } from 'react';
// // import './LoginForm.css'; // Import the stylesheet

// // function LoginForm() {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     // Handle login logic (e.g., send login request to backend)
// //   };

// //   return (
// //     <div className="form-container">
// //       <form onSubmit={handleSubmit}>
// //         <input
// //           type="email"
// //           value={email}
// //           onChange={(e) => setEmail(e.target.value)}
// //           placeholder="Email"
// //         />
// //         <input
// //           type="password"
// //           value={password}
// //           onChange={(e) => setPassword(e.target.value)}
// //           placeholder="Password"
// //         />
// //         <button type="submit">Log In</button>
// //       </form>
// //     </div>
// //   );
// // }

// // export default LoginForm;

// // import React, { useState } from 'react';
// // import { useNavigate } from 'react-router-dom'; // Import useNavigate
// // import './LoginForm.css'; // Ensure the CSS file is imported

// // function LoginForm() {
// //     // const [email, setEmail] = useState('');
// //     const [username, setUsername] = useState('');
// //     const [password, setPassword] = useState('');
// //     const [error, setError] = useState('');
// //     const navigate = useNavigate(); // Hook for navigation

// //     const handleSubmit = async (event) => {
// //         event.preventDefault();
// //         try {
// //             const response = await fetch('http://localhost:3001/login', {
// //                 method: 'POST',
// //                 headers: { 'Content-Type': 'application/json' },
// //                 body: JSON.stringify({ username, password })
// //             });
// //             const data = await response.json();
// //             if (!response.ok) {
// //                 throw new Error(data.message || 'Error logging in');
// //             }
// //             localStorage.setItem('token', data.token);
// //             navigate('/matches'); // Redirect to matches page
// //         } catch (error) {
// //             setError(error.message);
// //         }
// //     };

// //     return (
// //         <div className="form-container">
// //             <form onSubmit={handleSubmit}>
// //                 <input 
// //                     type="text" 
// //                     value={username} 
// //                     onChange={(e) => setUsername(e.target.value)} 
// //                     placeholder="Email" 
// //                 />
// //                 <input 
// //                     type="password" 
// //                     value={password} 
// //                     onChange={(e) => setPassword(e.target.value)} 
// //                     placeholder="Password" 
// //                 />
// //                 <button type="submit">Log In</button>
// //                 {error && <p>{error}</p>}
// //             </form>
// //         </div>
// //     );
// // }

// // export default LoginForm;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate
// import './LoginForm.css'; // Ensure the CSS file is imported

// function LoginForm() {
//     const [username, setUsername] = useState(''); // Change email to username
//     const [password, setPassword] = useState('');
//     const [error, setError] = useState('');
//     const navigate = useNavigate(); // Hook for navigation

//     const handleSubmit = async (event) => {
//         event.preventDefault();
//         try {
//             const response = await fetch('http://localhost:3001/login', {
//                 method: 'POST',
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify({ username, password }) // Change email to username
//             });
//             const data = await response.json();
//             if (!response.ok) {
//                 throw new Error(data.message || 'Error logging in');
//             }
//             localStorage.setItem('token', data.token);
//             navigate('/matches'); // Redirect to matches page
//         } catch (error) {
//             setError(error.message);
//         }
//     };

//     return (
//         <div className="form-container">
//             <form onSubmit={handleSubmit}>
//                 <input 
//                     type="text" 
//                     value={username} 
//                     onChange={(e) => setUsername(e.target.value)} 
//                     placeholder="Username" // Change placeholder to Username
//                 />
//                 <input 
//                     type="password" 
//                     value={password} 
//                     onChange={(e) => setPassword(e.target.value)} 
//                     placeholder="Password" 
//                 />
//                 <button type="submit">Log In</button>
//                 {error && <p>{error}</p>}
//             </form>
//         </div>
//     );
// }

// export default LoginForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginForm.css';

function LoginForm() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error logging in');
            }

            console.log('Login successful:', data);
            localStorage.setItem('token', data.token);
            navigate('/matches');
        } catch (error) {
            console.error('Error during login:', error);
            setError(error.message);
        }
    };

    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={username} 
                    onChange={(e) => setUsername(e.target.value)} 
                    placeholder="Username"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                />
                <button type="submit">Log In</button>
                {error && <p>{error}</p>}
            </form>
        </div>
    );
}

export default LoginForm;
