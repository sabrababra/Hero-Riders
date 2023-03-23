import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import UserRow from '../Components/UserRow';

const DashBoard = () => {
    const [selectsUsers, setSelectsUsers] = useState([]);
    const [users, setUsers] = useState([]);
    const [searchData, setSearchData] = useState([]);
    const [search, setSearch] = useState('');

    const [count, setCount] = useState(0);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);
    const pages = Math.ceil(count / size);


    const getData = () => {
        const userData = JSON.parse(localStorage.getItem('user'));
        fetch(`http://localhost:5000/api/user-list?page=${page}&size=${size}`, {
            method: 'GET',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${userData?.accessToken}`
            }
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setCount(data?.count)
                setUsers(data?.users);
                setSearchData(data?.users);

            })
            .catch(error => {
                console.log(error);
            })
    }

    useEffect(() => {
        getData();
    }, [page, size])

    useEffect(() => {


        if (search) {

            const newData = users.filter(x => x.name.toLowerCase().includes(search.toLowerCase()) || x.email.toLowerCase().includes(search.toLowerCase()) || x?.phone?.toLowerCase().includes(search.toLowerCase()))

            setSearchData(newData);
        } else {
            setSearchData(users);
        }

    }, [search, users])

    const handleChange = (e) => {
        const ageRange = e.target.value;
        const startAge = parseInt(ageRange.split('-')[0]);
        const endAge = parseInt(ageRange.split('-')[1]);
        console.log(startAge, endAge);
        const newData = users.filter(x => startAge < parseInt(x.age) && endAge > parseInt(x.age));
        setSearchData(newData);

    }

    const handleSelectUsers = (id, addOrRemove) => {
        if (addOrRemove) {
            setSelectsUsers([...selectsUsers, id]);
        } else {
            const newUser = selectsUsers.filter(x => x !== id);
            setSelectsUsers(newUser);
        }
    }

    const handleBlockUsers=()=>{
        const token=JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:5000/api/update-user`, {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                    authorization: `Bearer ${token}`
                },
                body: JSON.stringify(selectsUsers)
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                })
    }




    return (
        <div className='lg:w-8/12 w-11/12 mx-auto'>
            <div className=' mt-10 flex justify-evenly gap-4'>
                <div className='flex justify-between items-center'>
                    <div className='flex gap-4 items-center w-full'>
                        <p>Search User :</p>
                        <input
                            type="text"
                            placeholder="Search by full name, email, phone"
                            className="input w-full lg:max-w-lg border-gray-400"
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>
                <div className="form-control w-full ">
                    <label className="label">
                        <span className="label-text">
                            Filter By Age
                        </span>
                    </label>
                    <select
                        className="select w-full input-bordered text-[12px] h-auto py-2"
                        onChange={handleChange}
                    >
                        <option disabled selected>Select age range</option>
                        <option value='10-20'>10-20</option>
                        <option value='21-30' >21-30</option>
                        <option value='31-40' >31-40</option>
                        <option value='41-50' >41-50</option>
                        <option value='51-60' >51-60</option>
                        <option value='61-100' >61-100</option>

                    </select>

                </div>
                <div>
                    {selectsUsers.length>0 && <button onClick={()=>{handleBlockUsers()}} className='btn btn-primary' >Block Users</button>}
                </div>
            </div>
            <div className="overflow-x-auto w-full">
                <table className="table w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Phone Number</th>
                            <th>Age</th>
                            <th>User Role</th>
                            <th>Blocked</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* row 1 */}
                        {
                            searchData?.map(data => <UserRow
                                key={data._id}
                                data={data}
                                handleSelectUsers={handleSelectUsers}
                            />)
                        }

                    </tbody>

                </table>

            </div>
            <div className="pagination">

                <div className='pagination-border'>
                    {
                        [...Array(pages).keys()].map(number => <button
                            key={number}
                            className={page === number ? 'selected' : 'unselect'}
                            onClick={() => setPage(number)}
                        >
                            {number + 1}
                        </button>)
                    }
                </div>

            </div>
        </div>
    );
};

export default DashBoard;