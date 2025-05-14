import pool from "./db";

export async function query() {
  await pool.query(
    "create table if not exists users (id serial primary key, phone varchar(11), password varchar(255), activation_otp varchar(6) default '', activation_otp_expire_at integer default 0)"
  );
}
