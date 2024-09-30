'use client';
import React, { useState } from 'react';
import TextInput from '../TextInput/TextInput';

interface FormProps {
  className?: string;
  formInfo: {
    title: string;
    fields: {
      label: string;
      type: string;
      name: string;
      placeholder?: string;
      value: any;
      required?: boolean;
      onChange: (e: any) => void;
    }[];
  };
  submitButton: {
    text: string;
    onClick: (e: any) => void;
  }
  secondaryButton?: {
    text: string;
    onClick: (e: any) => void;
  }
}

const BaseForm = (props: FormProps) => {
  const [formData, setFormData] = useState({});
  const { className, formInfo, submitButton, secondaryButton } = props;
  const { title, fields } = formInfo;

  const handleSubmit = (e: any) => {
    e.preventDefault();
    // Handle form submission here
    if (submitButton) {
      submitButton.onClick(e);
    }
  };

  return (
    <div className={`bg-white shadow-md rounded p-6 ${className}`} style={{ borderColor: '#e9ecef' }}>
      <div className="max-w-md mx-auto">
        <div className="rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            {
              (fields.map( (field) => (
                <div key={field.name}> 
                  <TextInput
                    id={field.name}
                    name={field.name}
                    type={field.type}
                    labelCopy={field.label}
                    autoComplete={field.name}
                    placeholder={field.placeholder}
                    required={field.required}
                    value={field.value}
                    onChange={(e) => field.onChange(e)}
                  />
                </div>
              )))
            }
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                { submitButton.text }
              </button>
            </div>
          </form>
          {secondaryButton && (
            <>
              <hr className="my-4 border-t border-gray-300" />
              <div>
                <button
                  type="button"
                  className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  onClick={secondaryButton.onClick}
                >
                  {secondaryButton.text}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>

  );
}

export default BaseForm;