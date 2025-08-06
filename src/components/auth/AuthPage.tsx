import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { SignUpForm } from './SignUpForm';

export const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  const toggleForm = () => setIsLogin(!isLogin);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-4">Hello Pupulation 🐾</h1>
          <p className="text-xl font-semibold text-teal-600 mb-8">
            Welcome to the pack! Where every pup has a match!
          </p>
        </div>
        {isLogin ? (
          <LoginForm onToggleForm={toggleForm} />
        ) : (
          <SignUpForm onToggleForm={toggleForm} />
        )}
      </div>
    </div>
  );
};