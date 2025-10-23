'use client';

import { useState } from 'react';
import { useAuth } from './AuthContext';
import LoginModal from './LoginModal';

interface ProtectedActionProps {
  children: React.ReactNode;
  action: string;
  requiredRole?: 'admin' | 'user' | 'viewer';
  fallback?: React.ReactNode;
}

export default function ProtectedAction({ 
  children, 
  action, 
  requiredRole = 'user',
  fallback 
}: ProtectedActionProps) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { isAuthenticated, user } = useAuth();

  const hasPermission = () => {
    if (!isAuthenticated || !user) return false;
    
    // Role hierarchy: admin > user > viewer
    const roleLevel = {
      'admin': 3,
      'user': 2,
      'viewer': 1
    };
    
    return roleLevel[user.role] >= roleLevel[requiredRole];
  };

  const handleClick = (e: React.MouseEvent) => {
    if (!hasPermission()) {
      e.preventDefault();
      e.stopPropagation();
      setShowLoginModal(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLoginModal(false);
    // The action will now proceed since user is authenticated
  };

  if (!hasPermission() && fallback) {
    return <>{fallback}</>;
  }

  return (
    <>
      <div onClick={handleClick}>
        {children}
      </div>
      
      <LoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
        onSuccess={handleLoginSuccess}
        action={action}
      />
    </>
  );
}