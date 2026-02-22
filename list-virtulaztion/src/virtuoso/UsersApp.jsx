import React, { useRef, useState } from 'react'
import { createUsers } from './createUsers'
import { Virtuoso } from 'react-virtuoso'
import UserCard from './UserCard';

const UsersApp = () => {
    const [users, setUsers] = useState(createUsers);
    const virtuosoRef = useRef(null);

    return (
        <div>
            <button style={{ margin: 40, background: "yellow" }}
                onClick={() => virtuosoRef.current?.scrollToIndex({
                    index: Math.random() * users.length,
                    align: "start"
                })}>Scroll</button>
            <Virtuoso ref={virtuosoRef}
                style={{ height: '600px' }} data={users} itemContent={(_, user) =>
                    <UserCard user={user} />
                }
            />
        </div>
    )
}

export default UsersApp