insert into cars (
    make, model, year, vin, car_image
) values (
    $1, $2, $3, $4, $5
)
returning*;