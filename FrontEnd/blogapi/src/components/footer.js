import React from "react";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";
import Box from "@material-ui/core/Box";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";

const footers = [
    {
        title: "Source Code",
        description: [
            { label: "Source Code", url: "https://example.com/source-code" },
            { label: "Reference", url: "https://www.youtube.com/watch?v=8QLCaye3YjQ" },
        ],
    },
    {
        title: "Contact Me",
        description: [
            { label: "Facebook", url: "https://www.facebook.com/tranductri2003/" },
            { label: "LinkedIn", url: "https://www.linkedin.com/in/duc-tri-tran-464343218/" },
            { label: "Codeforces", url: "https://codeforces.com/profile/tranductri2003" },
            { label: "Github", url: "https://github.com/tranductri2003" },
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
                            <Typography variant="h6" color="textPrimary" gutterBottom>
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
                <Typography variant="body2" color="textSecondary">
                    © {new Date().getFullYear()} Your Website. All rights reserved.
                </Typography>
            </Box>
        </React.Fragment>
    );
}
