import React, { useState } from 'react'
import { createUsers } from './createUsers'
import { Virtuoso } from 'react-virtuoso'
import UserCard from './UserCard';

const UsersApp = () => {
    const [users, setUsers] = useState(createUsers);

    return (
        <div>
            <Virtuoso style={{ height: '600px' }} data={users} itemContent={(_, user) =>
                <UserCard user={user} />
            }
            />
        </div>
    )
}

export default UsersApp