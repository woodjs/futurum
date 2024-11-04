'use client'
import React from 'react';

interface CustomTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({ label, ...props }) => (
  <div style={{ marginBottom: '1rem' }}>
    <label style={{ display: 'block', marginBottom: '0.5rem' }}>{label}</label>
    <input
      {...props}
      style={{
        padding: '0.5rem',
        width: '100%',
        borderRadius: '4px',
        border: '1px solid #ccc',
      }}
    />
  </div>
);

export default CustomTextField;
