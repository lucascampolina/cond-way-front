import React from 'react';
import  UserTable  from './UserTable'

const Users = () => {
    const data = [
        {
            firstName: 'John',
            lastName: 'Doe',
            email: 'john@example.com',
            registrationDate: '2021-01-01',
        },
        {
            firstName: 'Josh',
            lastName: 'Camps',
            email: 'josh@example.com',
            registrationDate: '2021-01-01',
        },
        // More users here...
    ]

    return (
        <div className="Users">
            <UserTable data={data} />
        </div>
    )
}

export default Users;