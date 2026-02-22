import React, { useState } from 'react'
import { createUsers } from './createUsers'

const UsersApp = () => {
    const [users, setUsers] = useState(createUsers);

    return (
        <div>
            {users.map((user) => (
                <UserCard key={user.id} user={user} />
            ))}
        </div>
    )
}

export default UsersApp