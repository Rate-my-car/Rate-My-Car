insert into users (
    email, first_name, last_name, password, username,user_picture, premium, admin, dealer
) values (
    $1, $2, $3, $4, $5,$6,false, false, false
)