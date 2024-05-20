import React from 'react';

const styles = {
    leaderboard: {
        fontFamily: 'cursive',
        textAlign: 'center',
        margin: '20px',
    },
    table: {
        borderCollapse: 'collapse',
        width: '80%',
        border: '1px solid #ddd',
        margin: '0 auto',
    },
    tableHeader: {
        padding: '16px',
        backgroundColor: '#f2f2f2',
        fontSize: '18px',
        fontWeight: 'bold',
    },
    cell: {
        padding: '12px',
        textAlign: 'center',
        fontSize: '16px',
    },
    avatarCell: {
        padding: '12px',
        textAlign: 'center',
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
    },
    authorContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start', // Dời tên author lên gần avatar
        minWidth: '150px', // Độ rộng tối thiểu của ô author
    },
    authorName: {
        marginLeft: '10px',
        textDecoration: 'none',
        fontFamily: 'cursive',
    },
};

const MEDIA_URL = process.env.REACT_APP_MEDIA_URL;

const Leaderboard = (props) => {
    const { data } = props;
    console.log(data);

    return (
        <div style={styles.leaderboard}>
            <table style={styles.table}>
                <thead>
                    <tr>
                        <th style={styles.tableHeader}>Rank</th>
                        <th style={styles.tableHeader}>Author</th>
                        <th style={styles.tableHeader}>Title</th>
                        <th style={styles.tableHeader}>Excerpt</th>
                        <th style={styles.tableHeader}>Views</th>
                        <th style={styles.tableHeader}>Likes</th>
                        <th style={styles.tableHeader}>Comments</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((post, index) => (
                        <tr key={index}>
                            <td style={styles.cell}>{index + 1}</td>
                            <td style={styles.cell}>
                                <div style={styles.authorContainer}>
                                    <a href={`/profile/${post.author.user_name}`}>
                                        <img src={`${MEDIA_URL}${post.author.avatar}`} alt={`Avatar of ${post.author.user_name}`} style={styles.avatar} />
                                    </a>
                                    <a href={`/profile/${post.author.user_name}`} style={styles.authorName}>
                                        {post.author.user_name}
                                    </a>
                                </div>
                            </td>
                            <td style={styles.cell}>
                                <a href={`/post/${post.slug}`} style={styles.link}>
                                    {post.title}
                                </a>
                            </td>
                            <td style={styles.cell}>{post.excerpt.substring(0, 20) + "..."}</td>
                            <td style={styles.cell}>{post.num_view}</td>
                            <td style={styles.cell}>{post.num_like}</td>
                            <td style={styles.cell}>{post.num_comment}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Leaderboard;
