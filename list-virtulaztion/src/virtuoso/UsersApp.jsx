import React, { useRef, useState } from 'react'
import { createUsers } from './createUsers'
import { TableVirtuoso } from 'react-virtuoso'
import UserCard from './UserCard';

const UsersApp = () => {
    const [users, setUsers] = useState(createUsers);
    const virtuosoRef = useRef(null);

    return (
        <div>
            <button style={{ margin: 40, background: "yellow" }}
                onClick={() => virtuosoRef.current?.scrollToIndex({
                    index: Math.random() * users.length,
                    textAlign: "left"
                })}>Scroll</button>
            <TableVirtuoso ref={virtuosoRef}
                style={{ height: '600px' }} data={users}
                itemContent={(_, user) => <UserCard user={user} />}
                fixedHeaderContent={() => (
                    <tr>
                        <th style={{ width: 150, background: 'gray', align: self }}>Id</th>
                        <th style={{ width: 150, background: 'gray', align: self }}>Name</th>
                    </tr>
                )}
            />
        </div>
    )
}

export default UsersApp