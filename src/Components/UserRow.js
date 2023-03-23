import React, { useEffect, useState } from 'react';

const UserRow = ({data,handleSelectUsers}) => {
    const {_id,name,profilePic,email,phone,userRole,age,block}=data;
    return (
        <tr>
                        <th>
                            <label>
                                <input type="checkbox" className="checkbox"
                                onChange={(e)=>{
                                    handleSelectUsers(_id,e.target.checked);
                                }}
                                />
                            </label>
                        </th>
                        <td>
                            <div className="flex items-center space-x-3">
                                <div className="avatar">
                                    <div className="mask mask-squircle w-12 h-12">
                                        <img src={profilePic?.base64} alt="Avatar Tailwind CSS Component" />
                                    </div>
                                </div>
                                <div>
                                    <div className="font-bold">{name}</div>
                                </div>
                            </div>
                        </td>
                        <td> {email} </td>
                        <td>{phone?phone:'--'}</td>
                        <td>{age}</td>
                        <td>{userRole}</td>
                        <td>{block?'Yes':'No'}</td>
                        
                    </tr>
    );
};

export default UserRow;