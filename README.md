# fs-bnb-api

[![LoopBack](https://github.com/strongloop/loopback-next/raw/master/docs/site/imgs/branding/Powered-by-LoopBack-Badge-(blue)-@2x.png)](http://loopback.io/)

## Database tables

The schema fs_bnb should have three tables, titled rental, trip, and user. The tables are organized as below.

```bash
#### fs_bnb.rental ####
id                 name        location    picture_sources     price     host_id
unsigned int ai    varchar     varchar     longtext            float     unsigned int


#### fs_bnb.trip ####
id                  rental_id         user_id           date_to       date_from     status
unsigned int ai     unsigned int      unsigned int      varchar       varchar       varchar


#### fs_bnb.user ####
id                  first_name        last_name         location        email         password        phone         birthday
unsigned int ai     varchar           varchar           varchar         varchar       varchar         varchar       varchar

num_bookings        reviews           bookings          saved           messages      photo_source    year_joined
JSON array          JSON array        JSON array        JSON array      JSON array    varchar         int
```
