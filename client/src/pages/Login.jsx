import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/auth';
import { FiX } from 'react-icons/fi';

const Login = ({ onClose, onSwitch }) => {
    const { port, setToken, setUser } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const forgotPassword = () => {
        navigate('/forgot-password');
        onClose();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert('All fields are required.');
            return;
        }
        console.log(email,password)

        try {
            const response = await fetch(`${port}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });
            console.log(response)

            if (response.ok) {
                const data = await response.json();
                setToken(data.token);
                setUser(data.user);
                localStorage.setItem('user', JSON.stringify(data));
                setEmail('');
                setPassword('');
                navigate('/');
                onClose();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className='modal-backdrop'>
            <div className='modal-card'>
            <button
                    onClick={onClose}
                    className='absolute top-2 right-2'
                    aria-label='Close'
                    style={{ color: 'black' }}
                >
                    <FiX />
                </button>
                <h2 className='text-2xl font-bold mb-4' style={{ color: 'brown', textAlign: 'center' }}>
                    Login
                </h2>
                <form className='space-y-4' onSubmit={handleSubmit} style={{color:"black"}}>
                    <div>
                        <input
                            type='text'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder='Email'
                            className='border border-gray-300 rounded-md px-3 py-2 w-full bg-transparent'
                            style={{ border: 'solid brown 1px', backgroundColor: 'transparent', borderRadius: '20px', padding: '10px' }}
                        />
                    </div>
                    <div>
                        <input
                            type='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder='Password'
                            className='border border-gray-300 rounded-md px-3 py-2 w-full bg-transparent'
                            style={{ border: 'solid brown 1px', backgroundColor: 'transparent', borderRadius: '20px', padding: '10px' }}
                        />
                    </div>
                    <p>
                        <button
                            type='button'
                            className='text-blue-600 hover:text-blue-800'
                            onClick={forgotPassword}
                        >
                            Forgot Password
                        </button>
                    </p>
                    <button
                        type='submit'
                        className='w-full hover:bg-blue-500 bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300'
                        style={{ backgroundColor: '#3B82F6' }}
                    >
                        Login
                    </button>
                </form>
                <p style={{ color: 'black' }}>
                    Don't have an account?{' '}
                    <button className='text-blue-600 hover:text-blue-800' onClick={onSwitch}>
                        Register
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Login;
