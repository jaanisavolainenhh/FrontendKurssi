import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function Editcar(props) {
    const [open, setOpen] = React.useState(false);
    const [car, setCar] = React.useState({ brand: '', model: '', color: '', fuel: '', year: '', price: '' });
    const handleClickOpen = () => {
        console.log(props.car);
        setCar(
            {
                brand: props.car.brand,
                model: props.car.model,
                color: props.car.color,
                fuel: props.car.fuel,
                year: props.car.year,
                price: props.car.price
            });
        setOpen(true);
    };

    const handleClose = () => {
        props.updateCar(props.car._links.self.href, car);
        setOpen(false);
    };

    const handleCancel = () => {
        setOpen(false);
    }

    const inputChanged = (event) => {
        setCar({ ...car, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <Button variant="outlined" color="primary" onClick={handleClickOpen}>
                Edit
      </Button>
            <Dialog open={open} onClose={handleCancel} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit car</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Lisätään auto :)
          </DialogContentText>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="brand"
                        label="Brand"
                        name="brand"
                        value={car.brand}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="model"
                        label="Model"
                        name="model"
                        value={car.model}
                        onChange={inputChanged}
                        fullWidth
                    />
                    <TextField
                        // autoFocus
                        margin="dense"
                        id="color"
                        label="Color"
                        name="color"
                        value={car.color}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        label="Fuel"
                        name="fuel"
                        value={car.fuel}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        name="year"
                        label="Year"
                        value={car.year}
                        onChange={inputChanged}
                        fullWidth
                    />

                    <TextField
                        // autoFocus
                        margin="dense"
                        id="name"
                        label="Price"
                        name="price"
                        value={car.price}
                        onChange={inputChanged}
                        fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCancel} color="primary">
                        Cancel
          </Button>
                    <Button onClick={handleClose} color="primary">
                        Add
          </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}