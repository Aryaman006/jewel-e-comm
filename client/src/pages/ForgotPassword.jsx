import React, { useState } from 'react';
import { useAuth } from '../context/auth';
import Login from './Login';
import { FiX } from 'react-icons/fi';
import 'daisyui/dist/full.css';

const ForgotPassword = ({ onClose, onSwitch }) => {
    const { port } = useAuth();

    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [question, setQuestion] = useState('');
    const [isQuestionFetched, setIsQuestionFetched] = useState(false);
    const [passwordChanged, setPasswordChanged] = useState(false);
    const [showLogin, setShowLogin] = useState(false);

    const fetchQuestion = async (e) => {
        e.preventDefault();
        if (!email) {
            alert('Please enter your email.');
            return;
        }
        try {
            const response = await fetch(`${port}/auth/get-question`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email })
            });

            if (response.ok) {
                const data = await response.json();
                setQuestion(data.question);
                setIsQuestionFetched(true);
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Could not fetch the security question. Please check the email.');
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred. Please try again.');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            alert('Passwords do not match.');
            return;
        }
        try {
            const response = await fetch(`${port}/auth/forgot-password`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, newPassword, answer })
            });

            if (response.ok) {
                alert('Password changed successfully.');
                setPasswordChanged(true);
                setShowLogin(true); // Show the Login component
            } else {
                const errorData = await response.json();
                alert(errorData.message || 'Failed to change the password. Please try again.');
            }
        } catch (error) {
            console.log(error);
            alert('An error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="card w-full max-w-2xl md:w-1/2 shadow-lg p-8 rounded-lg bg-white">
                <h2 className="text-2xl font-bold mb-4 text-center text-brown">Forgot Password</h2>
                {!isQuestionFetched ? (
                    <form className="space-y-4" onSubmit={fetchQuestion}>
                        <div className="form-control">
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="input input-bordered w-full bg-transparent border border-brown rounded-lg px-3 py-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success w-full"
                        >
                            Get Security Question
                        </button>
                    </form>
                ) : (
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">{question} ?</span>
                            </label>
                            <input
                                type="text"
                                placeholder="Answer"
                                value={answer}
                                onChange={(e) => setAnswer(e.target.value)}
                                className="input input-bordered w-full bg-transparent border border-brown rounded-lg px-3 py-2 mt-2"
                            />
                        </div>
                        <div className="form-control">
                            <input
                                type="password"
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="input input-bordered w-full bg-transparent border border-brown rounded-lg px-3 py-2"
                            />
                        </div>
                        <div className="form-control">
                            <input
                                type="password"
                                placeholder="Confirm New Password"
                                value={confirmNewPassword}
                                onChange={(e) => setConfirmNewPassword(e.target.value)}
                                className="input input-bordered w-full bg-transparent border border-brown rounded-lg px-3 py-2"
                            />
                        </div>
                        <button
                            type="submit"
                            className="btn btn-success w-full"
                        >
                            Update Password
                        </button>
                    </form>
                )}
                <p className="mt-4 text-center text-sm">
                    Remember your password?{' '}
                    <button className="text-blue-600 hover:text-blue-800" onClick={() => setShowLogin(true)}>
                        Login
                    </button>
                </p>
                {passwordChanged && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setShowLogin(false)}>
                                <FiX className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                            </button>
                            <Login onClose={() => setShowLogin(false)} onSwitch={() => { setShowLogin(false); setShowRegister(true); }} />
                        </div>
                    </div>
                )}
                {showLogin && (
                    <div className="modal modal-open">
                        <div className="modal-box">
                            <button className="btn btn-sm btn-circle absolute right-2 top-2" onClick={() => setShowLogin(false)}>
                                <FiX className="h-6 w-6 text-gray-600 hover:text-gray-800" />
                            </button>
                            <Login onClose={() => setShowLogin(false)} onSwitch={() => { setShowLogin(false); setShowRegister(true); }} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
