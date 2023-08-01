
import React from "react";

// reactstrap components
import { Button, Card, Container, Row, Col } from "reactstrap";


class Profile extends React.Component {

    componentDidMount() {
        document.documentElement.scrollTop = 0;
        document.scrollingElement.scrollTop = 0;
        this.refs.main.scrollTop = 0;
    }
    render() {
        // Destructure userInfo from props and provide a default value to prevent errors
        const { userInfo } = this.props;
        const isAuthorProfile = () => {
            return localStorage.getItem('user_name') === userInfo.user_name;
        };
        return (
            <>
                <main className="profile-page" ref="main">
                    <section className="section-profile-cover section-shaped my-0">
                        {/* Circles background */}
                        <div className="shape shape-style-1 shape-default alpha-4">
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                            <span />
                        </div>
                        {/* SVG separator */}
                        <div className="separator separator-bottom separator-skew">
                        </div>
                    </section>
                    <section className="section">
                        <Container>
                            <Card className="card-profile shadow mt--300">
                                <div className="px-4">
                                    <Row className="justify-content-center">
                                        <Col className="order-lg-2" lg="3">
                                            <div className="card-profile-image">
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    <img
                                                        alt="..."
                                                        className="profile-avatar rounded-circle" // Thêm lớp CSS mới tạo hình tròn
                                                        src={userInfo.avatar}
                                                    />
                                                </a>
                                            </div>
                                        </Col>
                                        <Col
                                            className="order-lg-3 text-lg-right align-self-lg-center"
                                            lg="4"
                                        >
                                            <div className="card-profile-actions py-4 mt-lg-0">

                                                {isAuthorProfile() && (
                                                    <>
                                                        <Button
                                                            className="mr-4"
                                                            color="info"
                                                            href="#pablo"
                                                            onClick={(e) => e.preventDefault()}
                                                            size="sm"
                                                        >
                                                            Add New Post
                                                        </Button>
                                                        <Button
                                                            className="float-right"
                                                            color="default"
                                                            href="#pablo"
                                                            onClick={(e) => e.preventDefault()}
                                                            size="sm"
                                                        >
                                                            Update Profile
                                                        </Button>
                                                    </>
                                                )}
                                            </div>
                                        </Col>
                                        <Col className="order-lg-1" lg="4">
                                            <div className="card-profile-stats d-flex justify-content-center">
                                                <div>
                                                    <span className="heading">{userInfo.num_post}</span>
                                                    <span className="description">Posts</span>
                                                </div>
                                                <div>
                                                    <span className="heading">{userInfo.num_view}</span>
                                                    <span className="description">Views</span>
                                                </div>
                                                <div>
                                                    <span className="heading">{userInfo.num_like}</span>
                                                    <span className="description">Likes</span>
                                                </div>
                                                <div>
                                                    <span className="heading">{userInfo.num_comment}</span>
                                                    <span className="description">Comments</span>
                                                </div>
                                            </div>
                                        </Col>
                                    </Row>
                                    <div className="text-center mt-5">
                                        <h3>
                                            {userInfo.user_name} ({userInfo.first_name}){" "}
                                            <span className="font-weight-light">, {userInfo.age}</span>
                                        </h3>
                                        <div className="h6 font-weight-300">
                                            <i className="ni location_pin mr-2" />
                                            {userInfo.country}
                                        </div>
                                        <div className="h6 mt-4">
                                            <i className="ni business_briefcase-24 mr-2" />
                                            {userInfo.occupation}
                                        </div>
                                        {/* <div>
                                            <i className="ni education_hat mr-2" />
                                            University of Computer Science
                                        </div> */}
                                    </div>
                                    <div className="mt-5 py-5 border-top text-center">
                                        <Row className="justify-content-center">
                                            <Col lg="9">
                                                <p>
                                                    {userInfo.about}
                                                </p>
                                                <a href="#pablo" onClick={(e) => e.preventDefault()}>
                                                    Show more
                                                </a>
                                            </Col>
                                        </Row>
                                    </div>
                                </div>
                            </Card>
                        </Container>
                    </section>
                </main>
            </>
        );
    }
}

export default Profile;
