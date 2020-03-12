update users
set first_name = $2, 
    last_name = $3, 
    email = $4, 
    user_picture = $5
where user_id = $1;
select * from users
where user_id = $1