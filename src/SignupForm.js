// import React, { useState } from 'react';
// import './SignupForm.css'; // Ensure your CSS accommodates the new fields

// function SignupForm() {
//   const [username, setUsername] = useState('');
//   const [firstName, setFirstName] = useState('');
//   const [lastName, setLastName] = useState('');
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     // Prepare user data excluding the password from logs
//     const userData = {
//       username,
//       firstName,
//       lastName,
//       email,
//       password
//     };
//     const logData = { ...userData, password: '*****' };
//     console.log("Attempting to submit form");
//     console.log("User Data:", logData);  // Sensitive data is masked

//     // Ensure the correct server URL is used
//     fetch('http://localhost:3001/signup', {  // Adjust the URL to match your server setup
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData)
//     })
//     .then(response => {
//       console.log("Response Status:", response.status); // Check response status
//       if (!response.ok) {  // Handle non-200 responses
//         throw new Error(`Signup failed: ${response.status} ${response.statusText}`);
//       }
//       return response.json();
//     })
//     .then(data => {
//       console.log('Signup success:', data);
//       // Here you can redirect the user or clear the form, etc.
//     })
//     .catch(error => {
//       console.error('Error in signup:', error);
//       // Display an error message or handle the error in the UI
//     });
//   };

//   return (
//     <div className="form-container">
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           value={username}
//           onChange={(e) => setUsername(e.target.value)}
//           placeholder="Username"
//         />
//         <input
//           type="text"
//           value={firstName}
//           onChange={(e) => setFirstName(e.target.value)}
//           placeholder="First Name"
//         />
//         <input
//           type="text"
//           value={lastName}
//           onChange={(e) => setLastName(e.target.value)}
//           placeholder="Last Name"
//         />
//         <input
//           type="email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           placeholder="Email"
//         />
//         <input
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           placeholder="Password"
//         />
//         <button type="submit">Sign Up</button>
//       </form>
//     </div>
//   );
// }

// export default SignupForm;
// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import './SignupForm.css'; // Ensure CSS is correctly linked

// function SignupForm() {
//     const [formData, setFormData] = useState({
//         username: '',
//         email: '',
//         password: '',
//         firstName: '',
//         lastName: ''
//     });
//     const [message, setMessage] = useState('');
//     const [isSuccess, setIsSuccess] = useState(false);

//     const handleChange = (e) => {
//         setFormData({ ...formData, [e.target.name]: e.target.value });
//     };

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         fetch('http://localhost:3001/signup', {  // Update this URL to match your server
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify(formData)
//         })
//         .then(response => {
//             if (response.status === 409) {
//                 return response.json().then(data => {
//                     setMessage(data.message);
//                 });
//             } else if (response.ok) {
//                 return response.json();
//             } else {
//                 throw new Error('Failed to sign up due to server error');
//             }
//         })
//         .then(data => {
//             if (data) {
//                 setMessage('Signup successful! Please log in.');
//                 setIsSuccess(true);
//             }
//         })
//         .catch(error => {
//             setMessage(error.message);
//         });
//     };

//     return (
//         <div className="form-container">
//             <form onSubmit={handleSubmit}>
//                 <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
//                 <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//                 <input type="text" name="firstName" placeholder="First Name" value={formData.firstName} onChange={handleChange} />
//                 <input type="text" name="lastName" placeholder="Last Name" value={formData.lastName} onChange={handleChange} />
//                 <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
//                 <button type="submit">Sign Up</button>
//             </form>
//             {message && <p>{message}</p>}
//             {isSuccess && <p><Link to="/login">Go to Login</Link></p>}
//         </div>
//     );
// }

// export default SignupForm;


import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './SignupForm.css';

function SignupForm() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:3001/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, email, password, firstName, lastName })
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Error signing up');
            }

            setSuccess(data.message);
            setTimeout(() => {
                navigate('/login');
            }, 2000); // Redirect after 2 seconds
        } catch (error) {
            console.error('Error during signup:', error);
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
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Email"
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Password"
                />
                <input 
                    type="text" 
                    value={firstName} 
                    onChange={(e) => setFirstName(e.target.value)} 
                    placeholder="First Name"
                />
                <input 
                    type="text" 
                    value={lastName} 
                    onChange={(e) => setLastName(e.target.value)} 
                    placeholder="Last Name"
                />
                <button type="submit">Sign Up</button>
                {error && <p className="error">{error}</p>}
                {success && <p className="success">{success}</p>}
            </form>
        </div>
    );
}

export default SignupForm;
