import type React from "react"
import { useState } from "react"
import { Table, Pagination, Dropdown, Button, Badge, Form } from "react-bootstrap";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

interface User {
    id: number
    name: string
    email: string
    role: string
    status: 'active' | 'inactive'
}

const UserList: React.FC = () => {
    const roles = ['All', 'Student', 'Teacher', 'Admin']
    const pageSizes = [5, 50, 100, 500]

    const [users] = useState<User[]>([
        { id: 1, name: "John Doe", email: "john@example.com", role: "Student", status: 'active' },
        { id: 2, name: "Jane Smith", email: "jane@example.com", role: "Teacher", status: 'active' },
        { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Student", status: 'inactive' },
        { id: 4, name: "Alice Brown", email: "alice@example.com", role: "Student", status: 'active' },
        { id: 5, name: "Charlie Davis", email: "charlie@example.com", role: "Teacher", status: 'active' },
        { id: 6, name: "Admin User", email: "admin@example.com", role: "Admin", status: 'active' },
    ])

    const [currentPage, setCurrentPage] = useState(1);
    const [selectedRole, setSelectedRole] = useState('All');
    const [usersPerPage, setUsersPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof User; direction: 'asc' | 'desc' } | null>(null);

    const sortedUsers = [...users].sort((a, b) => {
        if (!sortConfig) return 0;
        if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
        if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Filter users by role
    const filteredUsers = users.filter(user =>
        (selectedRole === 'All' || user.role === selectedRole) &&
        (user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            user.email.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const indexOfLastUser = currentPage * usersPerPage
    const indexOfFirstUser = indexOfLastUser - usersPerPage
    const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser)

    const totalPages = Math.ceil(filteredUsers.length / usersPerPage)

    const handlePageChange = (pageNumber: number) => setCurrentPage(pageNumber)

    const handleRoleChange = (role: string) => {
        setSelectedRole(role)
        setCurrentPage(1) // Reset to first page when changing role
    }

    const handlePageSizeChange = (size: number) => {
        setUsersPerPage(size)
        setCurrentPage(1) // Reset to first page when changing page size
    }

    const handleUserAction = (userId: number, action: string) => {
        // Implement admin actions here
        console.log(`${action} user ${userId}`)
    }

    const handleDownloadExcel = () => {
        const worksheet = XLSX.utils.json_to_sheet(users);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
        const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: "application/octet-stream" });
        saveAs(data, "UserList.xlsx");
    };

    const handleSort = (key: keyof User) => {
        let direction: 'asc' | 'desc' = 'asc';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
            direction = 'desc';
        }
        setSortConfig({ key, direction });
    };


    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>User List</h2>

                <div className="d-flex gap-1">
                    <Form.Control
                        type="text"
                        placeholder="Search by name or email"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        style={{ maxWidth: "300px" }}
                    />
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-primary">
                            Role: {selectedRole}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            {roles.map(role => (
                                <Dropdown.Item
                                    key={role}
                                    onClick={() => handleRoleChange(role)}
                                    active={selectedRole === role}
                                >
                                    {role}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <div>
                        <Button variant="primary" onClick={() => handleUserAction(0, 'add')}>
                            Add User
                        </Button>
                    </div>
                    <div>
                        <Button variant="success" onClick={handleDownloadExcel}>Download Excel</Button>
                    </div>
                </div>
            </div>

            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th><Button variant="link" onClick={() => handleSort('id')}>ID</Button></th>
                        <th><Button variant="link" onClick={() => handleSort('name')}>Name</Button></th>
                        <th><Button variant="link" onClick={() => handleSort('email')}>Email</Button></th>
                        <th><Button variant="link" onClick={() => handleSort('role')}>Role</Button></th>
                        <th><Button variant="link" onClick={() => handleSort('status')}>Status</Button></th>
                        <th className="text-center">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedUsers.map((user) => (
                        <tr key={user.id}>
                            <td>{user.id}</td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>
                                <Badge bg={user.role === 'Admin' ? 'danger' : user.role === 'Teacher' ? 'success' : 'primary'}>
                                    {user.role}
                                </Badge>
                            </td>
                            <td>
                                <Badge bg={user.status === 'active' ? 'success' : 'secondary'}>
                                    {user.status}
                                </Badge>
                            </td>
                            <td>
                                <Dropdown>
                                    <Dropdown.Toggle variant="outline-secondary" size="sm">Actions</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Edit User</Dropdown.Item>
                                        <Dropdown.Item>Deactivate</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <div className="d-flex justify-content-between align-items-center">
                <div>
                    Showing {indexOfFirstUser + 1} to {Math.min(indexOfLastUser, filteredUsers.length)} of {filteredUsers.length} users
                </div>
                <div className="d-flex gap-1">
                    <Form.Label>Size:</Form.Label>
                    <Form.Select
                        style={{ width: '150px' }}
                        value={usersPerPage}
                        onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                    >
                        {pageSizes.map(size => (
                            <option key={size} value={size}>
                                {size} users
                            </option>
                        ))}
                    </Form.Select>
                </div>
                <Pagination>
                    <Pagination.First onClick={() => handlePageChange(1)} disabled={currentPage === 1} />
                    <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                    {[...Array(totalPages)].map((_, index) => (
                        <Pagination.Item
                            key={index + 1}
                            active={index + 1 === currentPage}
                            onClick={() => handlePageChange(index + 1)}
                        >
                            {index + 1}
                        </Pagination.Item>
                    ))}
                    <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} />
                    <Pagination.Last onClick={() => handlePageChange(totalPages)} disabled={currentPage === totalPages} />
                </Pagination>
            </div>
        </div>
    )
}

export default UserList