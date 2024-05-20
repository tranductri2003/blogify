import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const footers = [
    {
        title: "About Us",
        description: [
            { label: "Trí", url: "https://www.facebook.com/tranductri2003/" },
            { label: "Phát", url: "https://www.facebook.com/phamnguyenanhphat" },],
    },
    {
        title: "Referrences",
        description: [
            { label: "Github", url: "https://github.com/tranductri2003/My-Blog_DRF-REACT" },
        ],
    },
    {
        title: "Contact",
        description: [
            { label: "Facebook", url: "https://www.facebook.com/tranductri2003/" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/duc-tri-tran-464343218/" },
        ],
    },
];

export default function Footer() {
    return (
        <React.Fragment>
            <Container maxWidth="md" component="footer">
                <Grid container spacing={4} justify="space-evenly">
                    {footers.map((footer) => (
                        <Grid item xs={6} sm={3} key={footer.title}>
                            <Typography variant="h6" color="textPrimary" gutterBottom style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', fontSize: '28px', fontWeight: 'bold' }}>
                                {footer.title}
                            </Typography>
                            <ul>
                                {footer.description.map((item) => (
                                    <li key={item.label}>
                                        <Link
                                            href={item.url}
                                            variant="subtitle1"
                                            color="textSecondary"
                                            target="_blank"
                                            rel="noopener"
                                            style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', fontSize: '18px' }}
                                        >
                                            {item.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </Grid>
                    ))}
                </Grid>
            </Container>
            <Box mt={5} textAlign="center">
                <Typography variant="body2" color="textSecondary" style={{ fontFamily: '"Helvetica Neue", Arial, sans-serif', fontSize: '14px' }}>
                    © {new Date().getFullYear()} Bản quyền Trường Đại học Bách khoa - Đại học Đà Nẵng
                </Typography>
            </Box>
        </React.Fragment>
    );
}