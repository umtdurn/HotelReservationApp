import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, IconButton, Rating } from '@mui/material';
import { Link } from 'react-router-dom';

const cardStyle = {
    height: '400px',
    display: 'flex',
    justifyContent: "center",
    alignItems: "center",
    borderRadius: "20px"
};



export default function ProductListItem({ product }) {
    return (

        <Card style={cardStyle}>
            <Link to={"/products/" + product?.id} style={{ textDecoration: 'none', color: "black", textAlign: "center", width: "100%" }}>
                <CardActionArea style={{ width: "100%" }}>

                    <img
                        src={product?.thumbnail}
                        width={"100%"}
                        height={"320px"}
                        alt="Article"
                    />

                    <CardContent >
                        <Typography gutterBottom variant="h6" textAlign={"start"} style={{}} >
                            <strong>{product?.location}</strong> <br></br> {product?.price.value}$
                        </Typography>
                        <div style={{ position: "absolute", right: "20px", bottom: "20px" }}>
                            <Typography variant="h6" >
                                <Typography component="legend">Stars</Typography>
                                <Rating name="read-only" value={product?.stars?product?.stars:0} readOnly />
                            </Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Link>

        </Card>

    );
}
