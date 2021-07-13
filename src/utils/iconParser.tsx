import { ReactNode } from 'react';
import { FiFileText, FiUser } from 'react-icons/fi';
import { RiDashboardFill } from 'react-icons/ri';

export function iconParser(iconName: string): ReactNode {
  switch (iconName) {
    case 'FiUser':
      return <FiUser size={20} strokeWidth="3" />;
    case 'Dashboard':
      return <RiDashboardFill size={20} />;
    default:
      return <FiFileText size={20} />;
  }
}
