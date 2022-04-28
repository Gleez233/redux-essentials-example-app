import React from "react";
import { useAppSelector } from "../../app/hooks";
import { selectAllUsers } from "./usersSlice";
import { Link } from 'react-router-dom'

export const UsersList = () => {
  const users = useAppSelector(selectAllUsers)

  const renderdUsers = users.map(user => (
    <li key={user.id}>
      <Link to={`/users/${user.id}`}>{user.name}</Link>
    </li>
  ))

  return (
    <section>
      <h2>Users</h2>
      <ul>{renderdUsers}</ul>
    </section>
  )
}