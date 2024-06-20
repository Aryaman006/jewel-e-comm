import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import { FiX } from 'react-icons/fi';

const Register = ({ onClose, onSwitch }) => {
    const { port } = useAuth();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [question, setQuestion] = useState('');
    const [answer, setAnswer] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!name || !email || !password || !confirmPassword || !address || !phone || !question || !answer) {
            alert('All fields are required.');
            return;
        }

        if (password !== confirmPassword) {
            alert('Passwords do not match.');
            return;
        }

        try {
            const response = await fetch(`${port}/auth/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, phone, address, question, answer }),
            });

            if (response.ok) {
                const data = await response.json();
                setEmail('');
                setName('');
                setPassword('');
                setConfirmPassword('');
                setAddress('');
                setPhone('');
                setQuestion('');
                setAnswer('');
                onSwitch();
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Registration failed.');
            }
        } catch (error) {
            console.log(error);
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
                    Register
                </h2>
                <form className='space-y-4' onSubmit={handleSubmit} style={{color:"black"}}>
                    <div>
                        <input
                            type='text'
                            placeholder='Name'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 w-full bg-transparent'
                            style={{ border: 'solid brown 1px', backgroundColor: 'transparent', borderRadius: '20px', padding: '10px' }}
                        />
                    </div>
                    <div>
                        <input
                            type='text'
                            placeholder='Email'
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 w-full bg-transparent'
                            style={{ border: 'solid brown 1px', backgroundColor: 'transparent', borderRadius: '20px', padding: '10px' }}
                        />
                    </div>
                    <div>
                        <input
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 w-full bg-transparent'
                            style={{ border: 'solid brown 1px', backgroundColor: 'transparent', borderRadius: '20px', padding: '10px' }}
                        />
                    </div>
                    <div>
                        <input
                            type='password'
                            placeholder='Confirm Password'
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 w-full bg-transparent'
                            style={{ border: 'solid brown 1px', backgroundColor: 'transparent', borderRadius: '20px', padding: '10px' }}
                        />
                    </div>
                    <div>
                        <input
                            type='tel'
                            placeholder='Phone Number'
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 w-full bg-transparent'
                            style={{ border: 'solid brown 1px', backgroundColor: 'transparent', borderRadius: '20px', padding: '10px' }}
                        />
                    </div>
                    <div>
                        <textarea
                            placeholder='Address'
                            rows='3'
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 w-full bg-transparent'
                            style={{ border: 'solid brown 1px', backgroundColor: 'transparent', borderRadius: '20px', padding: '10px' }}
                        ></textarea>
                    </div>
                    <div>
                        <input
                            type='text'
                            placeholder='Security Question'
                            value={question}
                            onChange={(e) => setQuestion(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 w-full bg-transparent'
                            style={{ border: 'solid brown 1px', backgroundColor: 'transparent', borderRadius: '20px', padding: '10px' }}
                        />
                    </div>
                    <div>
                        <input
                            type='text'
                            placeholder='Answer'
                            value={answer}
                            onChange={(e) => setAnswer(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 w-full bg-transparent'
                            style={{ border: 'solid brown 1px', backgroundColor: 'transparent', borderRadius: '20px', padding: '10px' }}
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full hover:bg-blue-500 bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300'
                        style={{ backgroundColor: '#3B82F6' }}
                    >
                        Register
                    </button>
                </form>
                <p style={{ color: 'black' }}>
                    Already have an account?{' '}
                    <button className='text-blue-600 hover:text-blue-800' onClick={onSwitch}>
                        Login
                    </button>
                </p>
            </div>
        </div>
    );
};

export default Register;
