import React, { useState } from 'react';
import { useAuth } from '../../context/auth';
import { FiX } from 'react-icons/fi';

const EditProfile = ({ onClose, user }) => {
    const { port, token } = useAuth();
    const [email, setEmail] = useState(user.email);
    const [name, setName] = useState(user.name);
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState(user.phone);
    const [address, setAddress] = useState(user.address);
    const _id = user._id;

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${port}/auth/update-user`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
                body: JSON.stringify({ name, email, phone, address, password, _id })
            });
            if(response.ok){
                onClose()
            }
            console.log(response); // Check response status and data
        } catch (error) {
            console.error('Error updating user:', error);
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
                    Edit Profile
                </h2>
                <form className='space-y-4' onSubmit={handleSubmit} style={{ color: 'black' }}>
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
                            type='password'
                            placeholder='Password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className='border border-gray-300 rounded-md px-3 py-2 w-full bg-transparent'
                            style={{ border: 'solid brown 1px', backgroundColor: 'transparent', borderRadius: '20px', padding: '10px' }}
                        />
                    </div>
                    <button
                        type='submit'
                        className='w-full hover:bg-blue-500 bg-blue-600 text-white font-bold py-2 px-4 rounded transition duration-300'
                        style={{ backgroundColor: '#3B82F6' }}
                    >
                        Update
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
