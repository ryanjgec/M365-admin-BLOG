import React, { useState } from 'react';
import { Button } from '../components/UI';

export const Admin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('This is a demo frontend. Backend authentication would happen here.');
  };

  return (
    <div className="container mx-auto px-6 flex items-center justify-center min-h-[60vh]">
      <div className="glass-panel p-8 rounded-xl w-full max-w-md border border-gray-200 dark:border-white/10">
        <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-navy-900 dark:text-white">Admin Portal</h2>
            <p className="text-gray-500 text-sm mt-2">Restricted access area</p>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Email Address</label>
                <input 
                    type="email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white dark:bg-navy-900 border border-gray-300 dark:border-white/10 rounded px-4 py-3 text-navy-900 dark:text-white focus:border-neon-green focus:outline-none"
                    placeholder="admin@microsoftadmin.in"
                />
            </div>
            <div>
                <label className="block text-xs font-bold text-gray-500 dark:text-gray-400 uppercase mb-2">Password</label>
                <input 
                    type="password" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white dark:bg-navy-900 border border-gray-300 dark:border-white/10 rounded px-4 py-3 text-navy-900 dark:text-white focus:border-neon-green focus:outline-none"
                    placeholder="••••••••"
                />
            </div>
            <Button className="w-full">Sign In</Button>
        </form>
      </div>
    </div>
  );
};
