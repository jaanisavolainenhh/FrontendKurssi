import React from 'react';
// import React, { useState } from 'react'; //niin ei tarvis statessa käyttää React.usestate vaan usestate pelkästään
import 'react-table-v6/react-table.css'
import ReactTable from 'react-table-v6';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import Addcar from './Addcar';
import Editcar from './Editcar';

export default function Carlist() {
    const [cars, setCars] = React.useState([]);
    const [open, setOpen] = React.useState(false);
    const [msg, setmsg] = React.useState('')

    const getCars = () => {
        fetch('http://carstockrest.herokuapp.com/cars')
            .then(response => response.json())
            .then(data => setCars(data._embedded.cars))
            .catch(err => console.error(err))

    }

    React.useEffect(() => {
        getCars();
    }, [])

    const deleteCar = (link) => {
        if (window.confirm("Are youu sure?")) {
            fetch(link, { method: 'DELETE' })
                .then(_ => getCars())
                .then(_ => {
                    setmsg('CAR DELETED');
                    setOpen(true);
                })
                .catch(err => console.error(err))
        }
        console.log(link);
    }

    const addCar = (car) => {
        fetch('http://carstockrest.herokuapp.com/cars',
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(car)
            }
        )
            .then(_ => getCars())
            .then(_ => {
                setmsg('CAR ADDED');
                setOpen(true);
            }) //jos käytettäs parametria niin ois response _ sijaan
            .catch(err => console.error(err))
    }

    const updateCar=(link, car) => {

    fetch(link, 
        {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(car)
        }
    )
        .then(_ => getCars())
        .then(_ => {
            setmsg('EDITED CAR');
            setOpen(true);
        }) //jos käytettäs parametria niin ois response _ sijaan
        .catch(err => console.error(err))

    }


    const handleClose = () => {
        console.log("sulkeudu paska");
        setOpen(false);
    }

    const columns = [

        {
            Header: 'Brand',
            accessor: 'brand'
        },
        {
            Header: 'Model',
            accessor: 'model'
        },
        {
            Header: 'Color',
            accessor: 'color'
        },
        {
            Header: 'Fuel',
            accessor: 'fuel'
        },
        {
            Header: 'Year',
            accessor: 'year'
        },
        {
            Header: 'Price',
            accessor: 'price'
        },
        {
            Cell: row => (
                <Editcar  car={row.original} updateCar={updateCar}/>
                )
        },
        {
            Cell: row => (
                <Button color="secondary" size="small" onClick={() => deleteCar(row.original._links.self.href)}>Delete</Button>)
        }


    ]


    return (
        <div>
            <Addcar addCar={addCar}/>
            <ReactTable data={cars} columns={columns} defaultPageSize={10} filterable={true} />
            <Snackbar
                open={open}
                autoHideDuration={3000}
                onClose={handleClose}
                message={msg}

            />

        </div>
    )
}