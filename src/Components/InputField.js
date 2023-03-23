import React from 'react';

const InputField = ({ label, name, placeholder, onChange, type }) => {
    return (
        <div className="form-control w-full">
            <label className="label">
                <span className="label-text text-[12px]">
                    {label}
                </span>
            </label>
            <input
                type={type?type:'text'}
                className="input input-bordered w-full text-[12px] h-auto py-2"
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                required
            />

        </div>
    );
};

export default InputField;