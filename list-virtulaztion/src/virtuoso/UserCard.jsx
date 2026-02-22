const UserCard = ({ user }) => {
    return (<>
        <td>{user.id}</td>
        <td>{user.name}</td>
    </>
    )
}

export default UserCard