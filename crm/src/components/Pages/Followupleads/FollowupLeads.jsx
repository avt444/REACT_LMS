import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { message } from 'antd';
    const handleClick = () => {
      message.success('Successfully Enrolled.');
    };

const FollowupLeads = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        axios.get('https://localhost:7231/api/Task')
            .then((res) => {
                setData(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={2}>
                {data.map((item) => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <Card sx={{ minWidth: 275,
                                    backgroundImage: 'url(blueprint.avif)',
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center', }} >
                            <CardContent>
                           
                                <Typography variant="h5" component="div">
                                <label htmlFor={`course-${item.coursename}`}>Course Name:</label>{item.coursename}
                                </Typography>
                                <Typography variant="h5" component="div">
                                <label htmlFor={`course-${item.courseduration}`}>Course Duration:</label>{item.courseduration}
                                </Typography>
                                <Typography variant="h5" component="div">
                                <label htmlFor={`course-${item.faculty}`}>Faculty:</label>{item.faculty}
                                </Typography>
                                <Typography variant="h5" component="div">
                                <label htmlFor={`course-${item.amount}`}>Course Amount:</label>{item.amount}
                                </Typography>
                                <Typography variant="h5" component="div">
                                <label htmlFor={`course-${item.startdate}`}>Course start date:</label>{item.startdate}
                                </Typography>
                                <Typography variant="h5" component="div">
                                <label htmlFor={`course-${item.description}`}>Course description:</label>{item.description}
                                </Typography>
                                
                            </CardContent>
                            <CardActions>
                                <Button variant="contained" onClick={handleClick} style={{ marginLeft: '20px', fontWeight: 'bold',backgroundColor:'red'}} >ENROLL NOW</Button>
                            </CardActions>
                            
                        </Card>
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
};

export default FollowupLeads;
