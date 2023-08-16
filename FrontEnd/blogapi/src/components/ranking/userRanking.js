import React from 'react';

const styles = {
    leaderboard: {
        fontFamily: 'cursive', // Thay đổi font chữ ở đây
        textAlign: 'center',
        margin: '20px',
    },
    table: {
        borderCollapse: 'collapse',
        width: '80%', // Thay đổi kích thước bảng ở đây
        border: '1px solid #ddd',
        margin: '0 auto', // Canh giữa bảng
    },
    tableHeader: {
        padding: '16px', // Tăng padding cho header
        backgroundColor: '#f2f2f2',
        fontSize: '18px', // Tăng kích thước font chữ cho header
        fontWeight: 'bold', // In đậm chữ
    },
    cell: {
        padding: '12px',
        textAlign: 'center',
        fontSize: '16px', // Tăng kích thước font chữ cho ô dữ liệu
    },
    avatarCell: {
        padding: '12px',
        textAlign: 'center',
    },
    avatar: {
        width: '50px', // Tăng kích thước avatar
        height: '50px',
        borderRadius: '50%',
    },
};

const Leaderboard = (props) => {
    const { data } = props;

    return (
        <div style={styles.leaderboard}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Rank</th> {/* Thêm cột thể hiện thứ tự */}
                        <th style={styles.tableHeader}>Avatar</th>
                        <th style={styles.tableHeader}>User Name</th>
                        <th style={styles.tableHeader}>Number of Posts</th>
                        <th style={styles.tableHeader}>Number of Views</th>
                        <th style={styles.tableHeader}>Number of Likes</th>
                        <th style={styles.tableHeader}>Number of Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((user, index) => (
                        <tr key={index}>
                            <td style={styles.cell}>{index + 1}</td> {/* Thứ tự bắt đầu từ 1 */}
                            <td style={styles.avatarCell}>
                                <a href={`/profile/${user.user_name}`}>
                                    <img src={user.avatar} alt={`Avatar of ${user.user_name}`} style={styles.avatar} />
                                </a>
                            </td>
                            <td style={styles.cell}>
                                <a href={`/profile/${user.user_name}`}>{user.user_name}</a>
                            </td>
                            <td style={styles.cell}>{user.num_post}</td>
                            <td style={styles.cell}>{user.num_view}</td>
                            <td style={styles.cell}>{user.num_like}</td>
                            <td style={styles.cell}>{user.num_comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
