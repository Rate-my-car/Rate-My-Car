insert into cars (
    make, model, year, vin
) values (
    $1, $2, $3, $4
)
returning*;