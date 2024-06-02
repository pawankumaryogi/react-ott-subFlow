import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const PackageCard = ({ packageDetails, onSelect }) => {
  const { name, resolution, avQuality, devices, price } = packageDetails;

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{name}</Typography>
        <Typography>Resolution: {resolution}</Typography>
        <Typography>AV Quality: {avQuality}</Typography>
        <Typography>Devices: {devices}</Typography>
        <Typography>Price: Rs.{price}</Typography>
        <Button variant="contained" color="primary" onClick={() => onSelect(packageDetails)}>
          Select
        </Button>
      </CardContent>
    </Card>
  );
};

export default PackageCard;
