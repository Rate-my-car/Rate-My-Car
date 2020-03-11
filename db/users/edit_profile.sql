update table users
set first_name = $2, 
set last_name = $3, 
set email = $4, 
set user_picture = $5
where user_id = $1