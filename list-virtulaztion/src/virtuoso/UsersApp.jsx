import { useRef, useState } from 'react'
import { createUsers } from './createUsers'
import { TableVirtuoso } from 'react-virtuoso'
import UserCard from './UserCard';

const UsersApp = ({ pageLength }) => {
    const [users, setUsers] = useState(() => createUsers(0, pageLength));
    const virtuosoRef = useRef(null);

    const [loading, setLoading] = useState(false);

    const fetchNextPage = () => {
        if (loading) return;

        setLoading(true);

        const newUsers = createUsers(users.length, users.length + pageLength);

        setUsers(prev => [...prev, ...newUsers]);

        setLoading(false);
    };
    return (
        <div>
            <button style={{ margin: 40, background: "yellow" }}
                onClick={() => virtuosoRef.current?.scrollToIndex({
                    index: Math.random() * users.length,
                    textAlign: "left"
                })}>Scroll</button>

            <TableVirtuoso ref={virtuosoRef}
                style={{ height: '600px' }} data={users}
                endReached={fetchNextPage}
                itemContent={(_, user) => <UserCard user={user} />}
                fixedFooterContent={loading ? () => <div style={{ background: "grat" }}>
                    Loading...
                </div> : undefined
                }
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