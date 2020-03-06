insert into users (
    email, fist_name, last_name, password, user_picture, premium, admin, dealer
) values (
    $1, $2, $3, $4, $5, false, false, false
)